'use client';

import React from "react";
import { useActionState } from "react";
import * as actions from "@/actions";
import ProdutoForm from "@/components/produtos/ProdutoForm";
import {FornecedorComRelacoes} from "@/actions/produto";
import {Cultura} from "@prisma/client";

interface ProdutoCreateFormProps {
    culturas: Cultura[];
    fornecedores: FornecedorComRelacoes[];
}

const ProdutoCreateForm: React.FC<ProdutoCreateFormProps> = ({culturas,}) => {
    const [formState, action] = useActionState(actions.criarProduto, {
        errors: {},
    })

    return (
        <ProdutoForm formState={formState} action={action} culturas={culturas}/>
    )
}

export default ProdutoCreateForm;