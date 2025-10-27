import React from "react";
import ProdutoEditForm from "@/components/produtos/ProdutoEditForm";
import {EstoqueComCultura, pegaUmEstoque} from "@/actions/estoques";
import {pegaCulturasUnicas} from "@/actions/adm";

interface EditProductPageProps {
    params: Promise<{
        produtoId: string
    }>
}

const EditProductPage: React.FC<EditProductPageProps> = async ({params}) => {
    const produtoId = (await params).produtoId;
    const estoque: EstoqueComCultura | null = await pegaUmEstoque(parseInt(produtoId));
    const culturas = await pegaCulturasUnicas();

    if (!estoque) {
        return <h1>Produto Invalido</h1>
    }

    return <ProdutoEditForm culturas={culturas} estoque={estoque} produtoId={produtoId}/>
}

export default EditProductPage;