import React from "react";
import {buscarNomeClientes, buscarVendas} from "@/actions/vendas";
import VendasRelatorio from "@/components/vendas/vendas-relatorio";

const VendasPage: React.FC = async _ => {
    const vendas = await buscarVendas();

    if(!vendas){
        return <h1>Algo deu errado</h1>
    }

    const nomesClientes = await buscarNomeClientes();

    return (
        <div className={'flex flex-col justify-center items-center mt-40'}>
            <VendasRelatorio clientes={nomesClientes!} vendas={vendas}/>
        </div>
    )
}

export default VendasPage;