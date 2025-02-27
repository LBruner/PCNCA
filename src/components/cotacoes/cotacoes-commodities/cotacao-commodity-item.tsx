import React, { useEffect, useState } from "react";
import { CotacaoCommodity } from "@/models/cotacao-commodity/cotacao-commodity";
import { formatToBrazilianCurrency } from "@/helpers";

interface CotacaoCommodityItemProps {
    cotacao: CotacaoCommodity;
}

const CotacaoCommodityItem: React.FC<CotacaoCommodityItemProps> = ({ cotacao }) => {
    const [randomPrice, setRandomPrice] = useState<number>(0);
    const [randomVariation, setRandomVariation] = useState<number>(0);
    const [isPositiveVariation, setIsPositiveVariation] = useState<boolean>(false);

    useEffect(() => {
        setRandomPrice(Math.random() * cotacao.preco);
        const variation = Math.random() * cotacao.variacao;
        setRandomVariation(variation);
        setIsPositiveVariation(Math.floor(Math.random() * 2) === 0);
    }, [cotacao.preco, cotacao.variacao]);

    console.log(randomVariation)

    return (
        <div className={'flex flex-col gap-4'}>
            <h1 className={'text-2xl font-semibold'}>{cotacao.nome}</h1>
            <hr className={'border-opacity-0.5 border-gray-600'} />
            <div className={'flex justify-between'}>
                <div>
                    <p className={'text-green-700 font-medium'}>Negociação</p>
                    <p>Preço Físico</p>
                    <p>Futuro (set/25)</p>
                </div>
                <div>
                    <p className={'text-green-700 font-medium'}>Fonte</p>
                    <p>CEPEA</p>
                    <p>CBOT</p>
                </div>
                <div>
                    <p className={'text-green-700 font-medium'}>Data</p>
                    <p>11/02/2025</p>
                </div>
                <div>
                    <p className={'text-green-700 font-medium'}>Preço</p>
                    <p>{formatToBrazilianCurrency(randomPrice)}</p>
                </div>
                <div>
                    <p className={'text-green-700 font-medium'}>Variação</p>
                    <p className={`${randomVariation.toFixed(2) == '0.00' ? 'text-black' : isPositiveVariation ? 'text-green-700' : 'text-red-500'}`}>
                        {randomVariation.toFixed(2)}%
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CotacaoCommodityItem;