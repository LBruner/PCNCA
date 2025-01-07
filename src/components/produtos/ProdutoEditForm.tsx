'use client';

import React from "react";
import {useFormState} from "react-dom";
import * as actions from "@/actions";
import ProdutoForm from "@/components/produtos/ProdutoForm";
import {ProdutoEstoqueComRelacoes} from "@/components/estoque/TabelaEstoque";
import {Fornecedor} from "@/actions/produto";

interface ProdutoEditFormProps {
    produtoId: string;
    produto: ProdutoEstoqueComRelacoes;
    fornecedores?: Fornecedor[];
}

const ProdutoEditForm: React.FC<ProdutoEditFormProps> = ({produtoId,produto, fornecedores}) => {
    const [formState, action] = useFormState(actions.editarProduto.bind(null, produtoId), {
        errors: {},
    })

    return (
        <ProdutoForm fornecedores={fornecedores} formState={formState} action={action} produto={produto}/>
    )
}

export default ProdutoEditForm;