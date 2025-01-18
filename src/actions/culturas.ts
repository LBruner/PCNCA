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

export const pegaCulturas = async (): Promise<Cultura[]> => {
    return db.cultura.findMany({
        where: {
            nome: {
                in: ['Aves', 'Milho', 'Soja', 'Bovinos']
            }
        }
    });
}

export const createCategory = async (name: string, description: string, url: string) => {
    await db.category.create({
        data: {
            name: name,
            description: description,
            url: url
        }
    });

    revalidatePath(paths.admCategorias());
    revalidatePath(paths.culturas());
}

export const updateCategory = async (category: Category) => {
    await db.category.update({
        where: {
            id: category.id
        },
        data: {
            name: category.name,
            description: category.description,
            url: category.url
        }
    });

    revalidatePath(paths.admCategorias());
    revalidatePath(paths.culturas());
}

export const deleteCategoria = async (categoriaId: number) => {
    await db.category.delete({
        where: {
            id: categoriaId,
        },
    })

    revalidatePath(paths.admCategorias());
    revalidatePath(paths.culturas());
};