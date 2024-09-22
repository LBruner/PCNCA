'use client';

import React from "react";
import {Button, DateRangePicker, DateValue, Input, ModalContent, RangeValue, useDisclosure} from "@nextui-org/react";
import {SearchIcon} from "@nextui-org/shared-icons";
import TopContentDropDown from "@/components/estoque/tabela/top-content-dropdown";
import VendasTopContentDropDown from "@/components/vendas/vendas-top-content-dropdown";
import {I18nProvider} from "@react-aria/i18n";
import {DownloadIcon} from "@radix-ui/react-icons";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {GoFilter} from "react-icons/go";

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
    const size = 'w-[80%]';

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

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
                        <Button variant={'bordered'} startContent={<GoFilter size={20}/>} onPress={onOpen} className="max-w-fit font-bold">Filtrar</Button>
                        <Button variant={'bordered'} className={'w-32 font-bold'} startContent={<DownloadIcon/>}>
                            Exportar
                        </Button>
                    </div>
                </div>
                <Modal
                    isOpen={isOpen}
                    placement={'center'}
                    onOpenChange={onOpenChange}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Filtrar conteúdo</ModalHeader>
                                <ModalBody>
                                    <div className="flex flex-col justify-center gap-8 items-center">
                                        <VendasTopContentDropDown collection={clientesOptions}
                                                                  label={'Cliente'} width={size}
                                                                  filterStatus={categoryFilter}
                                                                  setFilterStatus={setCategoryFilter}
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
                                </ModalBody>
                                <ModalFooter>
                                    <Button  color="success" onPress={onClose}>
                                        Filtrar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
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
        onOpenChange
    ]))
}

export default VendasTabelaTopContent;