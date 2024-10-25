import {db} from "@/db";
import {getNoticiasArgs} from "@/actions/noticias";
import {Author, Category} from "@prisma/client";
import {FilterCollection} from "@/models/shared/FilterCollection";

export const getNoticias = async ({categoryId}: getNoticiasArgs = {}): Promise<any> => {
    const where = categoryId ? {
        categoryId: parseInt(categoryId)
    } : {};

    return db.article.findMany({
        where,
        orderBy: {
            publishedAt: 'desc'
        },
        include: {
            author: true,
            category: true,
        }
    });
}

export const getAutoresUnicos = async (): Promise<Author[]> => {
    return db.author.findMany({
        where: {
            articles: {
                some: {}
            }
        },
        distinct: ['id']
    });
}

export const getCategoriasUnicas = async (): Promise<Category[]> => {
    return db.category.findMany({
        where: {
            articles: {
                some: {}
            }
        },
        distinct: ['id']
    });
}

export const getAutoresFilterColletion = async (): Promise<FilterCollection[]> => {
    const autoresUnicos = await getAutoresUnicos();

    return autoresUnicos.map((autor: Author) => {
        return {
            uid: autor.name,
            name: autor.name
        }
    });
}

export const getCategoriasFilterColletion = async (): Promise<FilterCollection[]> => {
    const categoriasUnicas = await getCategoriasUnicas();

    return categoriasUnicas.map((category: Category) => {
        return {
            uid: category.name,
            name: category.name
        }
    });
}
