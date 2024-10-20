import React from "react";
import ProdutoCreateForm from "@/components/produtos/ProdutoCreateForm";
import {pegaFornecedor} from "@/actions/produto";

const CriarProdutoPage: React.FC = async _ => {
    const fornecedores = await pegaFornecedor();

    return <ProdutoCreateForm fornecedores={fornecedores}/>
}

export default CriarProdutoPage;