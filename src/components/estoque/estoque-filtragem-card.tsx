'use client';

import React, {useState} from "react";
import {
    ChipProps, SortDescriptor,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip, useDisclosure,
    User as Usuario
} from "@nextui-org/react";
import type {Product, User} from '@prisma/client';
import {Chip} from "@nextui-org/chip";
import {DeleteIcon, EditIcon, EyeIcon} from "@nextui-org/shared-icons";
import TabelaTopContent from "@/components/estoque/tabela/tabela-top-content";
import TabelaBottomContent from "@/components/estoque/tabela/tabela-bottom-content";
import {categoriesOptions, priceOptions, statusOptions, stockOptions} from "@/models/estoque/filters";
import {getFilteredItems, getSortedProduto} from "@/helpers/tabela";
import Link from "next/link";
import paths from "@/paths";
import ProdutoDeleteModal from "@/components/produtos/ProdutoDeleteModal";

const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "NOME", uid: "name", sortable: true},
    {name: "CATEGORIA", uid: "category", sortable: true},
    {name: "TIPO", uid: "tipo", sortable: false},
    {name: "FORNECEDOR", uid: "fornecedor", sortable: false},
    {name: "DATA DE ADIÇÃO", uid: "data", sortable: true},
    {name: "PREÇO", uid: "price", sortable: true},
    {name: "STATUS", uid: "status", sortable: true},
    {name: "ESTOQUE", uid: "stock", sortable: true},
    {name: "AÇÕES", uid: "actions"},
];

const statusColorMap: Record<Product['status'], ChipProps['color']> = {
    'Ativo': "success",
    'Em espera': "warning",
    'Desativado': "danger",
};

export type ProdutoEstoqueComRelacoes = Product & {
    supplier: User;
    commodity_type: CommodityType;
};

const EstoqueFiltragemCard: React.FC<{ products: ProdutoEstoqueComRelacoes[] }> = ({products}) => {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<string | string[]>([]);
    const [statusFilter, setStatusFilter] = React.useState<string | string[]>("all");
    const [categoryFilter, setCategoryFilter] = React.useState<string | string[]>("all");
    const [priceFilter, setPriceFilter] = React.useState<string | string[]>(['Desativado']);
    const [stockFilter, setStockFilter] = React.useState<string | string[]>(['Desativado']);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "id",
        direction: "ascending",
    });

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    const rowsPerPage = 5;

    const [currentPage, setCurrentPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = React.useMemo(() => {
        let filteredProducts = [...products];

        if (hasSearchFilter) {
            filteredProducts = filteredProducts.filter((user) =>
                user.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        if (categoryFilter !== "all" && Array.from(categoriesOptions).length !== categoryFilter.length) {
            filteredProducts = filteredProducts.filter((product) =>
                Array.from(categoryFilter).includes(product.category),
            );
        }

        if (statusFilter !== "all" && Array.from(statusOptions).length !== statusFilter.length) {
            filteredProducts = filteredProducts.filter((product) =>
                Array.from(statusFilter).includes(product.status),
            );
        }

        if (stockFilter !== "all" && Array.from(stockOptions).length !== stockFilter.length) {
            filteredProducts = filteredProducts.filter((product) => getFilteredItems(product.stock, stockFilter, stockOptions, ' unidades'));
        }

        if (priceFilter !== "all" && Array.from(priceOptions).length !== priceFilter.length) {
            filteredProducts = filteredProducts.filter((product) => getFilteredItems(product.price, priceFilter, priceOptions, 'R$'));
        }
        return filteredProducts;
    }, [products, filterValue, statusFilter, categoryFilter, priceFilter, stockFilter]);

    const totalPagesQuantity = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [currentPage, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return getSortedProduto(items, sortDescriptor)
    }, [sortDescriptor, items, hasSearchFilter]);

    const renderCell = React.useCallback((product: ProdutoEstoqueComRelacoes, columnKey: string) => {
        switch (columnKey) {
            case "id":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{product.id}</p>
                    </div>);
            case "name":
                return (
                    <Usuario
                        avatarProps={{radius: "lg", src: product.imageUrl!}}
                        name={product.name}
                    >
                        {product.name}
                    </Usuario>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[product.status]} size="sm" variant="flat">
                        {product.status}
                    </Chip>
                );
            case "category":
                return (
                    <Chip className="capitalize" size="sm" variant="flat">
                        {product.category}
                    </Chip>
                );
            case "fornecedor":
                return (
                        <p>
                            {product.supplier.name}
                        </p>
                );
            case "tipo":
                return (
                    <Chip className="capitalize" size="sm" variant="flat">
                        {product.tipoCommoditie}
                    </Chip>
                );
            case "data":
                return (
                    <Chip className="capitalize" size="sm" variant="flat">
                        {new Date(product.createdAt).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        })}
                    </Chip>
                );
            case "price":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{`R\$ ${product.price}`}</p>
                    </div>);
            case "stock":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{`${product.stock} UN`}</p>
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
                            <Link href={`${paths.editProduto(product.id.toString())}`}><EditIcon/></Link>
                          </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Deletar Produto">
                          <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon onClick={() =>{setSelectedProductId(product.id); onOpen();}}/>
                          </span>
                        </Tooltip>
                    </div>
                );
            default:
                return <h1>Implementar</h1>;
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
                <TabelaTopContent setCategoryFilter={setCategoryFilter}
                                  categoryFilter={categoryFilter} filterValue={filterValue}
                                  setStatusFilter={setStatusFilter} onClear={onClear}
                                  onSearchChange={onSearchChange} statusFilter={statusFilter} priceFilter={priceFilter}
                                  setPriceFilter={setPriceFilter} stockFilter={stockFilter}
                                  setStockFilter={setStockFilter} hasSearchFilter={hasSearchFilter}
                                  itemsLenght={products.length}/>
            </div>
            <Table
                isHeaderSticky
                bottomContentPlacement="outside"
                bottomContent={<TabelaBottomContent
                    currentPage={currentPage} setCurrentPage={setCurrentPage}
                    filteredItemsLength={filteredItems.length}
                    totalPagesQuantity={totalPagesQuantity}
                    hasSearchFilter={hasSearchFilter} selectedKeys={selectedKeys}/>}
                selectionMode="multiple"
                onSelectionChange={keys => setSelectedKeys([...keys as unknown as string[]])}
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
                <TableBody className={'min-h-96 h-96 max-h-96'} emptyContent={"Nenhum produtos encontrado"} items={sortedItems as ProdutoEstoqueComRelacoes[]}>
                    {(product: ProdutoEstoqueComRelacoes) => (
                        <TableRow key={product.id}>
                            {
                                columns.map((column) => (
                                    <TableCell key={column.uid}>
                                        {renderCell(product, column.uid)}
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
