'use server';

import {db} from "@/db";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {redirect} from "next/navigation";
import {Cultura, Noticia} from "@prisma/client";

export type NoticiaComCultura = Noticia & {
    cultura: Cultura;
};

export type NoticiaEdicao = { notId: number; } & NoticiaCriacao;

export type getNoticiasArgs = {
    idCultura?: string;
}

export const editarNoticia = async (noticia: NoticiaEdicao) => {
    const noticiaEditada = await db.noticia.update({
        where: {notId: noticia.notId},
        data: {
            titulo: noticia.titulo,
            subtitulo: noticia.subtitulo,
            corpo: noticia.corpo,
            idCultura: noticia.idCultura,
            imagemLink: noticia.imagemLink,
            descricao: noticia.descricao,
        }
    });

    revalidatePath(paths.noticias());
    revalidatePath(paths.showNoticia(noticiaEditada.notId));
    redirect(paths.showNoticia(noticiaEditada.notId))
};

export const pegaTodasNoticias = async ({idCultura}: getNoticiasArgs = {}): Promise<NoticiaComCultura[]> => {
    const where = idCultura ? {
        idCultura: parseInt(idCultura)
    } : {};

    return db.noticia.findMany({
        where,
        orderBy: {
            dataPubli: 'desc'
        },
        include: {
            cultura: true,
        }
    });
}

export const pegaUmaNoticia = async (noticiaId: number): Promise<NoticiaComCultura | null> => {
    return db.noticia.findUnique({
        include:{
          cultura: true,
        },
        where: {
            notId: noticiaId,
        }
    });
}

export const pegaNoticiasPorId = async (noticiaId: number): Promise<NoticiaComCultura[]> => {
    return db.noticia.findMany({
        where: {
            idCultura: noticiaId,
        },
        include: {
            cultura: true,
        }
    });
}

export const pegaArtigosRelacionados = async (noticiaAtualId: number, quantity: number, culturaId?: number): Promise<Noticia[]> => {
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

export interface NoticiaCriacao {
    titulo: string;
    subtitulo: string;
    corpo: string;
    idCultura: number;
    imagemLink: string;
    descricao: string;
}


export const criarNoticia = async (
    noticiaCriacao: NoticiaCriacao) => {
    const novaNoticia = await db.noticia.create({
        data: {
            titulo: noticiaCriacao.titulo,
            subtitulo: noticiaCriacao.subtitulo,
            corpo: noticiaCriacao.corpo,
            dataPubli: new Date(),
            idCultura: noticiaCriacao.idCultura,
            imagemLink: noticiaCriacao.imagemLink,
            descricao: noticiaCriacao.descricao,
        }
    });

    revalidatePath(paths.noticias());
    redirect(paths.showNoticia(novaNoticia.notId))
};

export const deletarNoticia = async (noticiaId: number) => {
    await db.noticia.delete({
        where: {
            notId: noticiaId,
        },
    })

    revalidatePath(paths.noticias());
};