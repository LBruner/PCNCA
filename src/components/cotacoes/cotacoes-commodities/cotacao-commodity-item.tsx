import React from "react";
import {formatarData, formatToBrazilianCurrency} from "@/helpers";
import {CotacoesComCommodities} from "@/actions/cotacoes";

interface CotacaoCommodityItemProps {
    cotacao: CotacoesComCommodities;
}

const CotacaoCommodityItem: React.FC<CotacaoCommodityItemProps> = ({cotacao}) => {
    return (
        <div className={'flex flex-col gap-4'}>
            <h1 className={'text-2xl font-semibold'}>{cotacao.commodity.nome}</h1>
            <hr className={'border-opacity-0.5 border-gray-600'}/>
            <div className={'flex justify-between'}>
                <div>
                    <p className={'text-green-700 font-medium'}>Negociação</p>
                    <p>Preço Físico</p>
                    <p>Futuro (set/25)</p>
                </div>
                <div>
                    <p className={'text-green-700 font-medium'}>Fonte</p>
                    <p>{cotacao.fonte}</p>
                </div>
                <div>
                    <p className={'text-green-700 font-medium'}>Data</p>
                    <p>{formatarData(cotacao.data)}</p>
                </div>
                <div>
                    <p className={'text-green-700 font-medium'}>Preço</p>
                    <p>{formatToBrazilianCurrency(cotacao.valor)}</p>
                </div>
                <div>
                    <p className={'text-green-700 font-medium'}>Variação</p>
                    <p className={`${cotacao.percentageChange == 0 ? 'text-black' : cotacao.priceIncreased ? 'text-green-700' : 'text-red-500'}`}>
                        {cotacao.percentageChange.toFixed(2)}%
                    </p>
                </div>
                <div>
                    <p className={'text-green-700 font-medium'}>Mudança</p>
                    <p>{formatToBrazilianCurrency(cotacao.priceDifference)}</p>
                </div>
            </div>
        </div>
    );
};

export default CotacaoCommodityItem;