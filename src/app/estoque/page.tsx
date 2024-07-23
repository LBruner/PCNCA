import React from "react";
import Estoques from "@/components/estoque/estoques";
import {getCotacoes} from "@/actions/cotacoes";

const EstoquePage: React.FC = async _ => {
    const cotacoes = await getCotacoes();

    if(!cotacoes){
        return <h1>Algo deu errado</h1>
    }

    return (
        <div>
            <Estoques products={cotacoes}/>
        </div>
    )
}

export default EstoquePage;