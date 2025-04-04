import React, {useEffect, useRef, useState, useCallback} from "react";
import {LineChart} from "@mui/x-charts";
import {CotacoesComCommodities, pegaHistoricoPrecoCommodities} from "@/actions/cotacoes";
import {LineChartData} from "@/models/graficos/charts";
import {Spinner} from "@heroui/react";
import {formatarData, formatToBrazilianCurrency} from "@/helpers";

interface CotacaoCommodityChartProps {
    selectedCommodity: CotacoesComCommodities;
}

const CotacaoCommodityChart: React.FC<CotacaoCommodityChartProps> = ({selectedCommodity}) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const [chartData, setChartData] = useState<LineChartData | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getChartData = useCallback(async () => {
        setIsLoading(true);
        const data = await pegaHistoricoPrecoCommodities(selectedCommodity.commodity.nome);

        setChartData(data);
        setIsLoading(false);
    }, [selectedCommodity.commodity.nome]);

    useEffect(() => {
        getChartData().then();
    }, [selectedCommodity, getChartData])

    if (isLoading || !chartData) {
        return <div className={'w-full h-[320px] my-4 flex justify-center items-center'}>
            <Spinner/>
        </div>;
    }

    return (
        <div className="h-[320px] dark:invert my-4" ref={containerRef} style={{width: "103%"}}>
            <LineChart
                loading={isLoading}
                colors={["#4a946f"]}
                grid={{vertical: true, horizontal: true}}
                height={320}
                slotProps={{
                    legend: {
                        hidden: true,
                    },
                }}
                margin={{left: 73, right: 60, top: 20, bottom: 40}}
                yAxis={[
                    {
                        tickLabelStyle: {fontSize: 15},
                        tickSize: 6,
                        valueFormatter: (value) => formatToBrazilianCurrency(value),
                    },
                ]}
                series={chartData.datasets.map((item) => {
                    return {
                        curve: 'linear',
                        data: item.data,
                        label: item.label,
                        id: item.label,
                        color: '#4a946f',
                        valueFormatter: (value) => formatToBrazilianCurrency(value!)
                    };
                })}
                xAxis={[
                    {
                        scaleType: "point",
                        data: chartData.xLabels,
                        tickSize: 25,
                        tickLabelStyle: {fontSize: 14},
                        valueFormatter: (value) => formatarData(new Date(value))
                    },
                ]}
            />
        </div>
    );
};

export default CotacaoCommodityChart;