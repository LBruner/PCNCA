import React from "react";
import {ProdutoEstoqueComRelacoes} from "@/actions/estoques";
import CriarVendaForm from "@/components/vendas/criação/CriarVendaForm";
import {pegaTodosClientes} from "@/actions/clientes";
import {pegaTodasFormasPagamento} from "@/actions/formaPagamento";

export type ProdutosSelecionados = ProdutoEstoqueComRelacoes & {
    quantity: number
}

const CriarVendasPage: React.FC = async () => {
    const clientes = await pegaTodosClientes();
    const formaPagamento = await pegaTodasFormasPagamento();

    return (
        <CriarVendaForm clientes={clientes} formasPagamento={formaPagamento}/>
    )
};

export default CriarVendasPage;
