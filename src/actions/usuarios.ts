import {db} from "@/db";
import {getServerSession} from "next-auth";
import {Empresa, Usuario} from "@prisma/client";

export type UsuarioComEmpresa = Usuario & { empresa: Empresa }

export const pegaUsuario = async (): Promise<UsuarioComEmpresa | null> => {
    const session = await getServerSession()

    if (!session?.user?.email) return null;

    return db.usuario.findFirst({
        where: {email: session.user.email},
        include: {empresa: true}
    });
}
