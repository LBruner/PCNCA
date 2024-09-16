'use client';

import React from "react";
import {Button, DateRangePicker, DateValue, Divider, Input, RangeValue} from "@nextui-org/react";
import {SearchIcon} from "@nextui-org/shared-icons";
import {PlusIcon} from "@/components/estoque/plus-icon";
import {PiPrinterFill} from "react-icons/pi";
import TopContentDropDown from "@/components/estoque/tabela/top-content-dropdown";
import Link from "next/link";
import paths from "@/paths";
import VendasTopContentDropDown from "@/components/vendas/vendas-top-content-dropdown";
import {I18nProvider} from "@react-aria/i18n";

export type SelectItem = {
    name: string;
    uid: string;
};

interface TabelaTopContentProps {
    statusFilter: string | string[];
    setStatusFilter: (keys: string | string[]) => void;
    priceFilter: string | string[];
    setPriceFilter: (keys: string | string[]) => void;
    stockFilter: string | string[];
    setStockFilter: (keys: string | string[]) => void;
    categoryFilter: string | string[];
    setCategoryFilter: (keys: string | string[]) => void;
    filterValue: string;
    itemsLenght: number;
    hasSearchFilter: boolean;
    onSearchChange: (value: string) => void;
    onClear: () => void;
    clientesOptions: SelectItem[]
    statusOptions: SelectItem[],
    datesRange: RangeValue<DateValue>,
    setDatesRange: (range: RangeValue<DateValue>) => void;
}

const VendasTabelaTopContent: React.FC<TabelaTopContentProps> = (
    {
        categoryFilter,
        setCategoryFilter,
        setStatusFilter,
        statusFilter,
        filterValue,
        stockFilter,
        priceFilter,
        onSearchChange,
        onClear,
        itemsLenght,
        clientesOptions,
        statusOptions,
        hasSearchFilter,
        datesRange,
        setDatesRange,
    }
) => {
    const size = 'w-1/5';

    return (React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3">
                    <div className={'flex gap-1 w-10/12'}>
                        <Input
                            size={'md'}
                            isClearable
                            className=" h-3"
                            placeholder="Procurar por nome..."
                            startContent={<SearchIcon/>}
                            value={filterValue}
                            onClear={() => onClear()}
                            onValueChange={onSearchChange}
                        />
                    </div>
                    <div className="flex gap-1 ">
                        <Button className={'text-white bg-orange-600 w-56'} startContent={<PlusIcon/>}>
                            <Link href={paths.createProduto()}>Adicionar novo produto</Link>
                        </Button>
                        <Button variant={'bordered'} className={'w-52'} startContent={<PiPrinterFill size={20}/>}>
                            Imprimir Estoque
                        </Button>
                    </div>
                </div>
                <Divider/>
                <div className="flex justify-center gap-8 items-center">
                    <VendasTopContentDropDown collection={clientesOptions}
                                              label={'Cliente'} width={size}
                                              filterStatus={categoryFilter} setFilterStatus={setCategoryFilter}
                                              allSelectedLabel={'Todos Clientes'}
                                              multipleSelectedLabel={'Vários Clientes'}/>
                    <TopContentDropDown
                        collection={statusOptions} label={'Status'}
                        width={size}
                        filterStatus={statusFilter} setFilterStatus={setStatusFilter}
                        multipleSelectedLabel={'Vários Status'} allSelectedLabel={'Todos Status'}/>
                    <I18nProvider locale="pt-BR">
                        <DateRangePicker
                            label={'Data de início e fim'}
                            labelPlacement={'outside'}
                            className="max-w-xs"
                            onChange={setDatesRange}
                            disableAnimation={false} size={'md'} variant={'flat'}/>
                    </I18nProvider>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        stockFilter,
        priceFilter,
        categoryFilter,
        itemsLenght,
        onSearchChange,
        hasSearchFilter,
        datesRange,
    ]))
}

export default VendasTabelaTopContent;