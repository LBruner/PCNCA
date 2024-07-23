import React from "react";
import ProdutoEditForm from "@/components/produtos/ProdutoEditForm";
import {pegaProduto} from "@/actions/produto";

interface EditProductPageProps {
    params: {
        produtoId: string
    }
}

const EditProductPage: React.FC<EditProductPageProps> = async ({params}) => {
    const produto = await pegaProduto(params.produtoId);

    if (!produto) {
        return <h1>Produto Invalido</h1>
    }

    return <ProdutoEditForm produto={produto} produtoId={params.produtoId}/>
}

export default EditProductPage;