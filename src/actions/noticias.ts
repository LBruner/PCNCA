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
}

export const createNoticia = async (
    {
        title,
        subtitle,
        content,
        imageUrl,
        categoryName,
        authorId = 2,
        categoryId = 1,
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
            thumbnailText: categoryName,
            status: 'Publicado',
        }
    });

    revalidatePath(paths.noticias());
    redirect(paths.showNoticia(novaNoticia.id))
};

export const getNoticias = async () => {
    // const session = await getServerSession();
    //
    // if (!session) return;

    return db.article.findMany();
}

export const getNoticia = async (noticiaId: string ) => {
    // const session = await getServerSession();
    //
    // if (!session) return;

    return db.article.findUnique({
        where: {
            id: parseInt(noticiaId),
        }
    });
}

export const getCategorias = async () => {
    // const session = await getServerSession();
    //
    // if (!session) return;

    return db.category.findMany();
}