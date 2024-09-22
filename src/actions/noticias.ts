'use server';

import {db} from "@/db";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {redirect} from "next/navigation";

interface CreateNoticiaArgs {
    title: string;
    subtitle: string;
    content: string;
    imageUrl: string;
    categoryName: string;
    authorId?: number;
    categoryId?: number;
    thumbnailSubtitle?: string,
    status?: string;
}

export const createNoticia = async (
    {
        title,
        subtitle,
        content,
        imageUrl,
        categoryName,
        thumbnailSubtitle,
        authorId = 2,
        categoryId = 1,
        status = 'Publicado'
    }: CreateNoticiaArgs) => {
    const novaNoticia = await db.article.create({
        data: {
            title: title,
            subtitle: subtitle,
            content: content,
            publishedAt: new Date(),
            authorId: authorId,
            categoryId: categoryId,
            imageUrl: imageUrl,
            thumbnailText: thumbnailSubtitle || categoryName,
            status: status,
        }
    });

    revalidatePath(paths.noticias());
    redirect(paths.showNoticia(novaNoticia.id))
};

type getNoticiasArgs = {
    categoryId?: string;
}


export const getNoticias = async ({categoryId}: getNoticiasArgs = {}) => {
    const where = categoryId ? {
        categoryId: parseInt(categoryId)
    } : {};

    return db.article.findMany({
        where,
        orderBy: {
            publishedAt: 'desc'
        }
    });
}

export const getNoticia = async (noticiaId: string ) => {
    return db.article.findUnique({
        where: {
            id: parseInt(noticiaId),
        }
    });
}

export const getRelatedArticles = async (currentArticleId: string, quantity: number) => {
    if (quantity <= 0) {
        throw new Error('Quantity must be greater than 0');
    }

    const count = await db.article.count(); // Get total count of articles

    if (count === 0) {
        return [];
    }

    const limit = Math.min(quantity, count);

    const skip = Math.floor(Math.random() * (count - limit + 1));

    return db.article.findMany({
        skip,
        take: limit,
        where: {
            id: {
                not: parseInt(currentArticleId),
            },
        },
    });
}

export const getCategorias = async () => {
    // const session = await getServerSession();
    //
    // if (!session) return;

    return db.category.findMany();
}