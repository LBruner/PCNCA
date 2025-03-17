'use server';
import {db} from "@/db";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {Cultura, Noticia} from "@prisma/client";

export const pegaTodasCulturas = async (): Promise<CulturaComNoticia[]> => {
    return db.cultura.findMany(
        {
            include: {
                noticias: true
            }
        }
    );
}

export type CulturaComNoticia = Cultura & { noticias: Noticia[] };

export const pegaCulturaPorId = async (id: number): Promise<CulturaComNoticia | null> => {
    return db.cultura.findUnique({
        where: {
            culturaId: id
        },
        include: {
            noticias: true
        }
    })
}

export const criarCultura = async (name: string, description: string, url: string) => {
    await db.cultura.create({
        data: {
            nome: name,
            descricao: description,
            imagemLink: url
        }
    });

    revalidatePath(paths.configuracoesCultura());
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

    revalidatePath(paths.configuracoesCultura());
    revalidatePath(paths.culturas());
}

export const deletarCultura = async (cultura: number) => {
    await db.cultura.delete({
        where: {
            culturaId: cultura,
        },
    })

    revalidatePath(paths.configuracoesCultura());
    revalidatePath(paths.culturas());
};