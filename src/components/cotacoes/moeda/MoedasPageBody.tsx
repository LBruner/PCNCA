'use client';

import React, {useState} from "react";
import {ChartInterval, intervals} from "@/models/moedas/grafico/intervals";
import CurrencySelect from "@/components/cotacoes/moedas-gráfico/currency-select";
import {MdOutlineCurrencyExchange} from "react-icons/md";
import TradingViewChartIntervalPicker from "@/components/cotacoes/moedas-gráfico/chart-interval-list";
import TradingViewChart from "@/components/cotacoes/moedas-gráfico/trading-view-advanced-chart";
import Link from "next/link";
import {Moed} from "@prisma/client";

interface MoedasPageBodyProps {
    moedas: Moed[]
}

const MoedasPageBody: React.FC<MoedasPageBodyProps> = ({moedas}) => {
    const [moedaOrigem, setMoedaOrigem] = useState<Moed>(
        moedas.find(item => item.sigla === 'USD') || moedas[0]
    );
    const [moedaDestino, setMoedaDestino] = useState<Moed>(moedas.find(item => item.sigla === 'BRL') || moedas[0]);

    const [selectedInterval, setSetselectedInterval] = useState<ChartInterval>(intervals[1]);

    return (
        <div className={'mt-36 flex flex-col items-center'}>
            <div className={'mb-8 flex flex-col items-center justify-start'}>
                <p className={'text-3xl font-bold'}>Cotações de moedas</p>
                <p className={'text-lg text-gray-500'}>Compare o valor das moedas estrangeiras</p>
            </div>
            <div className="w-4/5 border rounded-lg p-4 pb-16 bg-white flex flex-col gap">
                <div className={'mt-2 flex justify-around items-center'}>
                    <CurrencySelect collection={moedas.filter((item) => item != moedaDestino)} label="De:"
                                    value={moedaOrigem} onChange={setMoedaOrigem}/>
                    <MdOutlineCurrencyExchange className="mt-6" color={'#808080'} size={30}/>
                    <CurrencySelect collection={moedas.filter((item) => item != moedaOrigem)} label="Para:"
                                    value={moedaDestino} onChange={setMoedaDestino}/>
                </div>
                <div className={'h-96 my-10 mx-4'}>
                    <hr/>
                    <TradingViewChartIntervalPicker selectedInterval={selectedInterval}
                                                    setSelectInterval={setSetselectedInterval}/>
                    <TradingViewChart symbol={`${moedaOrigem.sigla}${moedaDestino.sigla}`}
                                      interval={selectedInterval.value}/>
                </div>
            </div>
            <p className="text-right w-4/5 p-6">Fonte: <Link className="text-blue-600 font-bold"
                                                             href={'https://www.tradingview.com/'}>TradingView</Link>
            </p>
        </div>
    );
}

export default MoedasPageBody;