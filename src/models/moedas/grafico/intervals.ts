export type ChartInterval = 
    {
        interval: string,
        value: string,
    };

export const intervals: ChartInterval[] = [
    {
        interval: "1M",
        value: "1"
    },
    {
        interval: "30M",
        value: "30"
    },
    {
        interval: "1H",
        value: "60"
    },
    {
        interval: "4H",
        value: "240"
    },
    {
        interval: "1D",
        value: "D"
    },
    {
        interval: "1S",
        value: "W"
    },
]