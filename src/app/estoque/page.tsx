import React from "react";
import {getCotacoes} from "@/actions/cotacoes";
import TabelaEstoques from "@/components/estoque/estoque-filtragem-card";
import {getCategoriasFilterColletion} from "@/actions/adm";

const EstoquePage: React.FC = async _ => {
    const produtosEstoque = await getCotacoes();
    const categorias = await getCategoriasFilterColletion();

    console.log(categorias);
    // const cotacoes = productsInventory;

    if(!produtosEstoque){
        return <h1>Algo deu errado</h1>
    }

    return (
        <div>
            <div className={'flex flex-col justify-center items-center mt-40'}>
                <TabelaEstoques products={produtosEstoque} categoriesCollection={categorias}/>
            </div>
        </div>
    )
}

export default EstoquePage;