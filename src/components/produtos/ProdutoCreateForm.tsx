'use client';

import React from "react";
import {useFormState} from "react-dom";
import * as actions from "@/actions";
import ProdutoForm from "@/components/produtos/ProdutoForm";
import {FornecedorComRelacoes} from "@/actions/produto";
import {Cultura} from "@prisma/client";

interface ProdutoCreateFormProps {
    culturas: Cultura[];
    fornecedores: FornecedorComRelacoes[];
}

const ProdutoCreateForm: React.FC<ProdutoCreateFormProps> = ({culturas, fornecedores,}) => {
    const [formState, action] = useFormState(actions.criarProduto, {
        errors: {},
    })

    return (
        <ProdutoForm formState={formState} action={action} fornecedores={fornecedores} culturas={culturas}/>
    )
}

export default ProdutoCreateForm;