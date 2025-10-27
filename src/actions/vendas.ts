'use server';

import {db} from "@/db";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/AuthOptions";
import {getUser} from "@/actions/produto";
import {VendaComDados} from "@/components/vendas/criação/CriarVendaForm";
import {Estoque, HistoricoEstoque, Pessoa, PessoaFisica, PessoaJuridica, Venda} from "@prisma/client";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {BarChartData, LineChartData, PieChartData} from "@/models/graficos/charts";

export type VendasAgrupadas = HistoricoEstoque & {
    venda: Venda & {
        pessoas: (Pessoa & {
            pessoa: Pessoa & { pessoaJuridica?: PessoaJuridica | null, pessoaFisica?: PessoaFisica }
        })[],
        estoques: (Estoque & { estoque: Estoque })[],
    }
}

export const pegaTodasVendas = async (): Promise<VendasAgrupadas[][]> => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) return [];

    // Fetch sales sorted by `dataAlter` in descending order
    const vendas = await db.historicoEstoque.findMany({
        orderBy: {
            dataAlter: 'desc',
        },
        where: {
            usuarioId: session.user.id,
            comprador: false,
        },
        include: {
            estoque: true, // Include the estoque directly to maintain proper association
            venda: {
                include: {
                    estoques: {
                        include: {
                            estoque: true,
                        },
                    },
                    pessoas: {
                        include: {
                            pessoa: {
                                include: {
                                    pessoaJuridica: true,
                                    pessoaFisica: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    // Group sales by `vendaId` while preserving product information
    const vendasAgrupadas = vendas.reduce((acc, venda) => {
        const vendaId = venda.vendaId;

        if (!acc[vendaId]) {
            acc[vendaId] = [];
        }

        // Make sure estoque information is correctly associated with each record
        acc[vendaId].push({
            ...venda,
            estoque: venda.estoque, // Ensure the correct product is associated
        });

        return acc;
    }, {} as { [key: string]: typeof vendas });

    // Convert the grouped object back to an array
    const groupedSalesArray = Object.values(vendasAgrupadas);

    // Sort the grouped sales array by the earliest `dataAlter` in each group (descending order)
    groupedSalesArray.sort((a, b) => {
        const dateA = new Date(a[0].dataAlter).getTime(); // Get the first sale's date in group A
        const dateB = new Date(b[0].dataAlter).getTime(); // Get the first sale's date in group B
        return dateB - dateA; // Sort in descending order
    });

    // @ts-ignore
    return groupedSalesArray;
};

export async function criarVenda(vendas: VendaComDados): Promise<void> {
    const session = await getServerSession(authOptions)

    const userId = await getUser(session!.user.id!);
    let subtotal = 0;
    let quantidadeVendida = 0;

    vendas.vendas.forEach((item) => {
            subtotal = subtotal + (item.quantity * item.estoque.preco);
            quantidadeVendida = quantidadeVendida + item.quantity
        }
    );

    const novaVenda = await db.venda.create({
        data: {
            dataVenda: new Date(),
            valorVenda: subtotal,
            quantidadeVenda: quantidadeVendida,
            desconto: 0,
        }
    });

    await db.vendaPessoa.create({
        data: {
            venda: {
                connect: {
                    id: novaVenda.id
                }
            },
            pessoa: {
                connect: {
                    id: vendas.clienteId
                }
            },
            tipoPessoa: "Fornecedor"
        }
    });

    for (const vendaAtual of vendas.vendas) {
        await db.historicoEstoque.create({
            data: {
                venda: {
                    connect: {
                        id: novaVenda.id
                    }
                },
                comprador: false,
                dataAlter: new Date(),
                horaAlter: new Date().toISOString().slice(11, 16),
                valorAlter: vendaAtual.quantity,
                usuario: {
                    connect: {
                        id: userId,
                    },
                },
                estoque: {
                    connect: {
                        id: vendaAtual.estoque.id,
                    },
                },
            },
        });

        await db.vendaEstoque.create({
            data: {
                precoProp: vendaAtual.estoque.preco,
                estoqueId: vendaAtual.estoque.id,
                vendaId: novaVenda.id,
            },
        });

        await db.estoque.update({
            where: {
                id: vendaAtual.estoque.id
            },
            data: {
                quantidade: vendaAtual.estoque.quantidade - vendaAtual.quantity
            },
        })
    }

    revalidatePath(paths.estoque());
}


export async function getDadosGraficoPie(
    produtosFilter: string[],
    clientesFilter: string[]
): Promise<PieChartData> {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) return [];

    let vendas: any[];

    // Base filter for the user and non-buyer transactions
    const baseFilter = {
        comprador: false,
        usuarioId: session.user.id,
    };

    // Filter for produtos
    const produtoFilter = produtosFilter.length > 0 ? {
        estoque: {
            produto: {
                in: produtosFilter,
            },
        },
    } : {};

    // Filter for clientes
    const clienteFilter = clientesFilter.length > 0 ? {
        venda: {
            pessoas: {
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
        },
    } : {};

    // Combine all filters
    const whereClause = {
        ...baseFilter,
        ...produtoFilter,
        ...clienteFilter,
    };

    // Fetch vendas with the combined filters
    vendas = await db.historicoEstoque.findMany({
        where: whereClause,
        include: {
            estoque: true,
            venda: {
                include: {
                    pessoas: {
                        include: {
                            pessoa: {
                                include: {
                                    pessoaJuridica: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    // Group data by product and sum valorAlter
    const productDataMap = vendas.reduce<Record<string, number>>((acc, item) => {
        const product = item.estoque.produto;
        if (!acc[product]) {
            acc[product] = 0;
        }
        acc[product] += item.valorAlter;
        return acc;
    }, {});

    // Transform into PieChartData format
    const data = Object.entries(productDataMap).map(([product, total]) => ({
        id: product,
        label: product,
        value: total,
    }))
    return data;
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

    let vendas: any[];

    // Base filter for the user and non-buyer transactions
    const baseFilter = {
        comprador: false,
        usuarioId: session.user.id,
    };

    // Filter for produtos
    const produtoFilter = produtosFilter.length > 0 ? {
        estoque: {
            produto: {
                in: produtosFilter,
            },
        },
    } : {};

    // Filter for clientes
    const clienteFilter = clientesFilter.length > 0 ? {
        venda: {
            pessoas: {
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
        },
    } : {};

    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setMonth(currentDate.getMonth() - 11); // Go back 11 months to include the current month
    startDate.setDate(1); // Set to the first day of the month
    startDate.setHours(0, 0, 0, 0); // Set time to start of the day

    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999); // Set time to end of the day

    // Combine all filters
    const whereClause = {
        ...baseFilter,
        ...produtoFilter,
        ...clienteFilter,
        dataAlter: {
            gte: startDate, // Greater than or equal to the start of the last 12 months
            lte: endDate, // Less than or equal to the current date
        },
    };

    // Fetch vendas with the combined filters
    vendas = await db.historicoEstoque.findMany({
        where: whereClause,

        include: {
            estoque: true,
            venda: {
                include: {
                    pessoas: {
                        include: {
                            pessoa: {
                                include: {
                                    pessoaJuridica: true,
                                },
                            },
                        },
                    },
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

    // Iterate over the vendas data
    vendas.forEach((item) => {
        const date = new Date(item.dataAlter); // Convert dataAlter to a Date object
        const month = getMonthName(date); // Get the month name
        const product = item.estoque.produto; // Get the product name

        // Initialize the product in the map if it doesn't exist
        if (!productDataMap[product]) {
            productDataMap[product] = {};
            monthNames.forEach((monthName) => {
                productDataMap[product][monthName] = 0; // Initialize all months to 0
            });
        }

        // Add the valorAlter to the corresponding month
        productDataMap[product][month] += item.valorAlter;
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

    let vendas: any[] = [];

    // Base filter for the user and non-buyer transactions
    const baseFilter = {
        comprador: false,
        usuarioId: session.user.id,
    };

    // Filter for produtos
    const produtoFilter = produtosFilter.length > 0 ? {
        estoque: {
            produto: {
                in: produtosFilter,
            },
        },
    } : {};

    // Filter for clientes
    const clienteFilter = clientesFilter.length > 0 ? {
        venda: {
            pessoas: {
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
        },
    } : {};

    // Calculate the date range for the last 12 months
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setMonth(currentDate.getMonth() - 11); // Go back 11 months to include the current month
    startDate.setDate(1); // Set to the first day of the month
    startDate.setHours(0, 0, 0, 0); // Set time to start of the day

    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999); // Set time to end of the day

    // Combine all filters
    const whereClause = {
        ...baseFilter,
        // ...produtoFilter,
        ...clienteFilter,
        dataAlter: {
            gte: startDate, // Greater than or equal to the start of the last 12 months
            lte: endDate, // Less than or equal to the current date
        },
    };

    // Fetch vendas with the combined filters
    vendas = await db.historicoEstoque.findMany({
        where: whereClause,
        include: {
            estoque: true,
            venda: {
                include: {
                    pessoas: {
                        include: {
                            pessoa: {
                                include: {
                                    pessoaJuridica: true,
                                },
                            },
                        },
                    },
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

    // Iterate over the vendas data
    vendas.forEach((item) => {
        const date = new Date(item.venda.dataVenda); // Convert dataAlter to a Date object
        const month = getShortMonthName(date); // Get the month name
        const monthIndex = monthNames.indexOf(month); // Get the index of the month

        // Add the valorAlter to the corresponding month
        if (monthIndex !== -1) {
            uData[monthIndex] += item.venda.valorVenda;
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
  compradorId?: number; // ID da pessoa que está comprando (se houver)
  observacoes?: string;
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
      empresaId: user?.empresaId!,
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
      pessoas: {
        include: {
          pessoa: true,
        },
      },
      transacoes: true,
    },
  });
}