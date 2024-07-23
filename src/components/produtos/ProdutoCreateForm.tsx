'use client';

import React from "react";
import {useFormState} from "react-dom";
import * as actions from "@/actions";
import ProdutoForm from "@/components/produtos/ProdutoForm";

const ProdutoCreateForm: React.FC = _ => {
    const [formState, action] = useFormState(actions.criarProduto, {
        errors: {},
    })
    return (
        <ProdutoForm formState={formState} action={action}/>
    )
}

export default ProdutoCreateForm;