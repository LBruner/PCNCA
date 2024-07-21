'use client';

import React, {useState} from "react";
import type {Product} from '@prisma/client';
import CotacaoValorContainer from "@/components/cotacoes/cotacao-valor-container";
import CotacoesLista from "@/components/cotacoes/mais-vistos/cotacoes-lista";
import CotacaoAutoComplete from "@/components/cotacoes/cotacao-autocomplete";
import CotacoesTab from "@/components/cotacoes/tabs/CotacoesTab";

const Cotacoes: React.FC<{ cotacoes: Product[] }> = ({cotacoes}) => {
    const [selectedKey, setSelectedKey] = useState<string>('')
    const [showMaisVistos, setShowMaisVistos] = useState(true);

    let renderingTab;

    if (showMaisVistos) {
        renderingTab = <CotacoesLista cotacoes={cotacoes.slice(0, 24)} selectedKey={selectedKey}
                                      setSelectedKey={setSelectedKey}/>
    } else {
        renderingTab = <CotacaoAutoComplete cotacoes={cotacoes} selectedKey={selectedKey ?? ''}
                                            setSelectedKey={setSelectedKey}/>
    }

const selectedCotacao = cotacoes.find(cotacao => cotacao.id.toString() === selectedKey);

    return (
        <div>
            <div className={'flex flex-col justify-center items-center mt-40'}>
                <CotacoesTab setShowMaisVistos={setShowMaisVistos} showMaisVistos={showMaisVistos}/>
                <div>
                    {renderingTab}
                    <CotacaoValorContainer
                        selectedCotacao={selectedCotacao!}/>
                </div>
            </div>
        </div>
    )
}

export default Cotacoes;
