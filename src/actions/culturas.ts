'use server';
import {db} from "@/db";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {Category, Cultura} from "@prisma/client";

export const pegaTodasCulturas = async (): Promise<Cultura[]> => {
    return db.cultura.findMany();
}

export const pegaCulturaPorId = async (id: number): Promise<Cultura | null> => {
    return db.cultura.findUnique({
        where: {
            culturaId: id
        }
    })
}

export const criarCultura = async (name: string, description: string, url: string) => {
    console.log(name)
    console.log(description)
    console.log(url)
    await db.cultura.create({
        data: {
            nome: name,
            descricao: description,
            imagemLink: url
        }
    });

    revalidatePath(paths.admCulturas());
    revalidatePath(paths.culturas());
}

export const editarCultura = async (cultura: Cultura) => {
    await db.cultura.update({
        where: {
            culturaId: cultura.culturaId
        },
        data: {
            nome: cultura.nome,
            descricao: cultura.descricao,
            imagemLink: cultura.imagemLink
        }
    });

    revalidatePath(paths.admCulturas());
    revalidatePath(paths.culturas());
}

export const deletarCultura = async (cultura: number) => {
    await db.cultura.delete({
        where: {
            culturaId: cultura,
        },
    })

    revalidatePath(paths.admCulturas());
    revalidatePath(paths.culturas());
};