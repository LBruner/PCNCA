'use client';
import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {BarChart} from '@mui/x-charts/BarChart';
import {getFullMonthName} from '@/helpers/graficos';
import {BarChartData} from '@/models/graficos/charts';
import {getDadosGraficoBar} from '@/actions/vendas';
import {formatToBrazilianCurrency} from "@/helpers";

interface VendasGraficoBarProps {
    produtosFilter: string | string[];
    clientesFilter: string | string[];
}

const VendasGraficoBar: React.FC<VendasGraficoBarProps> = ({produtosFilter, clientesFilter}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [chartData, setChartData] = useState<BarChartData>();

    useEffect(() => {
        fetchChartData(produtosFilter, clientesFilter).then();
    }, [produtosFilter, clientesFilter]);

    const fetchChartData = async (produtoFilter: string | string[], clientesFilter: string | string[]) => {
        setIsLoading(true);

        let newChartData;

        const produtosArray = produtoFilter === 'all' ? [] : Array.isArray(produtoFilter) ? produtoFilter : [produtoFilter];
        const clientesArray = clientesFilter === 'all' ? [] : Array.isArray(clientesFilter) ? clientesFilter : [clientesFilter];

        newChartData = await getDadosGraficoBar(produtosArray, clientesArray);

        setChartData(newChartData);
        setIsLoading(false);
    };

    if (isLoading || !chartData) {
        return (
            <div></div>
        );
    }

    return (
        <>
            <p style={{width: '105%'}} className={'font-semibold text-xl mb-2 dark:text-black'}>Venda de Todos os Produtos nos Últimos 12 Meses</p>
            <div ref={containerRef} style={{width: '105%'}}>
                <BarChart
                    borderRadius={12}
                    width={780}
                    height={220}
                    series={[
                        {
                            data: chartData.chartData.uData,
                            label: 'Vendas (R$)',
                            id: 'uvId',
                            valueFormatter: (value) => formatToBrazilianCurrency(value!),
                        },
                    ]}
                    grid={{horizontal: true}}
                    xAxis={[
                        {
                            valueFormatter: (code, context) =>
                                context.location === 'tick'
                                    ? code
                                    : `Mês: ${getFullMonthName(code)}`,
                            tickSize: 10,
                            disableTicks: false,
                            tickLabelStyle: {fontSize: 16},
                            data: chartData.chartData.xLabels,
                            scaleType: 'band',
                            labelStyle: {fontSize: 30},
                        },
                    ]}
                />
            </div>
        </>
    );
};

export default VendasGraficoBar;