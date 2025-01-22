'use server';

import {db} from "@/db";
import {CategoriaPessoa, Endereco, Pessoa, PessoaFisica, PessoaJuridica, Telefone} from "@prisma/client";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {redirect} from "next/navigation";

export type PessoaFisJurEnd = Pessoa & {
    pessoaFisica?: PessoaFisica;
    pessoaJuridica?: PessoaJuridica;
    enderecos: Endereco[];
    telefones: Telefone[];
}

export interface PessoaCriacao {
    id?: string;
    nome?: string;
    tipo?: number;
    email?: string;
    categoria?: string;
    telefone?: string;
    imagemLink?: string;
    cpf?: string;
    rg?: string;
    cep?: string;
    endereco?: string;
    complemento?: string;
    pais?: string;
    numero?: number;
    bairro?: string;
    logradouro?: string;
    cidade?: string;
    estado?: string;
    dataNascimento?: string;
    razaoSocial?: string;
    cnpj?: string;
    inscricaoEstadual?: string;
    nomeFantasia?: string;
    contato?: string;
}

export async function pegaTodasPessoas(): Promise<Pessoa[]> {
    const pessoasData = await db.pessoa.findMany(
        {
            include: {
                enderecos: true,
                pessoaFisica: true,
                pessoaJuridica: true,
                telefones: true,
            }
        }
    );

    if (pessoasData.length === 0) {
        return []
    }
    return pessoasData;
}

export async function pegaTodasCategoriasPessoas(): Promise<CategoriaPessoa[]> {
    return db.categoriaPessoa.findMany();
}

export async function pegaUmaPessoa(id: number): Promise<PessoaFisJurEnd | null> {
    const pessoa = await db.pessoa.findFirst({
        where: {
            id: parseInt(id.toString())
        },
        include:{
            enderecos: true,
            pessoaJuridica: true,
            pessoaFisica: true,
            telefones: true,
        }
    });

    return pessoa;
}

export const criarPessoa = async (pessoa: PessoaCriacao) => {
    const criarTelefones = {
        create: {
            numero: pessoa.telefone!,
            tipo: '',
        }
    };

    const criarEnderecos = {
        create: {
            cep: parseInt(pessoa.cep!)!,
            bairro: pessoa.bairro!,
            cidade: pessoa.cidade!,
            estado: pessoa.estado!,
            complemento: pessoa.complemento!,
            logradouro: pessoa.logradouro!,
            numero: pessoa.numero!,
            pais: pessoa.pais!,
        }
    };

    const criarPessoaFisica = () => ({
        create: {
            cpf: parseInt(pessoa.cpf!),
            dataNascimento: new Date(pessoa.dataNascimento!),
            nome: pessoa.nome!,
            rg: parseInt(pessoa.rg!),
        }
    });

    const criarPessoaJuridica = () => ({
        create: {
            cnpj: parseInt(pessoa.cnpj!),
            inscricaoEstadual: parseInt(pessoa.inscricaoEstadual!),
            nomeFantasia: pessoa.nomeFantasia,
            razaoSocial: pessoa.razaoSocial!,
        }
    });

    const data = {
        categoriaId: pessoa.categoria === 'Física' ? 5 : pessoa.tipo!,
        email: pessoa.email!,
        imagemLink: pessoa.imagemLink!,
        telefones: criarTelefones,
        enderecos: criarEnderecos,
        ...(pessoa.categoria === 'Física'
            ? { pessoaFisica: criarPessoaFisica() }
            : { pessoaJuridica: criarPessoaJuridica() }),
    };

    try {
        await db.pessoa.create({ data });
    } catch (err) {
        console.log(err);
    }

    revalidatePath(paths.pessoas());
    redirect(paths.pessoas());
};


export const editarPessoa = async (pessoa: PessoaCriacao) => {
    // Precisamos primeiro buscar os IDs das entidades relacionadas
    const pessoaExistente = await db.pessoa.findUnique({
        where: { id: parseInt(pessoa.id!) },
        include: {
            telefones: true,
            enderecos: true,
            pessoaFisica: true,
            pessoaJuridica: true,
        }
    });

    if (!pessoaExistente) throw new Error('Pessoa não encontrada');

    const atualizarTelefones =  {
        update: {
            where: {
                id: pessoaExistente.telefones[0].id
            },
            data: {
                numero: pessoa.telefone,
                tipo: '',
            }
        }
    };

    const atualizarEnderecos = pessoaExistente.enderecos[0]?.id ? {
        update: {
            where: {
                id: pessoaExistente.enderecos[0].id
            },
            data: {
                cep: parseInt(pessoa.cep!)!,
                bairro: pessoa.bairro!,
                cidade: pessoa.cidade!,
                estado: pessoa.estado!,
                complemento: pessoa.complemento!,
                logradouro: pessoa.logradouro!,
                numero: pessoa.numero!,
                pais: pessoa.pais!,
            }
        }
    } : {
        create: {
            cep: parseInt(pessoa.cep!)!,
            bairro: pessoa.bairro!,
            cidade: pessoa.cidade!,
            estado: pessoa.estado!,
            complemento: pessoa.complemento!,
            logradouro: pessoa.logradouro!,
            numero: pessoa.numero!,
            pais: pessoa.pais!,
        }
    };

    const atualizarPessoaFisica = () =>
        pessoaExistente.pessoaFisica?.id ? {
            update: {
                where: {
                    id: pessoaExistente.pessoaFisica.id
                },
                data: {
                    cpf: parseInt(pessoa.cpf!),
                    dataNascimento: new Date(pessoa.dataNascimento!),
                    nome: pessoa.nome!,
                    rg: parseInt(pessoa.rg!),
                }
            }
        } : {
            create: {
                cpf: parseInt(pessoa.cpf!),
                dataNascimento: new Date(pessoa.dataNascimento!),
                nome: pessoa.nome!,
                rg: parseInt(pessoa.rg!),
            }
        };

    const atualizarPessoaJuridica = () =>
        pessoaExistente.pessoaJuridica?.id ? {
            update: {
                where: {
                    id: pessoaExistente.pessoaJuridica.id
                },
                data: {
                    cnpj: parseInt(pessoa.cnpj!),
                    inscricaoEstadual: parseInt(pessoa.inscricaoEstadual!),
                    nomeFantasia: pessoa.nomeFantasia,
                    razaoSocial: pessoa.razaoSocial!,
                }
            }
        } : {
            create: {
                cnpj: parseInt(pessoa.cnpj!),
                inscricaoEstadual: parseInt(pessoa.inscricaoEstadual!),
                nomeFantasia: pessoa.nomeFantasia,
                razaoSocial: pessoa.razaoSocial!,
            }
        };

    const data = {
        categoriaId: pessoa.categoria === 'Física' ? 5 : pessoa.tipo!,
        email: pessoa.email!,
        imagemLink: pessoa.imagemLink!,
        telefones: atualizarTelefones,
        enderecos: atualizarEnderecos,
        ...(pessoa.categoria === 'Física'
                ? { pessoaFisica: atualizarPessoaFisica() }
                : { pessoaJuridica: atualizarPessoaJuridica() }
        ),
    };

    try {
        await db.pessoa.update({
            where: {
                id: parseInt(pessoa.id!)
            },
            data
        });
    } catch (err) {
        console.log(err);
    }

    revalidatePath(paths.pessoas());
    redirect(paths.pessoas());
};

export const deletePessoa = async (pessoaId: number) => {
    await db.pessoa.delete({
        where: {
            id: pessoaId,
        },
    })

    revalidatePath(paths.pessoas());
};