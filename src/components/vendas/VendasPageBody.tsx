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
    addToast,
    Button,
    DateValue,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    ModalContent,
    RangeValue,
    Spinner,
    Tab,
    Tabs,
    useDisclosure
} from "@heroui/react";
import {CiExport, CiViewTable} from "react-icons/ci";
import {CgMenuGridO} from "react-icons/cg";
import {GoFilter} from "react-icons/go";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "@heroui/modal";
import VendasTopContentDropdown from "@/components/vendas/vendas-top-content-dropdown";
import {ToastProvider} from "@heroui/toast";
import {RiFileExcel2Line} from "react-icons/ri";
import {FaRegFilePdf} from "react-icons/fa";
import ExcelJS from "exceljs";
import {formatarData, formatToBrazilianCurrency} from "@/helpers";
import {saveAs} from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface VendasPageBodyProps {
    clientes: CategoriaPessoaComEmpresa[];
    vendas: VendasAgrupadas[][];
    produtos: Estoque[];
}

const size = 'w-[80%]';

const VendasPageBody: React.FC<VendasPageBodyProps> = ({clientes, vendas, produtos}) => {
    const [produtosFilter, setProdutosFilter] = React.useState<string | string[]>(produtos.map((produto) => produto.produto).slice(0, 5));
    const [clientesFilter, setClientesFilter] = React.useState<string | string[]>("all");
    const [selectedTab, setSelectedTab] = React.useState("geral");
    const [datesRange, setDatesRange] = useState<RangeValue<DateValue>>();
    const [isShowingToast, setIsShowingToast] = useState<boolean>(false);

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

    console.log(vendas)

    useEffect(() => {
        if (isShowingToast) {
            setTimeout(() => {
                setIsShowingToast(false)
            }, 5000)
        }
    }, [isShowingToast]);

    const handleSelectionChange = (keys: any) => {
        const selectedKeys = [...keys as unknown as string[]];

        if (selectedKeys.length > 5) {
            if (!isShowingToast) {
                addToast({
                    color: 'danger',
                    title: "Limite de produtos atingido",
                    description: "Diminua a quantidade de produtos selecionados e tente novamente",
                    timeout: 5000,
                    onClose: () => setIsShowingToast(false),
                });
                setIsShowingToast(true);
            }
            return;
        }

        setIsShowingToast(false);
        setProdutosFilter(selectedKeys);
    };
    const imprimirExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Produtos");

        // Add header row
        worksheet.addRow(["Cliente", "Data", "Produto", "Quantidade Unitária", "Valor Unitário", "Valor Total"]);

        vendas.forEach((vendaGroup) => {
            const firstItem = vendaGroup[0];
            const { pessoas, dataVenda } = firstItem.venda;

            // Match each estoque with its corresponding valorAlter
            vendaGroup.forEach((item, index) => {
                const estoque = item.venda.estoques[index];
                if (!estoque) return; // Skip if no matching product

                worksheet.addRow([
                    pessoas[0].pessoa.pessoaFisica?.nome ||
                    pessoas[0].pessoa.pessoaJuridica?.razaoSocial,
                    formatarData(item.dataAlter || dataVenda),
                    estoque.estoque.produto || "",
                    `${item.valorAlter} unidade(s)`,
                    formatToBrazilianCurrency(estoque.estoque.preco),
                    formatToBrazilianCurrency(estoque.estoque.preco * item.valorAlter),
                ]);
            });
        });

        // Set column widths and styling
        worksheet.columns = [
            { width: 20 }, { width: 30 }, { width: 20 },
            { width: 20 }, { width: 15 }, { width: 15 },
        ];

        worksheet.eachRow((row) => {
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: "thin" }, bottom: { style: "thin" },
                    left: { style: "thin" }, right: { style: "thin" },
                };
                cell.alignment = { horizontal: "center", vertical: "middle" };
                // @ts-ignore
                if (cell.col === 5) cell.alignment.horizontal = "centerContinuous";
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), "Relatório_Estoque.xlsx");
    };

    const imprimirPDF = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(18);
        doc.text("Relatório de Vendas", 14, 15);

        // Columns
        const headers = [
            "Cliente",
            "Data",
            "Produto",
            "Quantidade Unitária",
            "Valor Unitário",
            "Valor Total"
        ];

        // Process data with correct quantity matching
        const rows: (string | undefined)[][] = [];

        vendas.forEach((vendaGroup) => {
            const firstItem = vendaGroup[0];
            const { pessoas, dataVenda } = firstItem.venda;

            // Match each estoque with its corresponding valorAlter
            vendaGroup.forEach((item, index) => {
                const estoque = item.venda.estoques[index];
                if (!estoque) return;

                rows.push([
                    pessoas[0].pessoa.pessoaFisica?.nome ||
                    pessoas[0].pessoa.pessoaJuridica?.razaoSocial,
                    formatarData(item.dataAlter || dataVenda),
                    estoque.estoque.produto || "",
                    `${item.valorAlter} unidade(s)`,
                    formatToBrazilianCurrency(estoque.estoque.preco),
                    formatToBrazilianCurrency(estoque.estoque.preco * item.valorAlter)
                ]);
            });
        });

        // Generate table
        autoTable(doc, {
            startY: 25,
            head: [headers],
        // @ts-ignore
            body: rows,
            theme: "striped",
            styles: {
                fontSize: 10,
                cellPadding: 3,
                textColor: [0, 0, 0],
                halign: 'center',
                valign: 'middle'
            },
            headStyles: {
                fillColor: [22, 160, 133],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                halign: 'center'
            },
            columnStyles: {
                0: { cellWidth: 30 },
                1: { cellWidth: 25 },
                2: { cellWidth: 40 },
                3: { cellWidth: 25 },
                4: { cellWidth: 25 },
                5: { cellWidth: 25 }
            },
            didDrawPage: (data) => {
                // Footer
                doc.setFontSize(10);
                doc.setTextColor(100);
                doc.text(
                    `Gerado em ${formatarData(new Date())}`,
                    data.settings.margin.left,
                    doc.internal.pageSize.height - 10
                );
            }
        });

        doc.save("Relatório_Vendas.pdf");
    };

    return (
        <>
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
                    <div className={'pr-4'}>
                        <Button variant={'bordered'} startContent={<GoFilter size={20}/>} onPress={onOpen}
                                className="p-5 font-bold">Filtrar</Button>
                    </div>
                    <div className={'pr-48'}>
                        <Dropdown shouldBlockScroll={false} className={'w-auto p-5'}>
                            <DropdownTrigger className={'w-auto'}>
                                <Button variant="bordered">{<CiExport size={20}/>} <p className={'font-bold'}>Exportar</p> </Button>
                            </DropdownTrigger>
                            <DropdownMenu variant={'flat'} color={'default'}>
                                <DropdownItem color={'success'} startContent={
                                    <RiFileExcel2Line size={18}/>} onPress={imprimirExcel} key={'1'}><p
                                    className={'text-lg'}>Excel</p></DropdownItem>
                                <DropdownItem color={'danger'} startContent={<FaRegFilePdf size={18}/>}
                                              onPress={imprimirPDF} key={'2'}><p
                                    className={'text-lg'}>PDF</p></DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
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
                                    <div className={'h-72 dark:invert w-1/2 shadow border rounded-lg p-6 col-start-1 row-start-1'}>
                                        <VendasGraficoPie clientesFilter={clientesFilter}
                                                          produtosFilter={produtosFilter}/>
                                    </div>
                                    <div className={'h-72 dark:invert w-1/2 shadow border rounded p-5 col-start-2 row-start-1'}>
                                        <VendasGraficoBar clientesFilter={clientesFilter}
                                                          produtosFilter={produtosFilter}/>
                                    </div>
                                </div>
                                <div className={'border dark:invert mt-4 h-96 shadow rounded p-6 col-span-2 row-start-2'}>
                                    <VendasGraficoLine clientesFilter={clientesFilter} produtosFilter={produtosFilter}/>
                                </div>
                            </>}
                        </div>}
                    {selectedTab == 'detalhes' && <TabelaVendas
                        dateRange={datesRange!}
                        setDatesRange={setDatesRange}
                        clientesFilter={clientesFilter}
                        setClientesFilter={setClientesFilter}
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
                                <ToastProvider placement={'bottom-center'} maxVisibleToasts={1} toastOffset={180}/>
                                <ModalHeader className="">Filtrar conteúdo</ModalHeader>
                                <ModalBody>
                                    <>
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
                                        </div>
                                    </>
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
        </>
    )
}

export default VendasPageBody;
