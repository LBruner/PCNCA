import React from "react";
import TradingViewChart from "@/components/cotacoes/moedas-card/trading-view-chart";
import TradingViewHeader from "@/components/cotacoes/moedas-card/trading-view-header";
import {Button} from "@nextui-org/react";

const CotacoesMoedasPage: React.FC = _ => {
    return (
        <div className={'mt-28 flex flex-col items-center justify-start h-4/6'}>
            <div className="w-4/5 flex justify-between items-center">
                <div className={'flex items-center gap-3'}>
                    <p className="mb-4 text-2xl my-4 font-bold text-left">Cotação do Dólar (USDBRL)</p>
                    <Button color={'primary'} size={"sm"} className={''}>Alterar moeda</Button>

                </div>
                <p className="mb-4 text-md my-4 text-left">Fonte:
                    <a target={'_blank'}
                       className={'text-blue-800 font-semibold'}
                       href={'https://br.tradingview.com/symbols/USDBRL/'}>TradingView</a>
                </p>
            </div>

            <div className={'flex flex-col justify-center items-center w-4/5 h-full gap-3'}>
                <TradingViewHeader/>
                <TradingViewChart/>
                <p className={'font-semibold text-sm'}>Lembramos que os valores são para consulta e oferecido por
                    terceiros. Não nos
                    responsabilizamos pela exatidão dos valores informados</p>
            </div>
        </div>
    )
}

export default CotacoesMoedasPage;
