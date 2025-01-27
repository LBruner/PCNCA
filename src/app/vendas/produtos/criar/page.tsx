import React from "react";
import ProdutoCreateForm from "@/components/produtos/ProdutoCreateForm";
import {pegaFornecedores} from "@/actions/produto";
import {pegaCulturasUnicas} from "@/actions/adm";

const CriarProdutoPage: React.FC = async _ => {
    const fornecedores = await pegaFornecedores();
    const culturas = await pegaCulturasUnicas();

    return <ProdutoCreateForm culturas={culturas} fornecedores={fornecedores}/>
}

export default CriarProdutoPage;