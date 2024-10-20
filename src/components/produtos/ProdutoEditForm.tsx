'use client';

import React from "react";
import {useFormState} from "react-dom";
import * as actions from "@/actions";
import ProdutoForm from "@/components/produtos/ProdutoForm";
import {ProdutoEstoqueComRelacoes} from "@/components/estoque/estoque-filtragem-card";

interface ProdutoEditFormProps {
    produtoId: string;
    produto: ProdutoEstoqueComRelacoes;
}

const ProdutoEditForm: React.FC<ProdutoEditFormProps> = ({produtoId,produto}) => {
    const [formState, action] = useFormState(actions.editarProduto.bind(null, produtoId), {
        errors: {},
    })

    return (
        <ProdutoForm formState={formState} action={action} produto={produto}/>
    )
}

export default ProdutoEditForm;