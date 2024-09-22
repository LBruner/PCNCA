'use client';
import React from "react";
import {PieChart, useDrawingArea} from "@mui/x-charts";
import {PieChartData} from "@/models/graficos/charts";
import {styled} from '@mui/material/styles';

interface VendasGraficoPieProps {
    chartData: PieChartData;
}

const StyleSubtitle = styled('text')(({theme}) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 17,
    color: 'gray',
}));

const StyledValue = styled('text')(({theme}) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
}));

const formatNumber = (number: number) => {
    return new Intl.NumberFormat('de-DE').format(number);
};

export const chartColors = ['#8B4513', '#FFD700', '#4CAF50', '#FF6347', '#F4A460'];

function PieCenterLabel(valorTotal: string) {
    const { height, } = useDrawingArea();
    return (
        <>
            <StyleSubtitle fontSize={'20px'} x={310 / 2} y={height/ 3.5}>Total
            </StyleSubtitle>
            <StyledValue fontWeight={600} x={310 / 2} y={height/ 2.5}>{formatNumber(parseFloat(valorTotal))}
            </StyledValue>
        </>
    );
}

const VendasGraficoPie: React.FC<VendasGraficoPieProps> = ({chartData}) => {
    return (
        <div>
            <PieChart
                className={'w-[450px] flex h-[200px]'}
                colors={chartColors}
                slotProps={{
                    legend: {
                        direction: 'column',
                    },
                }}
                series={[
                    {

                        highlightScope: {fade: 'global', highlight: 'item'},
                        valueFormatter: (value:any) => `${value.data} vendas`,
                        paddingAngle: 2,
                        innerRadius: 80,
                        outerRadius: 60,
                        data:
                        chartData
                    },
                ]}
                width={400}
                height={200}
            >
                {PieCenterLabel(`${chartData.reduce((acc, curr) => acc + curr.value, 0)}`)}
            </PieChart>
        </div>
    )
}

export default VendasGraficoPie;