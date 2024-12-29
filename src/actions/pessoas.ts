'use server';

import {db} from "@/db";
import {PessoasComCategoria} from "@/components/pessoas/tabela/tabela-pessoas";
import {CategoriaPessoa, Pessoa} from "@prisma/client";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {redirect} from "next/navigation";

export async function pegaTodasPessoas(): Promise<PessoasComCategoria[] | null> {
    const pessoasData = await db.pessoa.findMany({
        include: {
            categoria: true
        },
    });

    if (pessoasData.length === 0) {
        return []
    }
    return pessoasData;
}

export async function pegaTodasCategoriasPessoas(): Promise<CategoriaPessoa[]> {
    const categoriasPessoasData = await db.categoriaPessoa.findMany({
    });

    if (categoriasPessoasData.length === 0) {
        return []
    }
    return categoriasPessoasData;
}

export const createPessoa = async (pessoa: Pessoa) => {
    await db.pessoa.create({
        data: {
            nome: pessoa.nome,
            email: pessoa.email,
            cpf: pessoa.cpf || null,
            dataNascimento: pessoa.dataNascimento,
            rg: pessoa.rg || null,
            endereco: pessoa.endereco,
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

export const updatePessoa = async (pessoa: Pessoa) => {
    await db.pessoa.update({
        where: {
            id: pessoa.id
        },
        data: {
            nome: pessoa.nome,
            email: pessoa.email,
            categoriaId: parseInt(String(pessoa.categoriaId))
        }
    });

    revalidatePath(paths.admCategorias());
    revalidatePath(paths.culturas());
}

export const deletePessoa = async (pessoaId: number) => {
    await db.pessoa.delete({
        where: {
            id: pessoaId,
        },
    })

    revalidatePath(paths.pessoas());
};