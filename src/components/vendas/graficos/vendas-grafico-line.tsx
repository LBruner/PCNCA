'use client';

import React, {useEffect, useRef, useState} from "react";
import {LineChart} from "@mui/x-charts";
import {LineChartData} from "@/models/graficos/charts";
import {getDadosGraficoLine} from "@/actions/vendas";
import {chartColors} from "@/components/vendas/graficos/vendas-grafico-pie";

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
        <div>
            <p className={'font-semibold text-xl mb-4 dark:text-black'}>Total de Vendas por Produto nos Últimos 12 Meses</p>
            <div ref={containerRef} style={{width: '103%'}}>
                <LineChart
                    colors={chartColors}
                    grid={{vertical: true, horizontal: true}}
                    width={1500}
                    height={300}
                    slotProps={{
                        legend: {
                            itemMarkWidth: 25,
                            itemMarkHeight: 13,
                            labelStyle: {fontSize: 18},
                        },
                    }}
                    yAxis={[{
                        tickLabelStyle: {fontSize: 14}, valueFormatter: (value) => value,
                    },]}
                    series={chartData.datasets.map((item) => {
                        return {
                            data: item.data,
                            label: item.label,
                            id: item.label,
                            valueFormatter: (value) => `${value} vendas`
                        }
                    })}
                    xAxis={[{
                        scaleType: 'point',
                        data: chartData.xLabels,
                        tickSize: 12,
                        tickLabelStyle: {fontSize: 14,}
                    }]}
                />
            </div>
        </div>
    )
}

export default VendasGraficoLine;