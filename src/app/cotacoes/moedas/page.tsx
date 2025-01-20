import React from "react";
import MoedasPageBody from "@/components/cotacoes/moeda/MoedasPageBody";
import {pegaTodasMoedas} from "@/actions/moedas";
import EmptyState from "@/components/UI/NoData";

const CotacoesMoedasPage: React.FC = async _ => {
    const moedas = await pegaTodasMoedas();

    if (moedas.length == 0) {
        return <EmptyState description={'Nenhuma moeda encontrada'}/>
    }

    return (
        <MoedasPageBody moedas={moedas}/>
    )
}

export default CotacoesMoedasPage;
