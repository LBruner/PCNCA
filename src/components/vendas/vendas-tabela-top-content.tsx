'use client';

import React from "react";
import {Button, Input} from "@nextui-org/react";
import {SearchIcon} from "@nextui-org/shared-icons";
import {DownloadIcon} from "@radix-ui/react-icons";
import {FilterCollection} from "@/models/shared/FilterCollection";


interface TabelaTopContentProps {
    clientesFilter: string | string[];
    setClientesFilter: (keys: string | string[]) => void;
    produtosFilter: string | string[];
    setProdutosFilter: (keys: string | string[]) => void;
    produtosFilterCollection: FilterCollection[]
    clientesFilterCollection: FilterCollection[]
    filterValue: string;
    itemsLenght: number;
    hasSearchFilter: boolean;
    onSearchChange: (value: string) => void;
    onClear: () => void;
}

const VendasTabelaTopContent: React.FC<TabelaTopContentProps> = (
    {
        clientesFilter,
        setClientesFilter,
        clientesFilterCollection,
        filterValue,
        produtosFilter,
        onSearchChange,
        onClear,
    }
) => {
    return (React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-center">
                    <p className={'font-bold'}>Tabela de Vendas</p>
                    <div className="flex gap-2">
                        <Input
                            size={'md'}
                            variant={'bordered'}
                            isClearable
                            className="w-36 h-3 font-bold"
                            placeholder="Procurar..."
                            startContent={<SearchIcon/>}
                            value={filterValue}
                            onClear={() => onClear()}
                            onValueChange={onSearchChange}
                        />
                        <Button variant={'bordered'} className={'w-32 font-bold'} startContent={<DownloadIcon/>}>
                            Exportar
                        </Button>
                    </div>
                </div>
            </div>
        );
    }, [
        filterValue,
        clientesFilter,
        produtosFilter,
        clientesFilterCollection,
        setClientesFilter,
        onClear,
        onSearchChange,
    ]))
}

export default VendasTabelaTopContent;