'use server';

import {db} from "@/db";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/AuthOptions";
import {getUser} from "@/actions/produto";
import {VendaComDados} from "@/components/vendas/criação/CriarVendaForm";
import {Estoque, Pessoa, PessoaFisica, PessoaJuridica, Prisma, Usuario, Venda, VendaEstoque, VendaPessoa} from "@prisma/client";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {BarChartData, LineChartData, PieChartData} from "@/models/graficos/charts";

type VendaPessoaComDetalhes = VendaPessoa & {
    pessoa: Pessoa & { pessoaJuridica?: PessoaJuridica | null; pessoaFisica?: PessoaFisica | null };
};

type VendaEstoqueComProduto = VendaEstoque & { estoque: Estoque };

type VendaComRelacionamentos = Venda & {
    pessoas: VendaPessoaComDetalhes[];
    estoques: VendaEstoqueComProduto[];
    usuario: Usuario;
    valorVenda: number;
    quantidadeVenda: number;
};

export type VendasAgrupadas = {
    id: number;
    dataAlter: Date;
    horaAlter?: string;
    valorAlter: number;
    comprador: boolean;
    estoqueId: number;
    empresaId: number;
    usuarioId: string | null;
    vendaId?: number;
    estoque: Estoque;
    venda: VendaComRelacionamentos;
};

const transacaoInclude = {
    itens: {
        include: {
            estoque: true,
        },
    },
    venda: {
        include: {
            usuario: true,
            estoques: {
                include: {
                    estoque: true,
                },
            }
        },
    },
};

const getEmpresaIdDoUsuario = async (usuarioId: string): Promise<number | null> => {
    const usuario = await db.usuario.findUnique({
        where: {id: usuarioId},
        select: {empresaId: true},
    });

    return usuario?.empresaId ?? null;
};

const getDataReferenciaTransacao = (dataCriacao: Date, dataAprovacao?: Date | null): Date => {
    return dataAprovacao ?? dataCriacao;
};

export const pegaTodasVendas = async (): Promise<VendasAgrupadas[][]> => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) return [];

    const empresaId = await getEmpresaIdDoUsuario(session.user.id!);

    if (!empresaId) {
        return [];
    }

    const transacoes = await db.transacao.findMany({
        orderBy: {
            dataCriacao: 'desc',
        },
        where: {
            empresaId,
        },
        include: transacaoInclude,
    });

    const vendasAgrupadas = transacoes
        .filter((transacao) => transacao.venda && transacao.itens.length > 0)
        .map((transacao) => {
            const dataReferencia = getDataReferenciaTransacao(transacao.dataCriacao, transacao.dataAprovacao);
            const horaReferencia = dataReferencia ? dataReferencia.toISOString().slice(11, 16) : undefined;

            const quantidadeTotal = transacao.itens.reduce((acc, item) => acc + item.quantidade, 0);
            const valorTotal = transacao.valorTotal ?? transacao.itens.reduce((acc, item) => acc + item.precoTotal, 0);

            const {pessoas: pessoasRelacionadas = [], ...vendaBase} = transacao.venda! as any;

            const vendaDetalhes: VendaComRelacionamentos = {
                ...vendaBase,
                pessoas: pessoasRelacionadas.map((vendaPessoa: any) => ({
                    ...vendaPessoa,
                    pessoa: vendaPessoa.pessoa,
                })),
                valorVenda: valorTotal,
                quantidadeVenda: quantidadeTotal,
            };

            return transacao.itens
                .filter((item) => item.estoque !== null)
                .map((item) => ({
                    id: item.id,
                    dataAlter: dataReferencia,
                    horaAlter: horaReferencia,
                    valorAlter: item.quantidade,
                    comprador: false,
                    estoqueId: item.estoqueId,
                    empresaId: transacao.empresaId,
                    usuarioId: transacao.usuarioId,
                    vendaId: transacao.vendaId ?? undefined,
                    estoque: item.estoque,
                    venda: vendaDetalhes,
                }));
        })
        .filter((grupo) => grupo.length > 0);

    vendasAgrupadas.sort((a, b) => {
        const dateA = a[0].dataAlter instanceof Date ? a[0].dataAlter.getTime() : new Date(a[0].dataAlter).getTime();
        const dateB = b[0].dataAlter instanceof Date ? b[0].dataAlter.getTime() : new Date(b[0].dataAlter).getTime();
        return dateB - dateA;
    });

    return vendasAgrupadas;
};

export async function getDadosGraficoPie(
    produtosFilter: string[],
    clientesFilter: string[]
): Promise<PieChartData> {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) return [];

    const empresaId = await getEmpresaIdDoUsuario(session.user.id!);

    if (!empresaId) return [];

    const whereClause: Prisma.TransacaoWhereInput = {
        empresaId,
    };

    if (produtosFilter.length > 0) {
        whereClause.itens = {
            some: {
                estoque: {
                    produto: {
                        in: produtosFilter,
                    },
                },
            },
        };
    }

    if (clientesFilter.length > 0) {
        whereClause.venda = {
            VendaPessoa: {
                some: {
                    pessoa: {
                        OR: [
                            {
                                pessoaJuridica: {
                                    razaoSocial: {
                                        in: clientesFilter,
                                    },
                                },
                            },
                            {
                                pessoaFisica: {
                                    nome: {
                                        in: clientesFilter,
                                    },
                                },
                            },
                        ],
                    },
                },
            },
        };
    }

    const transacoes = await db.transacao.findMany({
        where: whereClause,
        include: {
            itens: {
                include: {
                    estoque: true,
                },
            },
        },
    });

    const productDataMap = transacoes.reduce<Record<string, number>>((acc, transacao) => {
        transacao.itens.forEach((item) => {
            const product = item.estoque?.produto;
            if (!product) return;

            if (produtosFilter.length > 0 && !produtosFilter.includes(product)) {
                return;
            }

            acc[product] = (acc[product] ?? 0) + item.quantidade;
        });

        return acc;
    }, {});

    return Object.entries(productDataMap).map(([product, total]) => ({
        id: product,
        label: product,
        value: total,
    }));
}

// Helper function to get the month name from a Date object
const getMonthName = (date: Date): string => {
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril',
        'Maio', 'Junho', 'Julho', 'Agosto',
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return monthNames[date.getMonth()];
};

const getShortMonthName = (date: Date): string => {
    const monthNames = [
        'Jan', 'Fev', 'Mar', 'Abr',
        'Mai', 'Jun', 'Jul', 'Ago',
        'Set', 'Out', 'Nov', 'Dez'
    ];
    return monthNames[date.getMonth()];
};

export async function getDadosGraficoLine(
    produtosFilter: string[],
    clientesFilter: string[]
): Promise<LineChartData> {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) throw new Error();

    const empresaId = await getEmpresaIdDoUsuario(session.user.id!);

    if (!empresaId) {
        return {
            xLabels: [],
            datasets: [],
        };
    }

    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setMonth(currentDate.getMonth() - 11); // Go back 11 months to include the current month
    startDate.setDate(1); // Set to the first day of the month
    startDate.setHours(0, 0, 0, 0); // Set time to start of the day

    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999); // Set time to end of the day

    const whereClause: Prisma.TransacaoWhereInput = {
        empresaId,
        dataCriacao: {
            gte: startDate,
            lte: endDate,
        },
    };

    if (produtosFilter.length > 0) {
        whereClause.itens = {
            some: {
                estoque: {
                    produto: {
                        in: produtosFilter,
                    },
                },
            },
        };
    }

    if (clientesFilter.length > 0) {
        whereClause.venda = {
            VendaPessoa: {
                some: {
                    pessoa: {
                        OR: [
                            {
                                pessoaJuridica: {
                                    razaoSocial: {
                                        in: clientesFilter,
                                    },
                                },
                            },
                            {
                                pessoaFisica: {
                                    nome: {
                                        in: clientesFilter,
                                    },
                                },
                            },
                        ],
                    },
                },
            },
        };
    }

    const transacoes = await db.transacao.findMany({
        where: whereClause,
        include: {
            itens: {
                include: {
                    estoque: true,
                },
            },
        },
    });

    // Define all months in reverse order (oldest to newest)
    const monthNames = Array.from({length: 12}, (_, i) => {
        const date = new Date(currentDate);
        date.setMonth(currentDate.getMonth() - 11 + i); // Calculate the month
        return getMonthName(date); // Get the month name
    });

    // Initialize a map to store summed values for each product by month
    const productDataMap: Record<string, Record<string, number>> = {};

    // Iterate over the transação data
    transacoes.forEach((transacao) => {
        const dataReferencia = getDataReferenciaTransacao(transacao.dataCriacao, transacao.dataAprovacao);
        const month = getMonthName(dataReferencia);

        if (!monthNames.includes(month)) {
            return;
        }

        transacao.itens.forEach((item) => {
            const product = item.estoque?.produto;
            if (!product) return;

            if (produtosFilter.length > 0 && !produtosFilter.includes(product)) {
                return;
            }

            if (!productDataMap[product]) {
                productDataMap[product] = Object.fromEntries(monthNames.map((monthName) => [monthName, 0]));
            }

            productDataMap[product][month] += item.quantidade;
        });
    });

    // Transform the map into LineChartData format
    const datasets = Object.entries(productDataMap).map(([product, monthlyData]) => ({
        label: product,
        data: monthNames.map((month) => monthlyData[month]), // Ensure data is in the correct order
    }));

    return {
        xLabels: monthNames, // Ordered from oldest to newest
        datasets,
    };
}

export async function getDadosGraficoBar(
    produtosFilter: string[],
    clientesFilter: string[]
): Promise<BarChartData> {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) throw new Error();

    const empresaId = await getEmpresaIdDoUsuario(session.user.id!);

    if (!empresaId) {
        return {
            chartData: {
                xLabels: [],
                uData: [],
            },
        };
    }

    // Calculate the date range for the last 12 months
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setMonth(currentDate.getMonth() - 11); // Go back 11 months to include the current month
    startDate.setDate(1); // Set to the first day of the month
    startDate.setHours(0, 0, 0, 0); // Set time to start of the day

    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999); // Set time to end of the day

    const whereClause: Prisma.TransacaoWhereInput = {
        empresaId,
        dataCriacao: {
            gte: startDate,
            lte: endDate,
        },
    };

    if (produtosFilter.length > 0) {
        whereClause.itens = {
            some: {
                estoque: {
                    produto: {
                        in: produtosFilter,
                    },
                },
            },
        };
    }

    if (clientesFilter.length > 0) {
        whereClause.venda = {
            VendaPessoa: {
                some: {
                    pessoa: {
                        OR: [
                            {
                                pessoaJuridica: {
                                    razaoSocial: {
                                        in: clientesFilter,
                                    },
                                },
                            },
                            {
                                pessoaFisica: {
                                    nome: {
                                        in: clientesFilter,
                                    },
                                },
                            },
                        ],
                    },
                },
            },
        };
    }

    const transacoes = await db.transacao.findMany({
        where: whereClause,
        include: {
            itens: {
                include: {
                    estoque: true,
                },
            },
        },
    });

    // Define all months in reverse order (oldest to newest)
    const monthNames = Array.from({length: 12}, (_, i) => {
        const date = new Date(currentDate);
        date.setMonth(currentDate.getMonth() - 11 + i); // Calculate the month
        return getShortMonthName(date); // Get the month name
    });

    // Initialize an array to store summed values for each month
    const uData: number[] = new Array(monthNames.length).fill(0);

    // Iterate over the transações data
    transacoes.forEach((transacao) => {
        const dataReferencia = getDataReferenciaTransacao(transacao.dataCriacao, transacao.dataAprovacao);
        const month = getShortMonthName(dataReferencia);
        const monthIndex = monthNames.indexOf(month); // Get the index of the month

        // Add the valorAlter to the corresponding month
        if (monthIndex !== -1) {
            const itensConsiderados = produtosFilter.length > 0
                ? transacao.itens.filter((item) => {
                    const nomeProduto = item.estoque?.produto;
                    return nomeProduto ? produtosFilter.includes(nomeProduto) : false;
                })
                : transacao.itens;

            if (itensConsiderados.length === 0) {
                return;
            }

            const valorTotal = produtosFilter.length > 0
                ? itensConsiderados.reduce((acc, item) => acc + item.precoTotal, 0)
                : transacao.valorTotal ?? transacao.itens.reduce((acc, item) => acc + item.precoTotal, 0);

            uData[monthIndex] += valorTotal;
        }
    });

    const data: BarChartData = {
        chartData: {
            xLabels: monthNames, // Ordered from oldest to newest
            uData, // Ordered from oldest to newest
        },
    };

    return data;
}

export type ItemCarrinho = {
  estoqueId: number;
  produto: string;
  quantidade: number;
  preco: number;
  imagemLink?: string;
};

export type CriarVendaInput = {
  itens: ItemCarrinho[];
  compradorId?: number; 
  observacoes?: string;
  empresaId?: number;
};

export async function criarVendaPendente(input: CriarVendaInput): Promise<number> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error('Usuário não autenticado');
  }

  const userId = session.user.id;

  // Buscar empresa do usuário
  const user = await db.usuario.findUnique({
    where: { id: userId },
    select: { empresaId: true },
  });

  // Calcular totais
  const valorTotal = input.itens.reduce(
    (sum, item) => sum + (item.preco * item.quantidade),
    0
  );

  // Criar a venda com status PENDENTE
  const venda = await db.venda.create({
    data: {
      usuarioId: userId!,
      empresaId: input?.empresaId!,
      comprador: false, 
      status: 'PENDENTE',
      valorTotal,
      observacoes: input.observacoes || null,
    },
  });

  for (const item of input.itens) {
    console.log(item);
    const estoque = await db.estoque.findUnique({
      where: { id: item.estoqueId },
    });

    if (!estoque) {
      // Rollback: deletar a venda criada
      await db.venda.delete({ where: { id: venda.id } });
      throw new Error(`Produto ${item.produto} não encontrado`);
    }

    if (estoque.quantidade < item.quantidade) {
      // Rollback: deletar a venda criada
      await db.venda.delete({ where: { id: venda.id } });
      throw new Error(`Estoque insuficiente para ${item.produto}. Disponível: ${estoque.quantidade}`);
    }

    // Criar relacionamento VendaEstoque
    await db.vendaEstoque.create({
      data: {
        vendaId: venda.id,
        estoqueId: item.estoqueId,
        quantidade: item.quantidade,
        precoUnitario: item.preco,
      },
    });

    // IMPORTANTE: Ainda não atualizar o estoque aqui
    // O estoque será atualizado apenas quando o pagamento for aprovado
  }

  return venda.id;
}

export async function aprovarVenda(vendaId: number): Promise<void> {
  const venda = await db.venda.findUnique({
    where: { id: vendaId },
    include: {
      estoques: true,
    },
  });

  if (!venda) {
    throw new Error('Venda não encontrada');
  }

  if (venda.status === 'PAGO') {
    // Já foi processada
    return;
  }

  // Atualizar estoque de cada item
  for (const vendaEstoque of venda.estoques) {
    await db.estoque.update({
      where: { id: vendaEstoque.estoqueId },
      data: {
        quantidade: {
          decrement: vendaEstoque.quantidade,
        },
        foiUtilizado: true,
      },
    });
  }

  // Atualizar status da venda
  await db.venda.update({
    where: { id: vendaId },
    data: {
      status: 'PAGO',
      dataPagamento: new Date(),
    },
  });
}


export async function cancelarVenda(vendaId: number): Promise<void> {
  const venda = await db.venda.findUnique({
    where: { id: vendaId },
    include: {
      estoques: true,
    },
  });

  if (!venda) {
    throw new Error('Venda não encontrada');
  }

  // Se já foi pago, precisa devolver o estoque
  if (venda.status === 'PAGO') {
    for (const vendaEstoque of venda.estoques) {
      await db.estoque.update({
        where: { id: vendaEstoque.estoqueId },
        data: {
          quantidade: {
            increment: vendaEstoque.quantidade,
          },
        },
      });
    }
  }

  // Atualizar status da venda
  await db.venda.update({
    where: { id: vendaId },
    data: {
      status: 'CANCELADO',
    },
  });
}

export async function pegaVenda(vendaId: number) {
  return db.venda.findUnique({
    where: { id: vendaId },
    include: {
      estoques: {
        include: {
          estoque: true,
        },
      },
      VendaPessoa: {
        include: {
          pessoa: true,
        },
      },
      transacoes: true,
    },
  });
}
