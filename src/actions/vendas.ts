'use server';

import {db} from "@/db";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/AuthOptions";
import {getUserId} from "@/actions/produto";
import {VendaComDados} from "@/components/vendas/criação/CriarVendaForm";
import {Estoque, HistoricoEstoque, Pessoa, PessoaJuridica, Venda} from "@prisma/client";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {BarChartData, LineChartData, PieChartData} from "@/models/graficos/charts";

export type VendasAgrupadas = HistoricoEstoque & {
    venda: Venda & {
        pessoas: (Pessoa & { pessoa: Pessoa & { pessoaJuridica?: PessoaJuridica | null } })[],
        estoques: (Estoque & { estoque: Estoque })[],
    }
}

export const pegaTodasVendas = async (): Promise<VendasAgrupadas[][]> => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) return [];

    const vendas = await db.historicoEstoque.findMany({
        where: {
            usuarioId: session.user.id,
            comprador: false,
        },
        include: {
            venda: {
                include: {
                    estoques: {
                        include: {
                            estoque: true
                        }
                    },
                    pessoas: {
                        include: {
                            pessoa: {
                                include: {
                                    pessoaJuridica: true,
                                },
                            },
                        },
                    },
                }
            },
        }
    });

    const vendasAgrupadas = vendas.reduce((acc, venda) => {
        const vendaId = venda.vendaId;

        if (!acc[vendaId]) {
            acc[vendaId] = [];
        }

        acc[vendaId].push(venda);
        return acc;
    }, {} as { [key: string]: any[] });

    return Object.values(vendasAgrupadas);
}

export async function criarVenda(vendas: VendaComDados): Promise<void> {
    const session = await getServerSession(authOptions)

    const userId = await getUserId(session!.user.id!);

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
                        pessoaJuridica: {
                            razaoSocial: {
                                in: clientesFilter,
                            },
                        },
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
    }));

    console.log(data);
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
                        pessoaJuridica: {
                            razaoSocial: {
                                in: clientesFilter,
                            },
                        },
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

    // Define all months
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril',
        'Maio', 'Junho', 'Julho', 'Agosto',
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

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
        xLabels: monthNames,
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
                        pessoaJuridica: {
                            razaoSocial: {
                                in: clientesFilter,
                            },
                        },
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

    // Define all months
    const monthNames = [
        'Jan', 'Fev', 'Mar', 'Abr',
        'Mai', 'Jun', 'Jul', 'Ago',
        'Set', 'Out', 'Nov', 'Dez'
    ];

    // Initialize an array to store summed values for each month
    const uData: number[] = new Array(monthNames.length).fill(0);

    // Iterate over the vendas data
    vendas.forEach((item) => {
        const date = new Date(item.dataAlter); // Convert dataAlter to a Date object
        const month = getShortMonthName(date); // Get the month name
        const monthIndex = monthNames.indexOf(month); // Get the index of the month

        // Add the valorAlter to the corresponding month
        if (monthIndex !== -1) {
            uData[monthIndex] += item.valorAlter;
        }
    });

    const data: BarChartData = {
        chartData: {
            xLabels: monthNames,
            uData,
        },
    };

    console.log(data);
    return data;
}

export async function getMonthlySales() {
    //   const monthlySales = await db.$queryRaw`
    //   SELECT
    //     EXTRACT(MONTH FROM date) as month,
    //     SUM(CAST("totalPrice" AS FLOAT)) as total
    //   FROM "Sale"
    //   WHERE date >= CURRENT_DATE - INTERVAL '1 year'
    //   GROUP BY EXTRACT(MONTH FROM date)
    //   ORDER BY EXTRACT(MONTH FROM date)
    // `;
    //
    //   // Mapeamento de número do mês para abreviação
    //   const monthAbbreviations = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    //
    //   // Inicializar arrays com zeros
    //   const uData = Array(12).fill(0);
    //   const xLabels = monthAbbreviations.slice();
    //
    //   // Preencher uData com os valores reais
    //   monthlySales.forEach((sale: { month: number; total: number }) => {
    //       uData[Number(sale.month) - 1] = Number(sale.total.toFixed(2));
    //   });
    //
    //   return { uData, xLabels };

    return {
        uData: [
            350, 420, 430, 410,
            780, 1120, 790, 1260,
            700, 0, 0, 0
        ],
        xLabels: [
            'Jan', 'Fev', 'Mar',
            'Abr', 'Mai', 'Jun',
            'Jul', 'Ago', 'Set',
            'Out', 'Nov', 'Dez'
        ]
    }
}


