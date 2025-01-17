'use server';

import {db} from "@/db";
import {Pessoa, TipoPessoa} from "@prisma/client";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {redirect} from "next/navigation";

export async function pegaTodasPessoas(): Promise<Pessoa[]> {
    const pessoasData = await db.pessoa.findMany();

    if (pessoasData.length === 0) {
        return []
    }
    return pessoasData;
}

export async function pegaTodosTiposPessoa(): Promise<TipoPessoa[]> {
    return db.tipoPessoa.findMany();
}

export async function pegaUmaPessoa(id: number): Promise<Pessoa | null> {
    const pessoa = await db.pessoa.findFirst({
        where: {
            id: parseInt(id.toString())
        }
    });

    return pessoa;
}

export const criarPessoa = async (pessoa: Pessoa) => {
    await db.pessoa.create({
        data: {
            nome: pessoa.nome,
            email: pessoa.email,
            cpf: pessoa.cpf || null,
            dataNascimento: pessoa.dataNascimento,
            rg: pessoa.rg || null,
            endereco: pessoa.endereco,
            tipo: pessoa.tipo,
            cep: pessoa.cep,
            imagem: pessoa.imagem,
            cidade: pessoa.cidade,
            estado: pessoa.estado,
            contato: pessoa.contato,
            categoria: pessoa.categoria,
            razaoSocial: pessoa.razaoSocial || null,
            cnpj: pessoa.cnpj || null,
            inscricaoEstadual: pessoa.inscricaoEstadual || null,
            nomeFantasia: pessoa.nomeFantasia || null,
        },
    });

    revalidatePath(paths.pessoas());
    redirect(paths.pessoas())
};

export const editarPessoa = async (pessoa: Pessoa) => {
    console.log(pessoa);
    try {
        await db.pessoa.update({
            where: {
                id: parseInt(pessoa.id.toString())
            },
            data: pessoa,
        });

    }
    catch (e) {
        console.log(e)
    }
    revalidatePath(paths.pessoas());
    redirect(paths.pessoas())
}

export const deletePessoa = async (pessoaId: number) => {
    await db.pessoa.delete({
        where: {
            id: pessoaId,
        },
    })

    revalidatePath(paths.pessoas());
};