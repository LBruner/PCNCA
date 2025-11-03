import React from "react";
import {EstoqueComCultura} from "@/actions/estoques";
import CriarVendaForm from "@/components/vendas/criação/CriarVendaForm";
import {pegaTodosClientes} from "@/actions/clientes";

export type ProdutosSelecionados = EstoqueComCultura & {
    quantity: number
}

const CriarVendasPage: React.FC = async () => {
    const clientes = await pegaTodosClientes();

    if (clientes[0] != null && clientes[1] != null) {
        clientes[0].pessoas.push(...clientes[1].pessoas)
    }

    return (
        <div className="pt-6 pb-12 dark:bg-customDarkBg">
            <CriarVendaForm clientes={clientes}/>
        </div>
    )
};

export default CriarVendasPage;
