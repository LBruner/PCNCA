'use client';

import React, {useState} from "react";
import {
    DateValue,
    Listbox,
    ListboxItem,
    RangeValue,
    SortDescriptor,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
    useDisclosure
} from "@nextui-org/react";
import type {Sale} from '@prisma/client';
import {Chip} from "@nextui-org/chip";
import {DeleteIcon, EditIcon, EyeIcon} from "@nextui-org/shared-icons";
import {getSortedVenda} from "@/helpers/tabela";
import Link from "next/link";
import paths from "@/paths";
import ProdutoDeleteModal from "@/components/produtos/ProdutoDeleteModal";
import VendasTabelaBottomContent from "@/components/vendas/vendas-tabela-bottom-content";
import {getPublicacaoData} from "@/helpers/noticia/criacao/criar-noticia";
import VendasTabelaTopContent, {SelectItem} from "@/components/vendas/vendas-tabela-top-content";

const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "CLIENTE", uid: "cliente", sortable: true},
    {name: "VENDEDOR", uid: "vendedor", sortable: true},
    {name: "DATA", uid: "data", sortable: true},
    {name: "PRODUTOS", uid: "produtos", sortable: true},
    {name: "STATUS", uid: "status", sortable: true},
    {name: "VALOR TOTAL", uid: "vrTotal", sortable: true},
    {name: "AÇÕES", uid: "actions"},
];

const EstoqueFiltragemCard: React.FC<{ vendas: Sale[], clientes: Array<string> }> = ({vendas, clientes}) => {
    const [filterValue, setFilterValue] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState<string | string[]>("all");
    const [clienteFilter, setClienteFilter] = React.useState<string | string[]>("all");
    const [priceFilter, setPriceFilter] = React.useState<string | string[]>(['Desativado']);
    const [stockFilter, setStockFilter] = React.useState<string | string[]>(['Desativado']);
    const [dateRange, setDateRange] = useState<RangeValue<DateValue>>();
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "id",
        direction: "ascending",
    });

    console.log(sortDescriptor);
    // console.log(dateRange?.start.day)

    const hasSearchFilter = Boolean(filterValue);

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    const rowsPerPage = 5;

    const [currentPage, setCurrentPage] = React.useState(1);

    const clientesOptions: SelectItem[] = clientes.map((item) => {
        return {name: item, uid: item}
    });

    //TODO: Quem sabe criar uma table pros status
    const statusOptions = [
        {name: 'Concluída', uid: 'Concluída'}, {name: 'Em espera', uid: 'Em espera'}, {
            name: 'Desativado',
            uid: 'Desativado'
        },
    ]

    const filteredItems = React.useMemo(() => {
        let filteredVendas = [...vendas];

        if (hasSearchFilter) {
            filteredVendas = vendas.filter(sale => sale.saleItems.some(item => item.product.name.toLowerCase().includes(filterValue.toLowerCase())));
        }

        if (clienteFilter !== "all" && Array.from(clientesOptions).length !== clienteFilter.length) {
            filteredVendas = filteredVendas.filter((venda) =>
                Array.from(clienteFilter).includes(venda.customerName),
            );
        }

        if (statusFilter !== "all" && Array.from(statusOptions).length !== statusFilter.length) {
            console.log(statusFilter);
            filteredVendas = filteredVendas.filter((venda) =>
                Array.from(statusFilter).includes(venda.status),
            );
        }

        if (dateRange) {
            filteredVendas = filteredVendas.filter((venda) => {
                const productDate = new Date(venda.date).toISOString().split('T')[0];
                const filteredInitialDate = new Date(dateRange.start.year, dateRange.start.month - 1, dateRange.start.day).toISOString().split('T')[0];
                const filteredEndingDate = new Date(dateRange.end.year, dateRange.end.month - 1, dateRange.end.day).toISOString().split('T')[0];
                return productDate >= filteredInitialDate && productDate <= filteredEndingDate;
            });
        }

        return filteredVendas;
    }, [vendas, filterValue, statusFilter, clienteFilter, priceFilter, stockFilter,dateRange, ]);

    const totalPagesQuantity = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [currentPage, filteredItems, rowsPerPage, sortDescriptor]);

    const sortedItems = React.useMemo(() => {
        return getSortedVenda(items, sortDescriptor)
    }, [sortDescriptor, items]);


    const renderCell = React.useCallback((venda: Sale, columnKey: string) => {
        switch (columnKey) {
            case "id":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{venda.id}</p>
                    </div>);
            case "cliente":
                return (
                    <p>
                        {venda.customerName}
                    </p>
                );
            case "vendedor":
                return (
                    <p>
                        {venda.seller.name}
                    </p>
                );
            case "vrTotal":
                return (
                    <p>{`R\$${venda.totalPrice}`}</p>
                );
            case "data":
                return (
                    <Chip className="capitalize" size="sm" variant="flat">
                        <p>{getPublicacaoData(false, venda.date)}</p>
                    </Chip>
                );
            case "produtos":
                return (
                    <div className="flex flex-col">
                        <Listbox
                            aria-label="Lista de Produtos Vendidos"
                            onAction={(key) => alert(`Produto selecionado: ${key}`)}
                        >
                            {venda.saleItems.map((item) => (
                                <ListboxItem key={item.id}>
                                    {`${item.product.name}`}
                                </ListboxItem>
                            ))}
                        </Listbox>
                    </div>);
            case "status":
                return (
                    <div className="flex flex-col">
                        <Chip className="capitalize" size="sm" variant="bordered"
                              color={`${venda.status == 'Concluída' ? 'success' : 'warning'}`}>
                            {`${venda.status}`}
                        </Chip>
                    </div>);
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-2">
                        <Tooltip content="Detalhes">
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EyeIcon/>
                          </span>
                        </Tooltip>
                        <Tooltip content="Editar Produto">
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <Link href={`${paths.editProduto(venda.id.toString())}`}><EditIcon/></Link>
                          </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Deletar Produto">
                          <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon onClick={() => {
                                setSelectedProductId(venda.id);
                                onOpen();
                            }}/>
                          </span>
                        </Tooltip>
                    </div>
                );
            default:
                return <h1>oi</h1>;
        }
    }, []);


    const onSearchChange = React.useCallback((value: string | null) => {
        if (value) {
            setFilterValue(value);
            setCurrentPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setCurrentPage(1)
    }, [])

    return (
        <div className={'w-11/12'}>
            <ProdutoDeleteModal isOpen={isOpen} onClose={onClose} productId={selectedProductId}/>
            <div className={'bg-white rounded-md p-4 mb-4'}>
                <VendasTabelaTopContent setDatesRange={setDateRange} datesRange={dateRange!} hasSearchFilter={hasSearchFilter} statusOptions={statusOptions} clientesOptions={clientesOptions}
                                        setCategoryFilter={setClienteFilter}
                                        categoryFilter={clienteFilter} filterValue={filterValue}
                                        setStatusFilter={setStatusFilter} onClear={onClear}
                                        onSearchChange={onSearchChange} statusFilter={statusFilter}
                                        priceFilter={priceFilter}
                                        setPriceFilter={setPriceFilter} stockFilter={stockFilter}
                                        setStockFilter={setStockFilter}
                                        itemsLenght={vendas.length}/>
            </div>
            <Table
                isHeaderSticky
                key={`${sortDescriptor.column}-${sortDescriptor.direction}`}
                bottomContentPlacement="outside"
                bottomContent={<VendasTabelaBottomContent
                    hasSearchFilter={hasSearchFilter}
                    currentPage={currentPage} setCurrentPage={setCurrentPage}
                    filteredItemsLength={filteredItems.length}
                    totalPagesQuantity={totalPagesQuantity}
                    selectedKeys={[]}/>}
                selectionMode="none"
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
                classNames={{
                    wrapper: "max-h-2/4 min-h-[30rem] h-[30rem]",
                }}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody className={'min-h-96 h-96 max-h-96'} emptyContent={"Nenhum produtos encontrado"}
                           items={sortedItems}>
                    {(sale: Sale) => (
                        <TableRow key={sale.id}>
                            {
                                columns.map((column) => (
                                    <TableCell key={column.uid}>
                                        {renderCell(sale, column.uid)}
                                    </TableCell>
                                ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};


export default EstoqueFiltragemCard;
