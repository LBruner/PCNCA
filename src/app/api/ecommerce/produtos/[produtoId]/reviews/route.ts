import {authOptions} from "@/app/AuthOptions";
import {db} from "@/db";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {z} from "zod";

const bodySchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(1, "Comentário obrigatório"),
});

const selectUsuario = {
  select: {
    id: true,
    nome: true,
    email: true,
    imagemLink: true,
  },
};

export async function GET(_: Request, {params}: {params: {produtoId: string}}) {
  const produtoId = Number(params.produtoId);

  if (!Number.isFinite(produtoId)) {
    return NextResponse.json({message: "Produto inválido"}, {status: 400});
  }

  const reviews = await db.estoqueReview.findMany({
    where: {estoqueId: produtoId},
    include: {
      usuario: selectUsuario,
    },
    orderBy: {createdAt: "desc"},
  });

  return NextResponse.json(reviews);
}

export async function POST(request: Request, {params}: {params: {produtoId: string}}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({message: "Não autenticado"}, {status: 401});
  }

  const produtoId = Number(params.produtoId);

  if (!Number.isFinite(produtoId)) {
    return NextResponse.json({message: "Produto inválido"}, {status: 400});
  }

  const json = await request.json().catch(() => null);

  const validation = bodySchema.safeParse(json);
  if (!validation.success) {
    return NextResponse.json({message: "Dados inválidos", errors: validation.error.flatten().fieldErrors}, {status: 400});
  }

  const existing = await db.estoqueReview.findFirst({
    where: {
      estoqueId: produtoId,
      usuarioId: session.user.id,
    },
  });

  if (existing) {
    return NextResponse.json({message: "Review já cadastrada"}, {status: 409});
  }

  const usuario = await db.usuario.findUnique({
    where: {id: session.user.id},
    select: {
      nome: true,
      email: true,
    },
  });

  const review = await db.estoqueReview.create({
    data: {
      estoqueId: produtoId,
      usuarioId: session.user.id,
      rating: validation.data.rating,
      comment: validation.data.comment,
      reviewerName: usuario?.nome ?? session.user.name ?? usuario?.email ?? "Usuário",
    },
    include: {
      usuario: selectUsuario,
    },
  });

  return NextResponse.json(review, {status: 201});
}
