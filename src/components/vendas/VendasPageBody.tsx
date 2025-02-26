'use client';

import React from "react";
import {FilterCollection} from "@/models/shared/FilterCollection";
import {CategoriaPessoaComEmpresa} from "@/actions/clientes";
import {VendasAgrupadas} from "@/actions/vendas";
import {Estoque} from "@prisma/client";
import VendasGraficoLine from "@/components/vendas/graficos/vendas-grafico-line";
import VendasGraficoPie from "@/components/vendas/graficos/vendas-grafico-pie";
import TabelaVendas from "@/components/vendas/tabela/TabelaVendas";
import VendasGraficoBar from "@/components/vendas/graficos/vendas-grafico-bar";

interface VendasPageBodyProps {
    clientes: CategoriaPessoaComEmpresa[];
    vendas: VendasAgrupadas[][];
    produtos: Estoque[];
}

const VendasPageBody: React.FC<VendasPageBodyProps> = ({clientes, vendas, produtos}) => {
    const [produtosFilter, setProdutosFilter] = React.useState<string | string[]>("all");
    const [clientesFilter, setClientesFilter] = React.useState<string | string[]>("all");

    const clientesFilterCollection: FilterCollection[] = clientes[0].pessoas.map((cliente) => ({
        name: cliente.pessoaJuridica?.razaoSocial!,
        uid: cliente.id.toString()
    }));

    const produtosFilterCollection: FilterCollection[] = produtos.map((produto) => ({
        name: produto.produto,
        uid: produto.id.toString()
    }));

    return (
        <div className={'flex flex-col items-center gap-6'}>
            <div className={'w-9/12 justify-center items-center grid grid-cols-2 grid-rows-2 gap-4'}>
                <div className={'h-64 border rounded p-4 col-start-1 row-start-1'}>
                    <VendasGraficoPie clientesFilter={clientesFilter} produtosFilter={produtosFilter}/>
                </div>
                    <div className={'h-64 border rounded p-4 col-start-2 row-start-1'}>
                        <VendasGraficoBar clientesFilter={clientesFilter} produtosFilter={produtosFilter}/>
                    </div>
                <div className={'border rounded px-4 col-span-2 row-start-2'}>
                    <VendasGraficoLine clientesFilter={clientesFilter} produtosFilter={produtosFilter}/>
                </div>
            </div>
            <TabelaVendas
                produtosFilter={produtosFilter}
                setProdutosFilter={setProdutosFilter}
                clientesFilter={clientesFilter}
                setClientesFilter={setClientesFilter}
                produtosFilterCollection={produtosFilterCollection}
                clientesFilterCollection={clientesFilterCollection}
                vendas={vendas}/>
        </div>
    )
}

export default VendasPageBody;