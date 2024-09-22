import React from "react";
import Estoques from "@/components/estoque/estoques";
import {getCotacoes} from "@/actions/cotacoes";
import {productsInventory} from "@/dummy_data/products_inventory";

const EstoquePage: React.FC = async _ => {
    // const cotacoes = await getCotacoes();

    const cotacoes = productsInventory;

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