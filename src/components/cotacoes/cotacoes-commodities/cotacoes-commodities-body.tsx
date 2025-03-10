'use client';
import React, {useState} from "react";
import CotacaoCommodityList from "@/components/cotacoes/cotacoes-commodities/cotacao-commodity-list";
import TradingViewSymbolChart from "@/components/cotacoes/cotacoes-commodities/trading-view-symbol-chart";
import Link from "next/link";
import {CotacoesComCommodities} from "@/actions/cotacoes";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react';
import CotacaoCommodityChart from "@/components/cotacoes/cotacoes-commodities/cotacao-commodity-chart";

interface CotacoesCommoditiesProps {
    cotacoes: CotacoesComCommodities[];
}

const CotacoesCommoditiesBody: React.FC<CotacoesCommoditiesProps> = ({cotacoes}) => {
    const [selectedCommodity, setSelectedCommodity] = useState<CotacoesComCommodities>(cotacoes[0]);

    return (
        <div className={`w-full px-36`}>
            <div className={'flex justify-between items-center'}>
                <div>
                    <h1 className={'text-4xl font-semibold'}>Cotações agropecuárias</h1>
                    <p className={'mb-2 mt-5 text-xl'}>Acompanhe o fechamento dos preços médios das principais
                        commodities
                        agropecuárias.</p>
                </div>
                <div className={'w-64'}>
                    <p className={'font-semibold mb-2'}>Commodity Selecionada</p>
                    <Dropdown shouldBlockScroll={false} className={'w-full'} classNames={{trigger: 'w-44'}}>
                        <DropdownTrigger>
                            <Button variant="bordered">
                                {selectedCommodity ? selectedCommodity.commodity.nome : 'Select a commodity'}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Commodity selection"
                            onAction={(key) => {
                                const currentSelecao = cotacoes.find((cotacao) => cotacao.variacao_id.toString() === key);
                                if (currentSelecao) {
                                    setSelectedCommodity(currentSelecao);
                                }
                            }}
                            selectedKeys={new Set([selectedCommodity.variacao_id.toString()])}
                        >
                            {cotacoes.map((cotacao) => (
                                <DropdownItem key={cotacao.variacao_id.toString()}>
                                    {cotacao.commodity.nome}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>

            <CotacaoCommodityChart selectedCommodity={selectedCommodity}/>

            <CotacaoCommodityList cotacoes={cotacoes}/>

            <h1 className="text-4xl font-semibold mt-16 mb-6">Principais empresas do Agro na Bolsa</h1>
            <div className="h-[600px]">
                <TradingViewSymbolChart/>
            </div>
            <p className="text-right font-light p-3 mt-2">
                Fonte:{" "}
                <Link className="text-blue-600 font-bold" href="https://www.tradingview.com/">
                    TradingView
                </Link>
            </p>
        </div>
    );
};

export default CotacoesCommoditiesBody;
