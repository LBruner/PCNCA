'use client';

import React from "react";
import { useActionState } from "react";
import * as actions from "@/actions";
import ProdutoForm from "@/components/produtos/ProdutoForm";
import {ProdutoEstoqueComRelacoes} from "@/actions/estoques";
import {Cultura} from "@prisma/client";

interface ProdutoEditFormProps {
    produtoId: string;
    produto: ProdutoEstoqueComRelacoes;
    culturas: Cultura[];
}

const ProdutoEditForm: React.FC<ProdutoEditFormProps> = ({culturas, produto}) => {
    const [formState, action] = useActionState(actions.editarProduto.bind(null, produto.vendaId, produto.estoqueId), {
        errors: {},
    })

    return (
        <ProdutoForm
            culturas={culturas}
            formState={formState}
            action={action}
            produto={produto}
        />
    )
}

export default ProdutoEditForm;