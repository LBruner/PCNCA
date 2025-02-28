import {LineChartData} from "@/models/graficos/charts";
import {CotacaoCommodity} from "@/models/cotacao-commodity/cotacao-commodity";

export const getLineChartData = (commodityId: string): LineChartData => {
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
// Updated x-axis labels for 3 weeks
const commodityXLabels = {
    xLabels: [
        "21-02", "22-02", "23-02", "24-02", "25-02", "26-02", "27-02", // Week 1
        "28-02", "01-03", "02-03", "03-03", "04-03", "05-03", "06-03", // Week 2
        "07-03", "08-03", "09-03", "10-03", "11-03", "12-03", "13-03"  // Week 3
    ]
};

export const commodityChartPlaceholderData: LineChartData = {
    xLabels: commodityXLabels.xLabels, // Use the updated x-axis labels
    datasets: [
        {
            label: "Milho (sc 60kg)",
            data: [
                70.2, 71.5, 69.8, 70.0, 71.0, 70.8, 71.2, // Week 1
                71.5, 72.0, 71.8, 72.2, 72.5, 72.3, 72.7, // Week 2
                73.0, 73.5, 73.2, 73.8, 74.0, 74.2, 74.5  // Week 3
            ],
        },
        {
            label: "Soja (sc 60kg)",
            data: [
                130.1, 131.2, 129.8, 128.9, 130.5, 131.0, 130.7, // Week 1
                131.5, 132.0, 131.8, 132.2, 132.5, 132.3, 132.7, // Week 2
                133.0, 133.5, 133.2, 133.8, 134.0, 134.2, 134.5  // Week 3
            ],
        },
        {
            label: "Acúcar (sc 60kg)",
            data: [
                18.5, 18.7, 18.6, 18.8, 19.0, 19.1, 19.3, // Week 1
                19.5, 19.7, 19.6, 19.8, 20.0, 20.1, 20.3, // Week 2
                20.5, 20.7, 20.6, 20.8, 21.0, 21.1, 21.3  // Week 3
            ],
        },
        {
            label: "Trigo (sc 60kg)",
            data: [
                215.0, 216.5, 214.2, 213.8, 215.4, 216.0, 215.8, // Week 1
                216.5, 217.0, 216.8, 217.2, 217.5, 217.3, 217.7, // Week 2
                218.0, 218.5, 218.2, 218.8, 219.0, 219.2, 219.5  // Week 3
            ],
        },
        {
            label: "Algodão (sc 60kg)",
            data: [
                82.0, 81.8, 82.3, 83.1, 83.7, 84.0, 83.9, // Week 1
                84.2, 84.5, 84.3, 84.7, 85.0, 85.2, 85.5, // Week 2
                85.8, 86.0, 86.2, 86.5, 86.8, 87.0, 87.2  // Week 3
            ],
        },
    ],
};

export const cotacoesComodities: CotacaoCommodity[] = [
    {
        nome: 'Acúcar (sc 60kg)',
        variacao: 0.1,
        preco: 100,
        id: 1,
        data: new Date().toString()
    },
    {
        nome: 'Algodão (sc 60kg)',
        variacao: 0.1,
        preco: 100,
        id: 2,
        data: new Date().toString()
    },
    {
        nome: 'Soja (sc 60kg)',
        variacao: 0.1,
        preco: 100,
        id: 3,
        data: new Date().toString()
    },
    {
        nome: 'Milho (sc 60kg)',
        variacao: 0.1,
        preco: 100,
        id: 4,
        data: new Date().toString()
    },
    {
        nome: 'Trigo (sc 60kg)',
        variacao: 0.1,
        preco: 100,
        id: 5,
        data: new Date().toString()
    }
];