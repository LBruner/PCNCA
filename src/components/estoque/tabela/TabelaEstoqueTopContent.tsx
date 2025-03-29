import React from "react";
import {Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Tooltip} from "@heroui/react";
import {SearchIcon} from "@heroui/shared-icons";
import TopContentDropDown from "@/components/estoque/tabela/top-content-dropdown";
import {priceOptions, statusOptions, stockOptions} from "@/models/estoque/filters";
import Link from "next/link";
import paths from "@/paths";
import {FilterCollection} from "@/models/shared/FilterCollection";
import {MdOutlineSell} from "react-icons/md";
import {FaCirclePlus} from "react-icons/fa6";
import {useRouter} from "next/navigation";
import {ProdutoEstoqueComRelacoes} from "@/actions/estoques";
import ExcelJS from "exceljs";
import {saveAs} from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {PiPrinterFill} from "react-icons/pi";
import {RiFileExcel2Line} from "react-icons/ri";
import {FaRegFilePdf} from "react-icons/fa";
import {formatarData, formatToBrazilianCurrency} from "@/helpers";

interface TabelaTopContentProps {
    categoriesOptions: FilterCollection[]
    statusFilter: string | string[];
    setStatusFilter: (keys: string | string[]) => void;
    priceFilter: string | string[];
    setPriceFilter: (keys: string | string[]) => void;
    stockFilter: string | string[];
    setStockFilter: (keys: string | string[]) => void;
    categoryFilter: string | string[];
    setCategoryFilter: (keys: string | string[]) => void;
    hasSearchFilter: boolean;
    filterValue: string;
    itemsLenght: number;
    onSearchChange: (value: string) => void;
    onClear: () => void;
    selectedItems: string | string[];
    products: ProdutoEstoqueComRelacoes[],
}

const TabelaEstoquesTopContent: React.FC<TabelaTopContentProps> = (
    {
        categoriesOptions,
        categoryFilter,
        setCategoryFilter,
        setStatusFilter,
        statusFilter,
        filterValue,
        stockFilter,
        setStockFilter,
        priceFilter,
        setPriceFilter,
        onSearchChange,
        onClear,
        selectedItems,
        products
    }
) => {
    const size = 'w-full';
    const router = useRouter();

    const handleNewSale = () => {
        if(selectedItems.length === 0) return;
        if (typeof window !== "undefined") {
            localStorage.removeItem('selectedItems');
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
            router.push(paths.createVenda());
        }
    };
    const imprimirExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Produtos");

        // Add header row
        worksheet.addRow(["Produto", "Categoria", "Tipo", "Data de Adição", "Preço", "Estoque"]);

        // Add data rows
        products.forEach((produto) => {
            worksheet.addRow([
                produto?.estoque?.produto || "",
                produto?.estoque?.categoriaId?.nome || "",
                `${produto?.estoque?.tipo === 'A' ? 'Agrícola' : 'Pecuária'}` || "",
                formatarData(produto?.dataAlter) || "",
                formatToBrazilianCurrency(produto?.estoque?.preco) || "",
                `${produto?.estoque?.quantidade} UN` || "",
            ]);
        });

        // Set column widths
        worksheet.columns = [
            { width: 20 },
            { width: 30 },
            { width: 20 },
            { width: 20 },
            { width: 15 },
            { width: 15 },
        ];

        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: "thin" },
                    bottom: { style: "thin" },
                    left: { style: "thin" },
                    right: { style: "thin" },
                };

                cell.alignment = { horizontal: "center", vertical: "middle" };

                if (cell.col == '5') {
                    cell.alignment = { horizontal: "centerContinuous", vertical: "middle" };
                }
            });
        });

        // Save the workbook
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), "Relatório_Estoque.xlsx");
    };

    const imprimirPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Relatório de Estoque", 14, 15);

        const head = [["Produto", "Categoria", "Tipo", "Data de Adição", "Preço", "Estoque"]];

        const body = products.map((produto) => [
            produto?.estoque?.produto || "",
            produto?.estoque?.categoriaId?.nome || "",
            `${produto?.estoque?.tipo === 'A' ? 'Agrícola' : 'Pecuária'}` || "",
            formatarData(produto?.dataAlter) || "",
            formatToBrazilianCurrency(produto?.estoque?.preco) || "",
            `${produto?.estoque?.quantidade} UN` || "",
        ]);

        autoTable(doc, {
            startY: 25,
            head: head,
            body: body,
            theme: "striped",
            styles: {fontSize: 12},
            headStyles: {fillColor: [22, 160, 133]},
        });

        doc.save("Relatório_Estoque.pdf");
    };


    return (React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4 dark:bg-customDarkFooter">
                <div className="flex justify-between gap-4">
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
                        <Tooltip color={'foreground'}
                                 content={`${selectedItems.length === 0 ? 'Selecione produtos para criar uma venda' : 'Criar venda com produtos selecionados'}`}>
                            {
                                <Button onPress={handleNewSale} variant={'flat'}
                                        disabled={selectedItems.length === 0} color={'primary'} className={'w-52'}
                                        startContent={<MdOutlineSell size={20}/>}>
                                    Criar Venda
                                </Button>
                            }
                        </Tooltip>
                        <Link href={paths.createProduto()}>
                            <Button className={'w-56'} variant={'flat'} color={'warning'}
                                    startContent={<FaCirclePlus size={20}/>}>
                                Adicionar Estoque
                            </Button>
                        </Link>
                        <Dropdown shouldBlockScroll={false} className={'w-56'}>
                            <DropdownTrigger className={'w-56'}>
                                <Button variant="bordered">{<PiPrinterFill size={20}/>} Exportar Dados</Button>
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
                <Divider/>
                <div className="mx-4 flex justify-around gap-8">
                    <TopContentDropDown collection={categoriesOptions} label={'Categoria'} width={size}
                                        filterStatus={categoryFilter} setFilterStatus={setCategoryFilter}
                                        allSelectedLabel={'Todas Categorias'}
                                        multipleSelectedLabel={'Várias Categorias'}/>
                    <TopContentDropDown collection={statusOptions} label={'Status'} width={size}
                                        filterStatus={statusFilter} setFilterStatus={setStatusFilter}
                                        multipleSelectedLabel={'Vários Status'} allSelectedLabel={'Todos Status'}/>
                    <TopContentDropDown collection={priceOptions} label={'Preço'} width={size}
                                        filterStatus={priceFilter} setFilterStatus={setPriceFilter}
                                        multipleSelectedLabel={'Varios'} allSelectedLabel={'Desativado'}
                                        selectionType={'single'}/>
                    <TopContentDropDown collection={stockOptions} label={'Estoque'} width={size}
                                        filterStatus={stockFilter} setFilterStatus={setStockFilter}
                                        multipleSelectedLabel={'Varios'} allSelectedLabel={'Desativado'}
                                        selectionType={'single'}/>
                </div>
            </div>
        );
    }, [
        filterValue,
        categoriesOptions,
        handleNewSale,
        statusFilter,
        stockFilter,
        priceFilter,
        categoryFilter,
        onSearchChange,
        onClear,
        setCategoryFilter,
        setPriceFilter,
        setStatusFilter,
        setStockFilter,
        selectedItems,
        imprimirExcel,
        imprimirPDF
    ]))
}

export default TabelaEstoquesTopContent;