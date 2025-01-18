'use server';

import {db} from "@/db";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {redirect} from "next/navigation";
import {Autor, Cultura, Noticia} from "@prisma/client";

export type NoticiaComAutorCultura = Noticia & {
    cultura: Cultura;
    autor: Autor;
};

interface CreateNoticiaArgs {
    id?: string;
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

export type getNoticiasArgs = {
    idCultura?: string;
}

export const editNoticia = async (
    {
        id,
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
    const noticiaEditada = await db.article.update({
        where: {id: parseInt(id!)},
        data: {
            title: title,
            subtitle: subtitle,
            content: content,
            authorId: authorId,
            categoryId: categoryId,
            imageUrl: imageUrl,
            thumbnailText: thumbnailSubtitle || categoryName,
            status: status,
        }
    });

    revalidatePath(paths.noticias());
    revalidatePath(paths.showNoticia(noticiaEditada.id));
    redirect(paths.showNoticia(noticiaEditada.id))
};

export const deleteNoticia = async (noticiaId: number) => {
    await db.article.delete({
        where: {
            id: noticiaId,
        },
    })

    revalidatePath(paths.noticias());
};


export const pegaNoticiasPorId = async (noticiaId: number): Promise<NoticiaComAutorCultura[]> => {
    console.log(noticiaId)
    return db.noticia.findMany({
        where: {
            idCultura: noticiaId,
        },
        include: {
            autor: true,
            cultura: true,
        }
    });
}

export const pegaTodasNoticias = async ({idCultura}: getNoticiasArgs = {}): Promise<NoticiaComAutorCultura[]> => {
    const where = idCultura ? {
        idCultura: parseInt(idCultura)
    } : {};

    return db.noticia.findMany({
        where,
        orderBy: {
            dataPubli: 'desc'
        },
        include: {
            autor: true,
            cultura: true,
        }
    });
}

export const pegaUmaNoticia = async (noticiaId: string): Promise<Noticia | null> => {
    return db.noticia.findUnique({
        where: {
            notId: parseInt(noticiaId),
        }
    });
}

export const pegaArtigosRelacionados = async (noticiaAtualId: number, quantity: number,culturaId?: number): Promise<Noticia[]> => {
    if (quantity <= 0) {
        throw new Error('Quantity must be greater than 0');
    }

    const count = await db.noticia.count();

    if (count === 0) {
        return [];
    }
    
    return db.noticia.findMany({
        take: 4,
        where: {
            idCultura: culturaId,
            notId: {
                not: noticiaAtualId
            }
        },
    });
}