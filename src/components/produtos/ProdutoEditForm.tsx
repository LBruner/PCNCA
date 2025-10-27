'use client';

import React from "react";
import { useActionState } from "react";
import * as actions from "@/actions";
import ProdutoForm from "@/components/produtos/ProdutoForm";
import {EstoqueComCultura} from "@/actions/estoques";
import {Cultura} from "@prisma/client";

interface ProdutoEditFormProps {
    produtoId: string;
    estoque: EstoqueComCultura;
    culturas: Cultura[];
}

const ProdutoEditForm: React.FC<ProdutoEditFormProps> = ({culturas, estoque}) => {
    const [formState, action] = useActionState(actions.editarProduto.bind(null, estoque.id), {
        errors: {},
    })

    return (
        <ProdutoForm
            culturas={culturas}
            formState={formState}
            action={action}
            estoque={estoque}
        />
    )
}

export default ProdutoEditForm;