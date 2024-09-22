export type PieChartData = {
    id: string,
    label: string,
    value: number
}[]

export type  BarChartData = {
    chartData: {
        uData: number[],
        xLabels: string[];
    };
}

export type  LineChartData = {
    xLabels: string[],
    datasets: {
        label: string;
        data: number[];
    }[];
}