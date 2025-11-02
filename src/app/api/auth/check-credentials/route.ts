import {NextResponse} from "next/server";
import {db} from "@/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const {email, password} = await request.json().catch(() => ({}));

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({message: "Dados de login inválidos"}, {status: 400});
    }

    const usuario = await db.usuario.findFirst({
      where: {email},
    });

    if (!usuario || !usuario.senha) {
      return NextResponse.json({message: "Email ou senha inválidos"}, {status: 401});
    }

    if (usuario.inativado) {
      return NextResponse.json({message: "Usuário inativado"}, {status: 403});
    }

    if (usuario.alterarSenha) {
      return NextResponse.json({ok: true, alterarSenha: true}, {status: 200});
    }

    const senhaValida = await bcrypt.compare(password, usuario.senha);

    if (!senhaValida) {
      return NextResponse.json({message: "Email ou senha inválidos"}, {status: 401});
    }

    return NextResponse.json({ok: true}, {status: 200});
  } catch (error) {
    console.error("Erro ao validar credenciais:", error);
    return NextResponse.json({message: "Erro interno"}, {status: 500});
  }
}
