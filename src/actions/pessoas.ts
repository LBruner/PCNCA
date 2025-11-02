'use server';

import {db} from "@/db";
import {CategoriaPessoa, Endereco, Pessoa, PessoaFisica, PessoaJuridica, Telefone, VendaPessoa} from "@prisma/client";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {redirect} from "next/navigation";

export type PessoaFisJurEnd = Pessoa & {
    pessoaFisica: PessoaFisica | null;
    pessoaJuridica: PessoaJuridica | null;
    enderecos: Endereco[];
    telefones: Telefone[];
    categoria: CategoriaPessoa;
    VendaPessoa: VendaPessoa[];
}

export interface PessoaCriacao {
    id?: number;
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

export async function pegaTodasPessoas(): Promise<PessoaFisJurEnd[]> {
    return db.pessoa.findMany(
        {
            include: {
                enderecos: true,
                pessoaFisica: true,
                pessoaJuridica: true,
                telefones: true,
                categoria: true,
                VendaPessoa: true,
            }
        }
    );
}

export async function pegaTodasCategoriasPessoas(): Promise<CategoriaPessoa[]> {
    return db.categoriaPessoa.findMany();
}

export async function pegaUmaPessoa(id: number): Promise<PessoaFisJurEnd | null> {
    return db.pessoa.findFirst({
        where: {
            id: parseInt(id.toString())
        },
        include: {
            enderecos: true,
            pessoaJuridica: true,
            pessoaFisica: true,
            telefones: true,
            categoria: true,
            VendaPessoa: true,
        }
    });
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
        categoriaId: pessoa.categoria === 'Física' ? 1 : pessoa.tipo!,
        email: pessoa.email!,
        imagemLink: pessoa.imagemLink!,
        telefones: criarTelefones,
        enderecos: criarEnderecos,
        ...(pessoa.categoria === 'Física'
            ? {pessoaFisica: criarPessoaFisica()}
            : {pessoaJuridica: criarPessoaJuridica()}),
    };

    try {
        await db.pessoa.create({data});
    } catch (err) {
        console.log(err);
    }

    revalidatePath(paths.pessoas());
    redirect(paths.pessoas());
};


export const editarPessoa = async (pessoa: PessoaCriacao) => {
    const pessoaExistente = await db.pessoa.findUnique({
        where: {id: pessoa.id!},
        include: {
            telefones: true,
            enderecos: true,
            pessoaFisica: true,
            pessoaJuridica: true,
        }
    });

    if (!pessoaExistente) throw new Error('Pessoa não encontrada');

    const atualizarTelefones = {
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
        categoriaId: pessoa.tipo!,
        email: pessoa.email!,
        imagemLink: pessoa.imagemLink!,
        telefones: atualizarTelefones,
        enderecos: atualizarEnderecos,
        ...(pessoaExistente.pessoaFisica != null
                ? {pessoaFisica: atualizarPessoaFisica()}
                : {pessoaJuridica: atualizarPessoaJuridica()}
        ),
    };

    try {
        await db.pessoa.update({
            where: {
                id: pessoa.id!
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
    try {
        const pessoa = await db.pessoa.findUnique({
            where: {
                id: pessoaId,
            },
            include: {
                VendaPessoa: true,
                pessoaFisica: true,
                pessoaJuridica: true,
            },
        });

        if (!pessoa || pessoa.VendaPessoa.length > 0) {
            return;
        }

        await db.endereco.deleteMany({
            where: {
                pessoaId: pessoaId,
            },
        });

        await db.telefone.deleteMany({
            where: {
                pessoaId: pessoaId,
            },
        });

        if(pessoa.pessoaJuridica != null){
            await db.pessoaJuridica.deleteMany({
                where: {
                    pessoa: {
                        id: pessoaId
                    },
                },
            });
        }

        if(pessoa.pessoaFisica != null){
            await db.pessoaFisica.deleteMany({
                where: {
                    pessoa: {
                        id: pessoaId
                    },
                },
            });
        }

        await db.pessoa.delete({
            where: {
                id: pessoaId,
            },
        });

        revalidatePath(paths.pessoas());
    } catch (e) {
        console.error("Erro ao excluir pessoa:", e);
    }
};
