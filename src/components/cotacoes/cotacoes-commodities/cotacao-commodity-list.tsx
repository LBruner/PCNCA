import React from "react";
import {CotacaoCommodity} from "@/models/cotacao-commodity/cotacao-commodity";
import CotacaoCommodityItem from "@/components/cotacoes/cotacoes-commodities/cotacao-commodity-item";

interface CotacaoCommodityListProps {
    cotacoes: CotacaoCommodity[];
}

const CotacaoCommodityList: React.FC<CotacaoCommodityListProps> = ({cotacoes}) => {
    return (
        <div className={'grid grid-cols-2 gap-x-12 gap-y-6'}>
            {cotacoes.map((cotacao) => (
                    <CotacaoCommodityItem cotacao={cotacao}/>
                )
            )
            }
        </div>
    )
}

export default CotacaoCommodityList;