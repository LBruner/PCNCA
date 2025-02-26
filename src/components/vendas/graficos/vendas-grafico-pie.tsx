'use client';

import React, {useEffect, useState} from 'react';
import {PieChart, useDrawingArea} from '@mui/x-charts';
import {PieChartData} from '@/models/graficos/charts';
import {styled} from '@mui/material/styles';
import {getDadosGraficoPie} from '@/actions/vendas';
import {Spinner} from '@nextui-org/react';

interface VendasGraficoPieProps {
    produtosFilter: string | string[];
    clientesFilter: string | string[];
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

export const chartColors = ['#FFD700', '#4CAF50', '#8B4513', '#FF6347', '#F4A460'];

const PieCenterLabel = ({valorTotal}: { valorTotal: string }) => {
    const {height} = useDrawingArea();
    return (
        <>
            <StyleSubtitle fontSize={'20px'} x={310 / 2} y={height / 2.3}>
                Total
            </StyleSubtitle>
            <StyledValue fontWeight={600} x={310 / 2} y={height / 1.8}>
                {formatNumber(parseFloat(valorTotal))}
            </StyledValue>
        </>
    );
};

const VendasGraficoPie: React.FC<VendasGraficoPieProps> = ({produtosFilter, clientesFilter}) => {
    const [chartData, setChartData] = useState<PieChartData>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchChartData(produtosFilter,clientesFilter);
    }, [produtosFilter, clientesFilter]);

    const fetchChartData = async (produtoFilter: string | string[], clientesFilter: string | string[]) => {
        setIsLoading(true);

        let newChartData;

        const produtosArray = produtoFilter === 'all' ? [] : Array.isArray(produtoFilter) ? produtoFilter : [produtoFilter];
        const clientesArray = clientesFilter === 'all' ? [] : Array.isArray(clientesFilter) ? clientesFilter : [clientesFilter];

        newChartData = await getDadosGraficoPie(produtosArray, clientesArray);

        setChartData(newChartData);
        setIsLoading(false);
    };

    if (isLoading || !chartData) {
        return <div className={'w-full h-full flex justify-center items-center'}>
            <Spinner/>
        </div>;
    }

    const totalVendas = chartData.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div>
            <p className={'font-bold text-lg'}>Vendas por Produtos Selecionados</p>
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
                        valueFormatter: (value: any) => `${value.data} vendas`,
                        paddingAngle: 2,
                        innerRadius: 80,
                        outerRadius: 60,
                        data: chartData,
                    },
                ]}
                width={400}
                height={200}
            >
                <PieCenterLabel valorTotal={`${totalVendas}`}/>
            </PieChart>
        </div>
    );
};

export default VendasGraficoPie;