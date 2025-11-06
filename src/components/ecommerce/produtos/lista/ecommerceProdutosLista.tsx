import { Estoque } from "@prisma/client";
import ProdutosItem from "./ecommerceProdutosItem";
import React from "react";

interface ProdutosListaProps {
    productList: Estoque[]
}

const BASE_DELAY = 0.10;

const ProdutosLista: React.FC<ProdutosListaProps> = ({ productList }) => {
    return (
        <>
            {
                productList.map((produto, index) => {
                    const delay = index * BASE_DELAY;

                    return (
                        <ProdutosItem
                            key={produto.id}
                            produto={produto}
                            animationDelay={delay}
                        />
                    );
                })
            }
        </>
    );
}

export default ProdutosLista;
