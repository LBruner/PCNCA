import {LineChartData} from "@/models/graficos/charts";
import {CotacaoCommodity} from "@/models/cotacao-commodity/cotacao-commodity";

export const getLineChartData = (commodityId: string): LineChartData => {

    console.log(commodityId)
    const commodityDataData = commodityChartPlaceholderData.datasets.find(
        (item) => item.label === commodityId,
    );

    if (!commodityDataData) {
        throw new Error("Commodity not found");
    }

    return {
        ...commodityXLabels,
        datasets: [commodityDataData]
    }
}

const commodityXLabels = {    xLabels: ["08-11", "11-11", "12-11", "13-11", "14-11"],
}

export const commodityChartPlaceholderData: LineChartData = {
    ...commodityXLabels,
    datasets: [
        {
            label: "Milho",
            data: [70.2, 71.5, 69.8, 70.0, 71.0],
        },
        {
            label: "Soja",
            data: [130.1, 131.2, 129.8, 128.9, 130.5],
        },
        {
            label: "Acúcar - (sc 60kg)",
            data: [18.5, 18.7, 18.6, 18.8, 19.0,],
        },
        {
            label: "Trigo",
            data: [215.0, 216.5, 214.2, 213.8, 215.4,],
        },
        {
            label: "Algodão",
            data: [82.0, 81.8, 82.3, 83.1, 83.7,],
        },
    ],
};


export const cotacoesComodities: CotacaoCommodity[] = [
    {
        nome: 'Acúcar - (sc 60kg)',
        variacao: 0.1,
        preco: 100,
        id: 1,
        data: new Date().toString()
    },
    {
        nome: 'Algodão',
        variacao: 0.1,
        preco: 100,
        id: 2,
        data: new Date().toString()
    },
    {
        nome: 'Soja',
        variacao: 0.1,
        preco: 100,
        id: 3,
        data: new Date().toString()
    },
    {
        nome: 'Milho',
        variacao: 0.1,
        preco: 100,
        id: 4,
        data: new Date().toString()
    },
    {
        nome: 'Trigo',
        variacao: 0.1,
        preco: 100,
        id: 5,
        data: new Date().toString()
    }
];