'use server';

import {db} from "@/db";
import {ComercioCommodities, ComercioCommoditiesVariacaoPreco} from "@prisma/client";
import {LineChartData} from "@/models/graficos/charts";

export type CotacoesComCommodities = ComercioCommoditiesVariacaoPreco & {
    commodity: ComercioCommodities,
    priceIncreased: boolean,
    priceDifference: number
    percentageChange: number
}
export const pegaCotacoes = async (): Promise<CotacoesComCommodities[]> => {
    const commodities = await db.comercioCommoditiesVariacaoPreco.findMany({
        orderBy: {
            data: 'asc',
        },
        include: {
            commodity: true,
        },
    });

    const groupedByCommodity: Record<number, typeof commodities> = {};
    for (const item of commodities) {
        if (!groupedByCommodity[item.commodity_id]) {
            groupedByCommodity[item.commodity_id] = [];
        }
        groupedByCommodity[item.commodity_id].push(item);
    }

    const result: CotacoesComCommodities[] = [];
    for (const commodityId in groupedByCommodity) {
        const variations = groupedByCommodity[commodityId];

        const lastTwoVariations = variations.slice(-2);

        if (lastTwoVariations.length === 2) {
            const [previous, current] = lastTwoVariations;

            const priceDifference = current.valor - previous.valor;

            const percentageChange = (priceDifference / previous.valor) * 100;
            const priceIncreased = current.valor > previous.valor;

            result.push({
                ...current,
                commodity: current.commodity,
                priceDifference,
                percentageChange,
                priceIncreased
            });
        }
    }

    return result;
};


export const pegaHistoricoPrecoCommodities = async (filter?: string): Promise<LineChartData> => {
    const priceHistory = await db.comercioCommoditiesVariacaoPreco.findMany({
        where: {
            commodity: {
                nome: filter
            }
        },
        orderBy: {
            data: 'asc',
        },
        include: {
            commodity: true,
        },
    });

    const groupedByCommodity: Record<number, typeof priceHistory> = {};
    for (const item of priceHistory) {
        if (!groupedByCommodity[item.commodity_id]) {
            groupedByCommodity[item.commodity_id] = [];
        }
        groupedByCommodity[item.commodity_id].push(item);
    }

    const xLabels = Array.from(new Set(priceHistory.map(item => item.data.toISOString().split('T')[0])));

    const datasets = Object.keys(groupedByCommodity).map(commodityId => {
        const commodityData = groupedByCommodity[Number(commodityId)];
        const commodityName = commodityData[0].commodity.nome;

        const data = xLabels.map(date => {
            const priceEntry = commodityData.find(item => item.data.toISOString().split('T')[0] === date);
            return priceEntry?.valor!
        });

        return {
            label: commodityName,
            data: data,
        };
    });

    return {
        xLabels,
        datasets,
    };
}
