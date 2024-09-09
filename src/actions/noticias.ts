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