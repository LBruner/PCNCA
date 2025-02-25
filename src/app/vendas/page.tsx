import React from "react";
import {pegaTodasVendas} from "@/actions/vendas";
import {pegaTodosClientes} from "@/actions/clientes";
import {pegaTodosProdutos} from "@/actions/produto";
import VendasPageBody from "@/components/vendas/VendasPageBody";

const VendasPage: React.FC = async _ => {
    const vendas = await pegaTodasVendas();
    const clientes = await pegaTodosClientes();
    const produtos = await pegaTodosProdutos();

    return(
        <VendasPageBody vendas={vendas} clientes={clientes} produtos={produtos}/>
    )
}

export default VendasPage;
