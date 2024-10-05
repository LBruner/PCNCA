'use client';

import TradingViewChartIntervalPicker from "@/components/cotacoes/moedas-gráfico/chart-interval-list";
import CurrencySelect from "@/components/cotacoes/moedas-gráfico/currency-select";
import TradingViewChart from "@/components/cotacoes/moedas-gráfico/trading-view-chart";
import { currencies, Currency } from "@/helpers/moedas";
import { ChartInterval, intervals } from "@/models/moedas/grafico/intervals";
import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineCurrencyExchange } from "react-icons/md";

const CotacoesMoedasPage: React.FC = _ => {

    const [moedaOrigem, setMoedaOrigem] = useState<Currency>(
        currencies.find(item => item.currencyCode === 'USD') || currencies[0]
    );
    const [moedaDestino, setMoedaDestino] = useState<Currency>(currencies.find(item => item.currencyCode === 'BRL') || currencies[0]);

    const [selectedInterval, setSetselectedInterval] = useState<ChartInterval>(intervals[1]);

    return (
        <div className={'mt-32 flex flex-col items-center'}>
            <div className={'mb-8 flex flex-col items-center justify-start'}>
                <p className={'text-2xl font-bold'}>Cotações de moedas</p>
                <p className={'text-lg'}>Compare o valor das moedas estrangeiras</p>
            </div>
            <div className="w-4/5 border rounded-lg p-4 pb-16 bg-white flex flex-col gap">
                <div className={'mt-2 flex justify-around items-center'}>
                    <CurrencySelect collection={currencies.filter((item) => item != moedaDestino)} label="De:" value={moedaOrigem} onChange={setMoedaOrigem} />
                    <MdOutlineCurrencyExchange className="mt-6" color={'#808080'} size={30} />
                    <CurrencySelect collection={currencies.filter((item) => item != moedaOrigem)} label="Para:" value={moedaDestino} onChange={setMoedaDestino} />
                </div>
                <div className={'h-96 my-10 mx-4'}>
                    <hr />
                    <TradingViewChartIntervalPicker selectedInterval={selectedInterval} setSelectInterval={setSetselectedInterval} />
                    <TradingViewChart symbol={`${moedaOrigem.currencyCode}${moedaDestino.currencyCode}`} interval={selectedInterval.value} />
                </div>
            </div>
            <p className="text-right w-4/5 p-3">Fonte: <Link className="text-blue-600 font-bold" href={'https://www.tradingview.com/'}>TradingView</Link></p>
        </div>
    )
}

export default CotacoesMoedasPage;
