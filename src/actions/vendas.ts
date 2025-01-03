'use server';

import {sales} from "@/dummy_data/sales";
import {db} from "@/db";
import {VendasComProdutos} from "@/models/vendas";

//TODO: Resolver

export const buscarVendas = async (): Promise<any[]> => {
    return db.sale.findMany({
        include: {
            saleItems: {
                include: {
                    product: true,
                },
            },
            seller: true,
        },
    });
}

export const buscarNomeClientes = async () => {
    // const session = await getServerSession();
    //
    // if (!session) return;
    //
    // const sellerId = session.user.id;
    //
    // const sales = await db.sale.findMany({
    //     where: {
    //         sellerId: sellerId,  // Filtra por vendedor específico
    //     },
    // });


    return Array.from(new Set(sales.map(sale => sale.customerName)));
}

export async function getDadosGraficoPie() {
    // const salesData = await db.saleItem.groupBy({
    //     by: ['productId'],
    //     _sum: {
    //         quantity: true,
    //         totalPrice: true,
    //     },
    // })
    //
    // const salesWithProductNames = await Promise.all(
    //     salesData.map(async (item) => {
    //         const product = await db.product.findUnique({
    //             where: { id: item.productId },
    //             select: { name: true },
    //         })
    //         return {
    //             productName: product?.name,
    //             totalRevenue: item._sum.totalPrice,
    //         }
    //     })
    // )
    //
    // return salesWithProductNames

    return [
        { productName: 'Café', totalRevenue: 785 },
        { productName: 'Laranja', totalRevenue: 2585 },
        { productName: 'Soja', totalRevenue: 450 },
        { productName: 'Açúcar', totalRevenue: 1580 }
    ];
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
            350,  420, 430,  410,
            780, 1120, 790, 1260,
            700,    0,   0,    0
        ],
        xLabels: [
            'Jan', 'Fev', 'Mar',
            'Abr', 'Mai', 'Jun',
            'Jul', 'Ago', 'Set',
            'Out', 'Nov', 'Dez'
        ]
    }
}


export async function getTopProductsMonthlySales() {
    // Primeiro, encontramos os 4 produtos mais vendidos
    // const topProducts = await db.saleItem.groupBy({
    //     by: ['productId'],
    //     _sum: {
    //         quantity: true,
    //     },
    //     orderBy: {
    //         _sum: {
    //             quantity: 'desc',
    //         },
    //     },
    //     take: 4,  // Limitamos aos 4 produtos mais vendidos
    // });
    //
    // const topProductIds = topProducts.map(p => p.productId);
    //
    // // Agora, buscamos as vendas mensais para esses produtos
    // const monthlySales = await db.saleItem.groupBy({
    //     by: ['productId', 'saleId'],
    //     _sum: {
    //         quantity: true,
    //         unitPrice: true,
    //     },
    //     where: {
    //         productId: {
    //             in: topProductIds,
    //         },
    //         sale: {
    //             date: {
    //                 gte: new Date(new Date().getFullYear(), 0, 1), // Filtra a partir do começo do ano
    //             },
    //         },
    //     },
    //     orderBy: [
    //         { productId: 'asc' },
    //         // { sale: { date: 'asc' } },
    //     ],
    // });
    //
    // // Processamento dos dados para organizar as vendas mensais
    // const productSales = {};
    //
    // for (const sale of monthlySales) {
    //     const productId = sale.productId;
    //
    //     // Obtém o nome do produto
    //     const product = await db.product.findUnique({
    //         where: {
    //             id: productId,
    //         },
    //         select: {
    //             name: true,
    //         },
    //     });
    //
    //     // Extraí o mês da data da venda
    //     const saleDate = await db.sale.findUnique({
    //         where: {
    //             id: sale.saleId,
    //         },
    //         select: {
    //             date: true,
    //         },
    //     });
    //
    //     const month = new Date(saleDate.date).getMonth(); // Extrai o mês da venda
    //
    //     // Inicializa o array de vendas mensais para o produto, se necessário
    //     if (!productSales[productId]) {
    //         productSales[productId] = {
    //             name: product?.name || `Produto ${productId}`,
    //             sales: Array(12).fill(0),
    //         };
    //     }
    //
    //     // Calcula o total de vendas (quantidade * preço unitário)
    //     const totalSales = sale._sum.quantity * sale._sum.unitPrice;
    //
    //     // Adiciona as vendas ao mês correto (lembrando que o mês começa em 0)
    //     productSales[productId].sales[month] += Number(totalSales.toFixed(2));
    // }
    //
    // // Configuração do gráfico
    // const xLabels = [
    //     'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    //     'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    // ];
    //
    // const datasets = Object.entries(productSales).map(([productId, { name, sales }], index) => ({
    //     label: name,  // Nome do produto no rótulo
    //     data: sales,
    // }));
    //
    // return { xLabels, datasets };

    return {
        xLabels: [
            'Janeiro',  'Fevereiro',
            'Março',    'Abril',
            'Maio',     'Junho',
            'Julho',    'Agosto',
            'Setembro', 'Outubro',
            'Novembro', 'Dezembro'
        ],
        datasets: [
            { label: 'Leite', data: [ 0, 30, 0, 0, 0,
                    0,  0, 0, 0, 0,
                    0,  0
                ] },
            { label: 'Soja', data: [50,  90, 90, 135, 0,
                    200, 200, 90,   0, 0,
                    0,   0] },
            { label: 'Açúcar', data: [ 160,   0, 160, 220, 90,
                    310, 180, 340, 120,  0,
                    0,   0] },
            { label: 'Arroz', data: [100, 340, 180, 340, 470,
                    200, 225, 350, 380,   0,
                    0,   0] }
        ]
    }
}


