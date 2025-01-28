'use server';

import {db} from "@/db";
import {Cultura, Estoque, HistoricoEstoque, Pessoa, PessoaJuridica, Venda, VendaPessoa} from "@prisma/client";
import {getServerSession, Session} from "next-auth";
import {redirect} from "next/navigation";
import paths from "@/paths";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export type ProdutoEstoqueComRelacoes = HistoricoEstoque & {
    venda: Venda & {
        pessoas: (VendaPessoa & { pessoa: Pessoa & { pessoaJuridica?: PessoaJuridica | null } })[]
    }, estoque: Estoque & {
        categoriaId: Cultura | null,
        historicos: HistoricoEstoque[],
    };
}

export const pegaTodosEstoquesUsuario = async (): Promise<ProdutoEstoqueComRelacoes[]> => {
    const session: Session | null = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect(paths.noticias())
    }

    return db.historicoEstoque.findMany({
            where: {
                usuarioId: session?.user.id,
            },
            include: {
                venda: {
                    include: {
                        estoques: true,
                        pessoas: {
                            include: {
                                pessoa: {
                                    include: {
                                        pessoaJuridica: true,
                                    }
                                },
                            },
                        }
                    }
                },
                estoque: {
                    include: {
                        categoriaId: true,
                        historicos: true,
                    },
                },
            }
        }
    )
}

export const pegaUmEstoque = async (estoqueId: number): Promise<ProdutoEstoqueComRelacoes | null> => {
    return db.historicoEstoque.findUnique(
        {
            where: {
                id: estoqueId,
            },
            include: {
                venda: {
                    include: {
                        estoques: true,
                        pessoas: {
                            include: {
                                pessoa: {
                                    include: {
                                        pessoaJuridica: true,
                                    }
                                },
                            },
                        }
                    }
                },
                estoque: {
                    include: {
                        categoriaId: true,
                        historicos: true,
                    },
                },
            }
        }
    )
}