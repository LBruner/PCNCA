'use server';
import {db} from "@/db";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {Category} from "@prisma/client";

export const getCategoryById = async (id: number) => {
    return db.category.findUnique({
        where: {
            id: id
        }
    })
}

export const getAllCategories = async () => {
    return db.category.findMany();
}

export const getCategorias = async (): Promise<Category[]> => {
    // return [
    //     {
    //         "id": 6,
    //         "name": "Café",
    //         "description": "O café é uma das culturas mais populares e economicamente significativas no mundo",
    //         "url": "/images/cafe.jpg"
    //     },
    //     {
    //         "id": 12,
    //         "name": "Bovinos",
    //         "description": "A cana-de-açúcar é uma das principais culturas para a produção de açúcar e etanol. Cultivada principalmente em regiões tropicais e subtropicais",
    //         "url": "/images/bovinos.jpg"
    //     },
    //     {
    //         "id": 2,
    //         "name": "Milho",
    //         "description": "O milho é uma das principais culturas de grãos do mundo",
    //         "url": "/images/corn.jpg"
    //     },
    //     {
    //         "id": 13,
    //         "name": "Aves",
    //         "description": "A cana-de-açúcar é uma das principais culturas para a produção de açúcar e etanol. Cultivada principalmente em regiões tropicais e subtropicais",
    //         "url": "/images/aves.jpg"
    //     },
    //     {
    //         "id": 3,
    //         "name": "Soja",
    //         "description": "A soja é uma cultura leguminosa altamente valorizada",
    //         "url": "/images/graos.jpg"
    //     },
    //     {
    //         "id": 7,
    //         "name": "Cana-de-açúcar",
    //         "description": "A cana-de-açúcar é uma das principais culturas para a produção de açúcar e etanol. Cultivada principalmente em regiões tropicais e subtropicais",
    //         "url": "/images/cana.jpg"
    //     }
    // ]

    const categories = await db.category.findMany({
        where: {
            name: {
                in: ['Aves', 'Milho', 'Soja', 'Bovinos']
            }
        }
    });

    if (!categories || categories.length == 0) {
        return [];
    }

    return categories;
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