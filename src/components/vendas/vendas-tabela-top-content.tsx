'use client';

import React from "react";
import {Button, DateRangePicker, DateValue, Input, ModalContent, RangeValue, useDisclosure} from "@nextui-org/react";
import {SearchIcon} from "@nextui-org/shared-icons";
import TopContentDropDown from "@/components/estoque/tabela/top-content-dropdown";
import {I18nProvider} from "@react-aria/i18n";
import {DownloadIcon} from "@radix-ui/react-icons";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {GoFilter} from "react-icons/go";
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
    datesRange: RangeValue<DateValue>,
    setDatesRange: (range: RangeValue<DateValue>) => void;
}

const VendasTabelaTopContent: React.FC<TabelaTopContentProps> = (
    {
        clientesFilter,
        setClientesFilter,
        clientesFilterCollection,
        filterValue,
        produtosFilter,
        setProdutosFilter,
        produtosFilterCollection,
        onSearchChange,
        onClear,
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
                                        <TopContentDropDown collection={clientesFilterCollection}
                                                                  label={'Clientes'} width={size}
                                                                  filterStatus={clientesFilter}
                                                                  setFilterStatus={setClientesFilter}
                                                                  allSelectedLabel={'Todos Clientes'}
                                                                  multipleSelectedLabel={'Vários Clientes'}/>
                                        <TopContentDropDown collection={produtosFilterCollection}
                                                                  label={'Produtos'} width={size}
                                                                  filterStatus={produtosFilter}
                                                                  setFilterStatus={setProdutosFilter}
                                                                  allSelectedLabel={'Todos Produtos'}
                                                                  multipleSelectedLabel={'Vários Produtos'}/>
                                     <I18nProvider locale="pt-BR">
                                            <DateRangePicker
                                                radius={'md'}
                                                fullWidth={true}
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
        clientesFilter,
        produtosFilter,
        clientesFilterCollection,
        isOpen,
        setClientesFilter,
        onClear,
        onSearchChange,
        onOpenChange
    ]))
}

export default VendasTabelaTopContent;