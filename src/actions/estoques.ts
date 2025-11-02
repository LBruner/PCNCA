'use server';

import { authOptions } from "@/app/AuthOptions";
import { db } from "@/db";
import paths from "@/paths";
import { Cultura, Empresa, Estoque } from "@prisma/client";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";
import { pegaUsuario } from "./usuarios";

export type EstoqueComCultura = Estoque & {
    categoriaId: Cultura | null,
};

export const pegaTodosEstoquesUsuario = async (): Promise<EstoqueComCultura[]> => {
    const session: Session | null = await getServerSession(authOptions);

    console.log("session in pegaTodosEstoquesUsuario:", session);
    if (!session || !session.user) {
        redirect(paths.noticias());
    }

    const user = await pegaUsuario();

    if (!user) {
        redirect(paths.noticias());
    }

    return db.estoque.findMany({
        where: {
            empresaId: user.empresaId!,
            quantidade: {
                gt: 0
            },
        },
        include: {
            categoriaId: true,
        }
    },
    )
}

export const pegaUmEstoque = async (estoqueId: number): Promise<EstoqueComCultura | null> => {
    return db.estoque.findUnique(
        {
            where: {
                id: estoqueId,
            },
            include: {
                categoriaId: true,
            },
        },
    )
}

export type EstoqueComEmpresa = Estoque & {
    empresa: Empresa | null;
}

export const pegaDetalhesProduto = async (produtoId: string): Promise<EstoqueComEmpresa | null> => {
    return db.estoque.findUnique(
        {
            where: {
                id: Number(produtoId),
            },
            include: {
                empresa: true,
            }
        }
    )
}