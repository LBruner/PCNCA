import React from "react";
import {
    buscarNomeClientes,
    buscarVendas,
    getDadosGraficoPie,
    getMonthlySales,
    getTopProductsMonthlySales
} from "@/actions/vendas";
import VendasGraficoPie from "@/components/vendas/graficos/vendas-grafico-pie";
import {PrismaClient} from '@prisma/client'
import {db} from "@/db";
import {LineChartData, PieChartData} from "@/models/graficos/charts";
import VendasGraficoBar from "@/components/vendas/graficos/vendas-grafico-bar";
import VendasRelatorio from "@/components/vendas/vendas-relatorio";
import VendasGraficoLine from "@/components/vendas/graficos/vendas-grafico-line";

const VendasPage: React.FC = async _ => {
    const dadosGraficoPie = await getDadosGraficoPie();
    const barChartData = await getMonthlySales();
    const dadosGraficoLine: LineChartData = await getTopProductsMonthlySales();

    const vendas = await buscarVendas();

    if (!vendas) {
        return <h1>Algo deu errado</h1>
    }

    const nomesClientes = await buscarNomeClientes();

    if (nomesClientes?.length === 0) {
        console.log('Sem clientes');
    }

    const pieChartFormatedData:  PieChartData = dadosGraficoPie.map((item) => {
        return {
            id: item.productName,
            value: item.totalRevenue,
            label: item.productName
        };
    })

    return (
        <div className={'w-full flex flex-col items-center justify-center'}>
            <div className={'w-9/12 justify-center items-center grid grid-cols-2 grid-rows-2 gap-4 mt-32'}>
                <div className={'h-64 border rounded p-4 col-start-1 row-start-1'}>
                    <p className={'font-bold text-lg'}>Vendas por Produtos Selecionados</p>
                    <VendasGraficoPie chartData={pieChartFormatedData}/>
                </div>
                <div className={'h-64 border rounded p-4 col-start-2 row-start-1'}>
                    <p className={'font-bold text-lg'}>Atividade de Todos Produtos</p>
                    <VendasGraficoBar chartData={barChartData}/>
                </div>
                <div className={'h-64 border rounded px-4 col-span-2 row-start-2'}>
                    <VendasGraficoLine chartData={dadosGraficoLine}/>
                </div>
            </div>
             <div className={'mt-6 w-9/12 flex justify-center'}>
                 <VendasRelatorio clientes={nomesClientes!} vendas={vendas}/>
             </div>
        </div>
    )
}

const prisma = new PrismaClient()



export default VendasPage;