'use client';

import React, {useEffect, useState} from 'react';
import {PieChart, useDrawingArea} from '@mui/x-charts';
import {PieChartData} from '@/models/graficos/charts';
import {styled} from '@mui/material/styles';
import {getDadosGraficoPie} from '@/actions/vendas';

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

export const chartColors = [
    '#FFD700', // Gold (Grains)
    '#4CAF50', // Green (Vegetables)
    '#8B4513', // SaddleBrown (Livestock)
    '#FF6347', // Tomato (Fruits)
    '#F4A460', // SandyBrown (Nuts)
    '#6A5ACD', // SlateBlue (Dairy)
    '#20B2AA', // LightSeaGreen (Aquaculture)
    '#FF4500', // OrangeRed (Spices)
    '#8A2BE2', // BlueViolet (Herbs)
    '#00CED1', // DarkTurquoise (Fisheries)
    '#FF8C00', // DarkOrange (Tubers)
    '#7CFC00', // LawnGreen (Leafy Greens)
    '#8B008B', // DarkMagenta (Flowers)
    '#00BFFF', // DeepSkyBlue (Poultry)
    '#FF69B4', // HotPink (Berries)
    '#4682B4', // SteelBlue (Oilseeds)
    '#32CD32', // LimeGreen (Pulses)
    '#D2691E', // Chocolate (Coffee/Tea)
    '#00FA9A', // MediumSpringGreen (Sugar Crops)
    '#9932CC', // DarkOrchid (Medicinal Plants)
];

const PieCenterLabel = ({valorTotal}: { valorTotal: string }) => {
    const {height} = useDrawingArea();
    return (
        <>
            <StyleSubtitle fontSize={'20px'} x={505 / 2} y={height / 2.3}>
                Total
            </StyleSubtitle>
            <StyledValue fontWeight={600} x={505 / 2} y={height / 1.8}>
                {formatNumber(parseFloat(valorTotal))}
            </StyledValue>
        </>
    );
};

const VendasGraficoPie: React.FC<VendasGraficoPieProps> = ({produtosFilter, clientesFilter}) => {
    const [chartData, setChartData] = useState<PieChartData>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchChartData(produtosFilter, clientesFilter);
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
        </div>;
    }

    const totalVendas = chartData.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div>
            <p className={'font-semibold text-xl mb-4'}>Venda Geral por Produto</p>
            <PieChart
                className={'w-[800px] flex h-[400px]'} // Increased height
                colors={chartColors}
                slotProps={{
                    legend: {
                        direction: 'column',
                        position: { vertical: 'middle', horizontal: 'right' }, // Adjust legend position
                        padding: { top: 20 }, // Add padding to the top of the legend
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
                width={600}
                height={200} // Increased height
            >
                <PieCenterLabel valorTotal={`${totalVendas}`}/>
            </PieChart>
        </div>
    );
};

export default VendasGraficoPie;