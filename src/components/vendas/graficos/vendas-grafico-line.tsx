'use client';

import React, {useEffect, useRef, useState} from "react";
import {LineChart} from "@mui/x-charts";
import {LineChartData} from "@/models/graficos/charts";
import {getDadosGraficoLine} from "@/actions/vendas";
import {Spinner} from "@nextui-org/react";

interface VendasGraficoLineProps {
    produtosFilter: string | string[];
}

const VendasGraficoLine: React.FC<VendasGraficoLineProps> = ({produtosFilter}) => {
    const [chartData, setChartData] = useState<LineChartData>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() =>{
        fetchChartData(produtosFilter);
    }, [produtosFilter]);

    const fetchChartData = async (filter: string | string[]) => {
        setIsLoading(true);

        let newChartData;
        if (filter === 'all') {
            newChartData = await getDadosGraficoLine([]);
        } else {
            newChartData = await getDadosGraficoLine(produtosFilter as string[]);
        }

        setChartData(newChartData);
        setIsLoading(false);
    };

    if (isLoading || !chartData) {
        return <div className={'w-full h-full flex justify-center items-center'}>
            <Spinner/>
        </div>;
    }

    return (
        <div ref={containerRef} style={{width: '103%'}}>
            <LineChart
                colors={['#FBE38E', '#EA6E1B', 'red', 'blue']}
                grid={{vertical: true, horizontal: true}}
                width={1400}
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