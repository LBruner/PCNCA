import React from "react";
import ProdutoEditForm from "@/components/produtos/ProdutoEditForm";
import {pegaFornecedor, pegaProduto} from "@/actions/produto";
import {ProdutoEstoqueComRelacoes} from "@/components/estoque/estoque-filtragem-card";

interface EditProductPageProps {
    params: {
        produtoId: string
    }
}

const EditProductPage: React.FC<EditProductPageProps> = async ({params}) => {
    const produto: ProdutoEstoqueComRelacoes | null = await pegaProduto(params.produtoId);
    const fornecedores = await pegaFornecedor();

    if (!produto) {
        return <h1>Produto Invalido</h1>
    }

    return <ProdutoEditForm fornecedores={fornecedores} produto={produto} produtoId={params.produtoId}/>
}

export default EditProductPage;