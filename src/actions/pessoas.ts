'use server';

import {db} from "@/db";
import {PessoasComCategoria} from "@/components/pessoas/tabela/tabela-pessoas";
import {CategoriaPessoa, Pessoa} from "@prisma/client";
import {revalidatePath} from "next/cache";
import paths from "@/paths";

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

export const createPessoa = async (name: string, email: string, categoria: number) => {
    await db.pessoa.create({
        data: {
            nome: name,
            email: email,
            categoriaId: parseInt(categoria.toString())
        }
    });

    revalidatePath(paths.pessoas());
}

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