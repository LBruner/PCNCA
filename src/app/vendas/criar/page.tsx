import React from "react";
import {ProdutoEstoqueComRelacoes} from "@/actions/estoques";
import CriarVendaForm from "@/components/vendas/criação/CriarVendaForm";
import {pegaTodosClientes} from "@/actions/clientes";

export type ProdutosSelecionados = ProdutoEstoqueComRelacoes & {
    quantity: number
}

const CriarVendasPage: React.FC = async () => {
    const clientes = await pegaTodosClientes();

    if (clientes[0] != null && clientes[1] != null) {
        clientes[0].pessoas.push(...clientes[1].pessoas)
    }

    return (
        <div className={'h-svh'}>
            <CriarVendaForm clientes={clientes}/>
        </div>
    )
};

export default CriarVendasPage;
