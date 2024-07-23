'use client';

import React from "react";
import {useFormState} from "react-dom";
import * as actions from "@/actions";
import ProdutoForm from "@/components/produtos/ProdutoForm";
import {Product} from "@prisma/client";

const ProdutoEditForm: React.FC<{produto: Product, produtoId: string}> = ({produtoId,produto}) => {
    const [formState, action] = useFormState(actions.editarProduto.bind(null, produtoId), {
        errors: {},
    })

    return (
        <ProdutoForm formState={formState} action={action} produto={produto}/>
    )
}

export default ProdutoEditForm;