'use client';

import React, {useState} from "react";
import {Tab, Tabs} from "@nextui-org/react";
import {BsBarChart, BsCashCoin} from "react-icons/bs";
import CurrencySelect from "@/components/cotacoes/currency-select";
import {currencies, Currency} from "@/helpers/moedas";
import {MdOutlineCurrencyExchange} from "react-icons/md";
import TradingViewChart from "@/components/cotacoes/moedas-card/trading-view-chart";

const CotacoesMoedasPage: React.FC = _ => {

    const [moedaOrigem, setMoedaOrigem] = useState<Currency>(
        currencies.find(item => item.code === 'us') || currencies[0]
    );
    const [moedaDestino, setMoedaDestino] = useState<Currency>(currencies.find(item => item.code === 'br') || currencies[0]);

    return (
        <div className={'mt-32 flex flex-col items-center justify-start h-4/6'}>
            <div className={'mb-12 flex flex-col items-center justify-center'}>
                <p className={'text-3xl font-bold'}>Conversor de Moedas</p>
                <p className={'text-lg'}>Verifique as taxas de câmbio de moeda estrangeira</p>
            </div>
            <div className="w-4/5  border rounded-lg p-4 bg-white flex flex-col gap">
                <div className={'flex justify-center w-full mt-2'}>
                    <Tabs color={'warning'} variant={'underlined'} size={'lg'} className={''}>
                        <Tab
                            key="photos"
                            title={
                                <div className="flex items-center space-x-4 mx-5">
                                    <BsBarChart size={19}/>
                                    <span className={'text-xl'}>Gráficos</span>
                                </div>
                            }
                        />
                        <Tab
                            key="music"
                            title={
                                <div className="flex items-center space-x-4 bg-white  mx-5">
                                    <BsCashCoin size={19}/>
                                    <span className={'text-xl'}>Converter</span>
                                </div>
                            }
                        />
                    </Tabs>
                </div>
                <div className={'mt-6 flex justify-around items-center'}>
                    <CurrencySelect value={moedaOrigem} onChange={setMoedaOrigem}/>
                    <MdOutlineCurrencyExchange color={'#808080'} size={30}/>
                    <CurrencySelect value={moedaDestino} onChange={setMoedaDestino}/>
                </div>
                <div className={'h-96 my-12 mx-4'}>
                    <TradingViewChart/>
                </div>

                
            </div>
        </div>
    )
}

export default CotacoesMoedasPage;
