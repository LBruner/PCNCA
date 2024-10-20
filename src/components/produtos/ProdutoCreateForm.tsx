'use client';

import React from "react";
import {useFormState} from "react-dom";
import * as actions from "@/actions";
import ProdutoForm from "@/components/produtos/ProdutoForm";
import {Fornecedor} from "@/actions/produto";

const ProdutoCreateForm: React.FC<{ fornecedores: Fornecedor[] }> = ({fornecedores}) => {
    const [formState, action] = useFormState(actions.criarProduto, {
        errors: {},
    })

    return (
        <ProdutoForm formState={formState} action={action} fornecedores={fornecedores}/>
    )
}

export default ProdutoCreateForm;