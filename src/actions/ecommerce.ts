'use server';
import {Estoque, Prisma} from "@prisma/client";
import {db} from "@/db";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/AuthOptions";

export type TransacaoComVenda = Prisma.TransacaoGetPayload<{
  include: {
    venda: {
      include: {
        estoques: {
          include: {
            estoque: true,
          };
        };
      };
    };
  };
}>;

export const pegaComprasUsuario = async (): Promise<TransacaoComVenda[]> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error('Usuário não autenticado');
  }

  const userId = session.user.id;

  const transacoes = await db.transacao.findMany({
    where: {
      usuarioId: userId,
    },
    include: {
      venda: {
        include: {
          estoques: {
            include: {
              estoque: true,
            },
          },
        },
      },
    },
  });

  return transacoes;
}

export const pegaProdutosPorCategoria = async (categoria: string): Promise<Estoque[]> => {
    return db.estoque.findMany({
      where: { 
        tipo: categoria,
        categoriaculturaId: 5000,
        quantidade: {
          gt: 0
        },
        ativo: true
       }
    });
};
