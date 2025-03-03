import React from "react";
import CotacaoCommodityItem from "@/components/cotacoes/cotacoes-commodities/cotacao-commodity-item";
import {CotacoesComCommodities} from "@/actions/cotacoes";

interface CotacaoCommodityListProps {
    cotacoes: CotacoesComCommodities[];
}

const CotacaoCommodityList: React.FC<CotacaoCommodityListProps> = ({cotacoes}) => {
    return (
        <div className={'mt-12 grid grid-cols-2 gap-x-12 gap-y-6'}>
            {cotacoes.map((cotacao) => (
                    <CotacaoCommodityItem key={cotacao.variacao_id} cotacao={cotacao}/>
                )
            )
            }
        </div>
    )
}

export default CotacaoCommodityList;