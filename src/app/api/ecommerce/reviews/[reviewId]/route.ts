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

async function ensureOwnership(reviewId: number, userId: string) {
  const review = await db.estoqueReview.findUnique({
    where: {id: reviewId},
    select: {
      id: true,
      usuarioId: true,
    },
  });

  if (!review) {
    return {error: NextResponse.json({message: "Review não encontrada"}, {status: 404})};
  }

  if (review.usuarioId !== userId) {
    return {error: NextResponse.json({message: "Sem permissão"}, {status: 403})};
  }

  return {review};
}

export async function PATCH(request: Request, {params}: {params: {reviewId: string}}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({message: "Não autenticado"}, {status: 401});
  }

  const reviewId = Number(params.reviewId);

  if (!Number.isFinite(reviewId)) {
    return NextResponse.json({message: "Review inválida"}, {status: 400});
  }

  const payload = await request.json().catch(() => null);
  const validation = bodySchema.safeParse(payload);

  if (!validation.success) {
    return NextResponse.json({message: "Dados inválidos", errors: validation.error.flatten().fieldErrors}, {status: 400});
  }

  const ownership = await ensureOwnership(reviewId, session.user.id);
  if (ownership.error) return ownership.error;

  const updated = await db.estoqueReview.update({
    where: {id: reviewId},
    data: {
      rating: validation.data.rating,
      comment: validation.data.comment,
    },
    include: {
      usuario: selectUsuario,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, {params}: {params: {reviewId: string}}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({message: "Não autenticado"}, {status: 401});
  }

  const reviewId = Number(params.reviewId);

  if (!Number.isFinite(reviewId)) {
    return NextResponse.json({message: "Review inválida"}, {status: 400});
  }

  const ownership = await ensureOwnership(reviewId, session.user.id);
  if (ownership.error) return ownership.error;

  await db.estoqueReview.delete({
    where: {id: reviewId},
  });

  return NextResponse.json({ok: true});
}
