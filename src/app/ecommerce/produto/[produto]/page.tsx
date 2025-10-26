import React from "react";
import Image from "next/image";
import { Estoque } from "@prisma/client";
import ProdutoDetalhes from "@/components/ecommerce/produto/detalhes/ProdutoDetalhes";
import { getSortedProduto } from "@/helpers/tabela";
import { pegaDetalhesProduto } from "@/actions/estoques";
import { notFound } from "next/navigation";

interface ShowProductPageProps {
    product: Estoque;
    params: { produto: string };
}

const ShowProductPage: React.FC<ShowProductPageProps> = async ({ product, params }) => {
    const produtoId = params.produto;
    const produto = await pegaDetalhesProduto(produtoId);

    if (!produto) {
        return notFound();
    }

    return (
        <div className={'w-full'}>
            <ProdutoDetalhes product={produto} />
        </div>
    )
}

export default ShowProductPage;