'use client';
import * as React from 'react';
import {BarChart} from '@mui/x-charts/BarChart';
import {getFullMonthName} from "@/helpers/graficos";
import {BarChartData} from "@/models/graficos/charts";
import {useEffect, useRef, useState} from "react";

const VendasGraficoBar: React.FC<BarChartData> = ({chartData}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }

        const handleResize = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div ref={containerRef} style={{width: '105%'}}>
            <BarChart
                borderRadius={12}
                width={containerWidth}
                height={220}
                series={[
                    {data: chartData.uData, label: 'Vendas', id: 'uvId', valueFormatter: (value) => `${value}`},
                ]}
                grid={{horizontal: true}}
                xAxis={[{
                    valueFormatter: (code, context) =>
                        context.location === 'tick'
                            ? code
                            : `Mês: ${getFullMonthName(code)}`,
                    tickSize: 10,
                    disableTicks: false,
                    tickLabelStyle: {fontSize: 16},
                    data: chartData.xLabels,
                    scaleType: 'band',
                    labelStyle: {fontSize: 30},
                }]}
            />
        </div>
    );
}

export default VendasGraficoBar;
