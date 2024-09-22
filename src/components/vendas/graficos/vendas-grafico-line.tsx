'use client';

import React, {useEffect, useRef, useState} from "react";
import {LineChart} from "@mui/x-charts";
import {LineChartData} from "@/models/graficos/charts";

interface VendasGraficoLineProps {
    chartData: LineChartData;
}

const VendasGraficoLine: React.FC<VendasGraficoLineProps> = ({chartData}) => {

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
        <div ref={containerRef} style={{width: '103%'}}>
            <LineChart
                colors={['#FBE38E', '#EA6E1B', 'red', 'blue']}
                grid={{vertical: true, horizontal: true}}
                width={containerWidth}
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