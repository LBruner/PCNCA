'use server';

import {db} from "@/db";
import {getServerSession} from "next-auth";
import {Empresa, HistoricoEstoque, Usuario} from "@prisma/client";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {authOptions} from "@/app/AuthOptions";

export type UsuarioComEmpresa = Usuario & { empresa: Empresa }
export type UsuarioComEmpresaEstoque = Usuario & { empresa: Empresa } & {historicos: HistoricoEstoque[]}

export const pegaTodosUsuarios = async (): Promise<UsuarioComEmpresaEstoque[]> => {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return [];

    const usuarioLogado = await db.usuario.findFirst({
        where: {email: session.user.email},
    });

    return db.usuario.findMany({
        where: {
            empresaId: usuarioLogado?.empresaId,
            id: {
                not: usuarioLogado?.id
            }
        },
        orderBy: {
            nome: 'asc'
        },
        include: {empresa: true, historicos: true}
    });
}

export const pegaUsuario = async (): Promise<UsuarioComEmpresa | null> => {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) return null;

    return db.usuario.findFirst({
        where: {email: session.user.email},
        include: {empresa: true}
    });
}

export const alterarSenha = async (novaSenha: string): Promise<void> => {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) return;

    const id = session.user.id;

    await db.usuario.update({
        where: {id: id},
        data: {
            senha: novaSenha,
            alterarSenha: false,
        }
    });
}

export const resetarSenha = async (idUsuario: string): Promise<void> => {
    await db.usuario.update({
        where: {id: idUsuario},
        data: {
            alterarSenha: true,
        }
    });

    revalidatePath(paths.configuracoesUsuario());
}

export const deletarUsuario = async (idUsuario: string): Promise<void> => {
    await db.usuario.delete(
        {
            where: {id: idUsuario},
        }
    );

    revalidatePath(paths.configuracoesUsuario());
}

export const desativarUsuario = async (idUsuario: string): Promise<void> => {
    await db.usuario.update(
        {
            where: {id: idUsuario},
            data: {
                inativado: true
            }
        },
    );

    revalidatePath(paths.configuracoesUsuario());
}

export const reativarUsuario = async (idUsuario: string): Promise<void> => {
    await db.usuario.update(
        {
            where: {id: idUsuario},
            data: {
                inativado: false
            }
        },
    );

    revalidatePath(paths.configuracoesUsuario());
}




