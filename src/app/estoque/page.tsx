import React from "react";
import {pegaTodosEstoquesUsuario} from "@/actions/estoques";
import {getCategoriasFilterColletion} from "@/actions/adm";
import {notFound} from "next/navigation";
import TabelaEstoque from "@/components/estoque/tabela/TabelaEstoque";

const EstoquePage: React.FC = async _ => {
    const produtosEstoque = await pegaTodosEstoquesUsuario();
    const categorias = await getCategoriasFilterColletion();

    if(!produtosEstoque){
        return notFound();
    }

    return (
        <div>
            <div className={'flex flex-col justify-center items-center'}>
                <TabelaEstoque products={produtosEstoque} categoriesCollection={categorias}/>
            </div>
        </div>
    )
}

export default EstoquePage;