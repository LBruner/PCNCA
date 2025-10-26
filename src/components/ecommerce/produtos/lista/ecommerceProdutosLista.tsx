import { Estoque } from "@prisma/client";
import ProdutosItem from "./ecommerceProdutosItem";
import React from "react";

interface ProdutosListaProps {
    productList: Estoque[]
}

const ProdutosLista: React.FC<ProdutosListaProps> = ({ productList }) => {
    return (
        <>
            {
                productList.map((produto) => <div key={produto.id} >
                    <ProdutosItem produto={produto} />
                </div>)
            }
        </>
    );
}

export default ProdutosLista;