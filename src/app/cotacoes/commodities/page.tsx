import React from "react";
import CotacoesCommoditiesBody from "@/components/cotacoes/cotacoes-commodities/cotacoes-commodities-body";
import {pegaCotacoes} from "@/actions/cotacoes";

const CotacoesPage: React.FC = async _ => {
    const cotacoes = await pegaCotacoes();

    return (
        <div className={'w-full flex justify-center pt-6 pb-12 dark:bg-customDarkBg'}>
            <CotacoesCommoditiesBody cotacoes={cotacoes}/>
        </div>
    )
}

export default CotacoesPage;