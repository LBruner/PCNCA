'use server';

import {db} from "@/db";
import {getServerSession} from "next-auth";
import {Empresa, Usuario} from "@prisma/client";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {authOptions} from "@/app/AuthOptions";

export type UsuarioComEmpresa = Usuario & { empresa: Empresa }

export const pegaTodosUsuarios = async (): Promise<UsuarioComEmpresa[]> => {
    return db.usuario.findMany({
        include: {empresa: true}
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

    console.log(session?.user)
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

    revalidatePath(paths.admUsuarios());
}

export const deletarUsuario = async (idUsuario: string): Promise<void> => {
    await db.usuario.delete(
        {
            where: {id: idUsuario},
        }
    );

    revalidatePath(paths.admUsuarios());
}



