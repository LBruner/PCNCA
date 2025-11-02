'use client';
import React, {useState} from "react";
import {CotacoesComCommodities} from "@/actions/cotacoes";
import TradingViewWidgetBoiGordo from "@/components/cotacoes/cotacoes-commodities/TradingViewBoiGordo";
import TradingViewMilho from "@/components/cotacoes/TradingViewMilho";
import TradingViewCafe from "@/components/cotacoes/cotacoes-commodities/TradingViewCafe";
import TradingViewSoja from "@/components/cotacoes/cotacoes-commodities/TradingViewSoja";
import TradingViewAdvancedChart from "@/components/cotacoes/moedas-gráfico/trading-view-advanced-chart";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/react";
import CotacaoCommodityList from "@/components/cotacoes/cotacoes-commodities/cotacao-commodity-list";
import CotacaoCommodityChart from "@/components/cotacoes/cotacoes-commodities/cotacao-commodity-chart";
import TradingViewSymbolChart from "@/components/cotacoes/cotacoes-commodities/trading-view-symbol-chart";
import Link from "next/link";

interface CotacoesCommoditiesProps {
    cotacoes: CotacoesComCommodities[];
}

const CotacoesCommoditiesBody: React.FC<CotacoesCommoditiesProps> = ({cotacoes}) => {
    const [selectedCommodity, setSelectedCommodity] = useState<CotacoesComCommodities>(cotacoes[0]);
    const [selectedSymbol, setSelectedSymbol] = useState('BGI1!');

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
                            selectedKeys={new Set([selectedCommodity?.variacao_id?.toString()])}
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

            <p className={'font-semibold text-4xl my-8'}>Mercados Futuros</p>
            <div
                className="flex gap-8">
                <div
                    className={`w-full hover:bg-gray-100 hover:pointer-events-auto ${selectedSymbol == 'BGI1!' ? 'bg-gray-100' : ''}`}
                    onClick={() => {
                        setSelectedSymbol('BGI1!');
                    }}>
                    <TradingViewWidgetBoiGordo/>
                </div>
                <div
                    className={`w-full hover:bg-gray-100 hover:pointer-events-auto ${selectedSymbol == 'CCM1!' ? 'bg-gray-100' : ''}`}
                    onClick={() => {
                        setSelectedSymbol('CCM1!');
                    }}>
                    <TradingViewMilho/>
                </div>
                <div
                    className={`w-full hover:bg-gray-100 hover:pointer-events-auto ${selectedSymbol == 'ZL1!' ? 'bg-gray-100' : ''}`}
                    onClick={() => {
                        setSelectedSymbol('ZL1!')
                    }}>
                    <TradingViewCafe/>
                </div>
                <div
                    className={`w-full hover:bg-gray-100 hover:pointer-events-auto ${selectedSymbol == 'SOY1!' ? 'bg-gray-100' : ''}`}
                    onClick={() => {
                        setSelectedSymbol('SOY1!')
                    }}>
                    <TradingViewSoja/>
                </div>
            </div>
            <div className={'mt-6 h-96'}>
                <TradingViewAdvancedChart showSymbol={false} symbol={selectedSymbol} interval={'W'}/>
            </div>

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
