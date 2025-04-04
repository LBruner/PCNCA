import React from "react";
import {pegaTodasVendas} from "@/actions/vendas";
import {pegaTodosClientes} from "@/actions/clientes";
import {pegaTodosProdutosQueVenderam} from "@/actions/produto";
import VendasPageBody from "@/components/vendas/VendasPageBody";
import NoData from "@/components/UI/NoData";

const VendasPage: React.FC = async _ => {
    const vendas = await pegaTodasVendas();
    const clientes = await pegaTodosClientes();
    const produtos = await pegaTodosProdutosQueVenderam();

    if(vendas.length == 0){
        return  <NoData description={'Nenhuma venda encontrada'}/>   }

    if (clientes[0] != null && clientes[1] != null) {
        clientes[0].pessoas.push(...clientes[1].pessoas)
    }

    return(
        <VendasPageBody vendas={vendas} clientes={clientes} produtos={produtos}/>
    )
}

export default VendasPage;
