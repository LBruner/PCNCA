import React from "react";
import CotacoesCommoditiesBody from "@/components/cotacoes/cotacoes-commodities/cotacoes-commodities-body";
import {cotacoesComodities} from "@/dummy_data/commodities";

const CotacoesPage: React.FC = _ => {
    return (
        <div className={'mt-36 w-full flex justify-center'}>
            <CotacoesCommoditiesBody cotacoes={cotacoesComodities}/>
        </div>
    )
}

export default CotacoesPage;