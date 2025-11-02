'use server';

import {authOptions} from "@/app/AuthOptions";
import {db} from "@/db";
import {getServerSession} from "next-auth";

export type ReviewWithUser = Awaited<ReturnType<typeof pegaReviewsProduto>>[number];

export const pegaReviewsProduto = async (produtoId: number) => {
  return db.estoqueReview.findMany({
    where: {estoqueId: produtoId},
    include: {
      usuario: {
        select: {
          id: true,
          nome: true,
          email: true,
          imagemLink: true,
        },
      },
    },
    orderBy: {createdAt: "desc"},
  });
};

export const pegaReviewAtualDoProduto = async (produtoId: number) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  return db.estoqueReview.findFirst({
    where: {
      estoqueId: produtoId,
      usuarioId: session.user.id,
    },
    include: {
      usuario: {
        select: {
          id: true,
          nome: true,
          email: true,
          imagemLink: true,
        },
      },
    },
  });
};
