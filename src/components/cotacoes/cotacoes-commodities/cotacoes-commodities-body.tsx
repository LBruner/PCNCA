'use client';
import React, {useState} from "react";
import {Select, SelectItem} from "@heroui/react";
import CotacaoCommodityList from "@/components/cotacoes/cotacoes-commodities/cotacao-commodity-list";
import TradingViewSymbolChart from "@/components/cotacoes/cotacoes-commodities/trading-view-symbol-chart";
import Link from "next/link";
import CotacaoCommodityChart from "@/components/cotacoes/cotacoes-commodities/cotacao-commodity-chart";
import {getLineChartData} from "@/dummy_data/commodities";
import {CotacaoCommodity} from "@/models/cotacao-commodity/cotacao-commodity";

interface CotacoesCommoditiesProps {
    cotacoes: CotacaoCommodity[];
}

const CotacoesCommoditiesBody: React.FC<CotacoesCommoditiesProps> = ({cotacoes}) => {
    const [selectedCotacao, setSelectedCotacao] = useState<CotacaoCommodity>(cotacoes[0]);

    return (
        <div className={`w-full px-36`}>
            <h1 className={'text-4xl font-semibold'}>Cotações agropecuárias</h1>
            <p className={'mb-12 mt-5 text-xl'}>Acompanhe o fechamento dos preços médios das principais commodities agropecuárias.</p>

            <div className="w-56 my-5">
                <Select
                    labelPlacement={'outside'}
                    label="Commodity Selecionada"
                    multiple={false}
                    onSelectionChange={(keys: any) => {
                        const selectedId = [...keys][0];
                        const currentSelecao = cotacoes.find((cotacao) => cotacao.id.toString() === selectedId);
                        if (currentSelecao) {
                            setSelectedCotacao(currentSelecao);
                        }
                    }}
                    selectedKeys={new Set([selectedCotacao.id.toString()])}
                >
                    {cotacoes.map((cotacao) => (
                        <SelectItem key={cotacao.id.toString()}>
                            {cotacao.nome}
                        </SelectItem>
                    ))}
                </Select>
            </div>

            <CotacaoCommodityChart chartData={getLineChartData(selectedCotacao.nome.toString())} />

            <CotacaoCommodityList cotacoes={cotacoes} />

            <h1 className="text-3xl font-semibold mt-16 mb-6">Principais empresas do Agro na Bolsa</h1>
            <div className="h-[600px]">
                <TradingViewSymbolChart />
            </div>
            <p className="text-right p-3">
                Fonte:{" "}
                <Link className="text-blue-600 font-bold" href="https://www.tradingview.com/">
                    TradingView
                </Link>
            </p>
        </div>
    );
};

export default CotacoesCommoditiesBody;
