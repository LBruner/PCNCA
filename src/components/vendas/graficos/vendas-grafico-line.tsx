'use client';

import React, {useEffect, useRef, useState} from "react";
import {LineChart} from "@mui/x-charts";
import {LineChartData} from "@/models/graficos/charts";
import {getDadosGraficoLine} from "@/actions/vendas";

interface VendasGraficoLineProps {
    produtosFilter: string | string[];
    clientesFilter: string | string[];
}

const VendasGraficoLine: React.FC<VendasGraficoLineProps> = ({produtosFilter, clientesFilter}) => {
    const [chartData, setChartData] = useState<LineChartData>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchChartData(produtosFilter, clientesFilter).then();
    }, [produtosFilter, clientesFilter]);

    const fetchChartData = async (produtoFilter: string | string[], clientesFilter: string | string[]) => {
        setIsLoading(true);

        let newChartData;

        const produtosArray = produtoFilter === 'all' ? [] : Array.isArray(produtoFilter) ? produtoFilter : [produtoFilter];
        const clientesArray = clientesFilter === 'all' ? [] : Array.isArray(clientesFilter) ? clientesFilter : [clientesFilter];

        newChartData = await getDadosGraficoLine(produtosArray, clientesArray);

        setChartData(newChartData);
        setIsLoading(false);
    };

    if (isLoading || !chartData) {
        return <div className={'w-full h-full flex justify-center items-center'}>
        </div>;
    }

    return (
        <div ref={containerRef} style={{width: '103%'}}>
            <LineChart
                colors={['#FBE38E', '#EA6E1B', 'red', 'blue']}
                grid={{vertical: true, horizontal: true}}
                width={1500}
                height={270}
                slotProps={{
                    legend: {
                        itemMarkWidth: 25,
                        itemMarkHeight: 13,
                        labelStyle: {fontSize: 18},
                    },
                }}
                yAxis={[{tickLabelStyle: {fontSize: 14}}]}
                series={chartData.datasets.map((item) => {
                    return {data: item.data, label: item.label, id: item.label}
                })}
                xAxis={[{
                    scaleType: 'point',
                    data: chartData.xLabels,
                    tickSize: 12,
                    tickLabelStyle: {fontSize: 14,}
                }]}
            />
        </div>
    )
}

export default VendasGraficoLine;