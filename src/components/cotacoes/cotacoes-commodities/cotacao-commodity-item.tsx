import React from "react";
import {CotacaoCommodity} from "@/models/cotacao-commodity/cotacao-commodity";

interface CotacaoCommodityItemProps {
    cotacao: CotacaoCommodity
}

const CotacaoCommodityItem: React.FC<CotacaoCommodityItemProps> = ({cotacao}) => {
    return (
        <div className={'flex flex-col gap-4'}>
            <h1 className={'text-2xl font-semibold'}>{cotacao.nome}</h1>
            <hr className={'border-opacity-0.5 border-gray-600'}/>
            <div className={'flex justify-between'}>
                <div>
                    <p className={'text-green-700 font-medium'}>Negociação</p>
                    <p>Preço Físico</p>
                    <p>Futuro (set/24)</p>
                </div>
                <div>
                    <p className={'text-green-700 font-medium'}>Fonte</p>
                    <p>CEPEA</p>
                    <p>CBOT</p>
                </div>
                <div>
                    <p className={'text-green-700 font-medium'}>Data</p>
                    <p>11/11/2024</p>
                </div>
                <div>
                    <p className={'text-green-700 font-medium'}>Preço</p>
                    <p>{cotacao.preco}</p>
                </div>
                <div>
                    <p className={'text-green-700 font-medium'}>Variação</p>
                    <p>{cotacao.variacao}</p>
                </div>
            </div>
        </div>
    )
}
export default CotacaoCommodityItem;