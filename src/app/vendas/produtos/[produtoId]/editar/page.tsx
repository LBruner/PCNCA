import React from "react";
import ProdutoEditForm from "@/components/produtos/ProdutoEditForm";
import {pegaFornecedores} from "@/actions/produto";
import {pegaUmEstoque, ProdutoEstoqueComRelacoes} from "@/actions/estoques";
import {pegaCulturasUnicas} from "@/actions/adm";

interface EditProductPageProps {
    params: {
        produtoId: string
    }
}

const EditProductPage: React.FC<EditProductPageProps> = async ({params}) => {
    const produto: ProdutoEstoqueComRelacoes | null = await pegaUmEstoque(parseInt(params.produtoId));
    const fornecedores = await pegaFornecedores();
    const culturas = await pegaCulturasUnicas();

    if (!produto) {
        return <h1>Produto Invalido</h1>
    }

    return <ProdutoEditForm culturas={culturas} fornecedores={fornecedores} produto={produto} produtoId={params.produtoId}/>
}

export default EditProductPage;