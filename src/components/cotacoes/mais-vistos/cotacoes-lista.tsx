'use client';

import React, {useEffect, useState} from "react";
import type {Product} from '@prisma/client';
import Carousel from "@/components/UI/carousel/carousel";
import CotacoesItem from "@/components/cotacoes/mais-vistos/cotacoes-item";

interface CotacoesListaProps {
    cotacoes: Product[];
    setSelectedKey: (key: string) => void;
    selectedKey: string;
}

const CotacoesLista: React.FC<CotacoesListaProps> = (props) => {
    const {cotacoes,selectedKey,setSelectedKey} = props;
    const itemsPerPage = 6;

    const [paginationIndex, setPaginationIndex] = useState<number>(0);
    const [animationClass, setAnimationClass] = useState<string>('');

    const startIndex = paginationIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const renderingProducts = cotacoes.slice(startIndex, endIndex);

    const goToPage = (index: number) => {
        if (index >= 0 && index < Math.ceil(cotacoes.length / itemsPerPage)) {
            setAnimationClass(index > paginationIndex ? 'slide-enter-right' : 'slide-enter-left');
            setPaginationIndex(index);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationClass('');
        }, 500);

        return () => clearTimeout(timer);
    }, [paginationIndex]);

    return (
        <div>
            <Carousel hasMoreItems={endIndex < cotacoes.length} paginationIndex={paginationIndex} goToPage={goToPage}
                      pageCount={Math.ceil(cotacoes.length / itemsPerPage)}>
                <div className={`flex gap-2 ${animationClass}`}>
                    {renderingProducts.map((product) => (
                        <CotacoesItem product={product} selectedKey={selectedKey} setSelectedKey={setSelectedKey} key={product.id}/>
                    ))}
                </div>
            </Carousel>
        </div>
    )
}

export default CotacoesLista;
