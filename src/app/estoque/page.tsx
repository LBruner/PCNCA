import React from "react";
import Estoques from "@/components/estoque/estoques";
import {getCotacoes} from "@/actions/cotacoes";

const EstoquePage: React.FC = async _ => {
    const produtosEstoque = await getCotacoes();

    // const cotacoes = productsInventory;

    if(!produtosEstoque){
        return <h1>Algo deu errado</h1>
    }

    return (
        <div>
            <Estoques products={produtosEstoque}/>
        </div>
    )
}

export default EstoquePage;