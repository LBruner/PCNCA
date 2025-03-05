import React from "react";
import ProdutoEditForm from "@/components/produtos/ProdutoEditForm";
import {pegaUmEstoque, ProdutoEstoqueComRelacoes} from "@/actions/estoques";
import {pegaCulturasUnicas} from "@/actions/adm";

interface EditProductPageProps {
    params: Promise<{
        produtoId: string
    }>
}

const EditProductPage: React.FC<EditProductPageProps> = async ({params}) => {
    const produtoId = (await params).produtoId;
    const produto: ProdutoEstoqueComRelacoes | null = await pegaUmEstoque(parseInt(produtoId));
    const culturas = await pegaCulturasUnicas();

    if (!produto) {
        return <h1>Produto Invalido</h1>
    }

    return <ProdutoEditForm culturas={culturas} produto={produto} produtoId={produtoId}/>
}

export default EditProductPage;