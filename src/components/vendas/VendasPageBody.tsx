'use client';

import React, {useEffect, useState} from "react";
import {FilterCollection} from "@/models/shared/FilterCollection";
import {CategoriaPessoaComEmpresa} from "@/actions/clientes";
import {VendasAgrupadas} from "@/actions/vendas";
import {Estoque} from "@prisma/client";
import VendasGraficoLine from "@/components/vendas/graficos/vendas-grafico-line";
import VendasGraficoPie from "@/components/vendas/graficos/vendas-grafico-pie";
import TabelaVendas from "@/components/vendas/tabela/TabelaVendas";
import VendasGraficoBar from "@/components/vendas/graficos/vendas-grafico-bar";
import {
    Button,
    DateRangePicker,
    DateValue,
    ModalContent,
    RangeValue,
    Spinner,
    Tab,
    Tabs,
    useDisclosure
} from "@heroui/react";
import {CiViewTable} from "react-icons/ci";
import {CgMenuGridO} from "react-icons/cg";
import {GoFilter} from "react-icons/go";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "@heroui/modal";
import {I18nProvider} from "@react-aria/i18n";
import VendasTopContentDropdown from "@/components/vendas/vendas-top-content-dropdown";

interface VendasPageBodyProps {
    clientes: CategoriaPessoaComEmpresa[];
    vendas: VendasAgrupadas[][];
    produtos: Estoque[];
}

const size = 'w-[80%]';

const VendasPageBody: React.FC<VendasPageBodyProps> = ({clientes, vendas, produtos}) => {
    const [produtosFilter, setProdutosFilter] = React.useState<string | string[]>(produtos.map((produto) => produto.produto).slice(0,5));
    const [clientesFilter, setClientesFilter] = React.useState<string | string[]>("all");
    const [selectedTab, setSelectedTab] = React.useState("geral");
    const [datesRange, setDatesRange] = useState<RangeValue<DateValue>>();

    const [isLoadingCharts, setIsLoadingCharts] = React.useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoadingCharts(false)
        }, 1000)
    }, [])

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const clientesFilterCollection: FilterCollection[] = clientes[0].pessoas.map((cliente) => ({
        name: cliente.pessoaJuridica?.razaoSocial != null ? cliente.pessoaJuridica?.razaoSocial : cliente.pessoaFisica?.nome!,
        uid: cliente.id.toString()
    }));

    const produtosFilterCollection: FilterCollection[] = produtos.map((produto) => ({
        name: produto.produto,
        uid: produto.id.toString(),
    }));

    const handleSelectionChange = (keys: any) => {
        const selectedKeys = [...keys as unknown as string[]];

        if (selectedKeys.length > 5) {
            alert("É possível selecionar no máximo 5 items");
            return;
        }

        setProdutosFilter(selectedKeys);
    };

    return (
        <div className={'flex flex-col w-full gap-1 min-h-[800px]'}>
            <div className={'flex justify-between items-center'}>
                <div className={'flex flex-col w-full gap-4 justify-start pl-24'}>
                    <p className={'text-3xl font-bold'}>Dashboard de Vendas</p>
                    <Tabs color={'primary'} size={'lg'} selectedKey={selectedTab}
                          onSelectionChange={(key) => setSelectedTab(key as string)}><Tab
                            key={'geral'}
                            title={
                                <div className="flex items-center space-x-2">
                                    <CgMenuGridO/>
                                    <span>Visão Geral</span>
                                </div>
                            }
                        >
                        </Tab>
                        <Tab
                            key={'detalhes'}
                            title={
                                <div className="flex items-center space-x-2">
                                    <CiViewTable/>
                                    <span>Detalhes</span>
                                </div>
                            }
                        >
                        </Tab>
                    </Tabs>
                </div>
                <div className={'pr-48'}>
                    <Button variant={'bordered'} startContent={<GoFilter size={20}/>} onPress={onOpen}
                            className="p-5 font-bold">Filtrar</Button>
                </div>
            </div>

            <div className={'w-full flex justify-center'}>
                {selectedTab == 'geral' &&
                    <div className={' justify-center items-center gap-4'}>
                        {isLoadingCharts ? <div
                            className="fixed inset-0 flex items-center justify-center">
                            <Spinner color={'warning'}/>
                        </div> : <>
                            <div className={'flex gap-4 mt-4'}>
                                <div className={'h-72 w-1/2 shadow border rounded-lg p-6 col-start-1 row-start-1'}>
                                    <VendasGraficoPie clientesFilter={clientesFilter} produtosFilter={produtosFilter}/>
                                </div>
                                <div className={'h-72 w-1/2 shadow border rounded p-5 col-start-2 row-start-1'}>
                                    <VendasGraficoBar clientesFilter={clientesFilter} produtosFilter={produtosFilter}/>
                                </div>
                            </div>
                            <div className={'border mt-4 h-96 shadow rounded p-6 col-span-2 row-start-2'}>
                                <VendasGraficoLine clientesFilter={clientesFilter} produtosFilter={produtosFilter}/>
                            </div>
                        </>}
                    </div>}
                {selectedTab == 'detalhes' && <TabelaVendas
                    dateRange={datesRange!}
                    setDatesRange={setDatesRange}
                    produtosFilter={produtosFilter}
                    setProdutosFilter={handleSelectionChange}
                    clientesFilter={clientesFilter}
                    setClientesFilter={setClientesFilter}
                    produtosFilterCollection={produtosFilterCollection}
                    clientesFilterCollection={clientesFilterCollection}
                    vendas={vendas}/>}
            </div>
            <Modal
                draggable={true}
                isOpen={isOpen}
                placement={'auto'}
                onOpenChange={onOpenChange}
                backdrop={'opaque'}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Filtrar conteúdo</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col justify-center gap-8 items-center">
                                    <VendasTopContentDropdown collection={clientesFilterCollection}
                                                        label={'Clientes'} width={size}
                                                        filterStatus={clientesFilter}
                                                        setFilterStatus={setClientesFilter}
                                                        allSelectedLabel={'Todos Clientes'}
                                                        multipleSelectedLabel={'Vários Clientes'}/>
                                    <VendasTopContentDropdown collection={produtosFilterCollection}
                                                        label={'Produtos'} width={size}
                                                        filterStatus={produtosFilter}
                                                        setFilterStatus={handleSelectionChange}
                                                        allSelectedLabel={'Todos Produtos'}
                                                        multipleSelectedLabel={'Vários Produtos'}/>
                                    {selectedTab == 'detalhes' && <I18nProvider locale="pt-BR">
                                        <DateRangePicker
                                            radius={'md'}
                                            fullWidth={true}
                                            label={'Data de início e fim'}
                                            labelPlacement={'outside'}
                                            className="max-w-xs"
                                            // @ts-ignore
                                            onChange={setDatesRange}
                                            disableAnimation={false} size={'md'} variant={'flat'}/>
                                    </I18nProvider>}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" onPress={onClose}>
                                    Filtrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default VendasPageBody;
