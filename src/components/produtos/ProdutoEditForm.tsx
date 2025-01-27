'use client';

import React from "react";
import {useFormState} from "react-dom";
import * as actions from "@/actions";
import ProdutoForm from "@/components/produtos/ProdutoForm";
import {FornecedorComRelacoes} from "@/actions/produto";
import {ProdutoEstoqueComRelacoes} from "@/actions/estoques";
import {Cultura} from "@prisma/client";

interface ProdutoEditFormProps {
    produtoId: string;
    produto: ProdutoEstoqueComRelacoes;
    fornecedores?: FornecedorComRelacoes[];
    culturas: Cultura[];
}

const ProdutoEditForm: React.FC<ProdutoEditFormProps> = ({culturas, produto, fornecedores}) => {
    const [formState, action] = useFormState(actions.editarProduto.bind(null, produto.vendaId, produto.venda.pessoas[0].pessoaId, produto.estoqueId), {
        errors: {},
    })

    return (
        <ProdutoForm
            culturas={culturas}
            fornecedores={fornecedores}
            formState={formState}
            action={action}
            produto={produto}
        />
    )
}

export default ProdutoEditForm;