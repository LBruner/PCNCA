'use client';

import React, {useEffect, useState} from "react";
import {
    addToast,
    SortDescriptor,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
    useDisclosure,
    User as Usuario
} from "@heroui/react";
import {Chip} from "@heroui/chip";
import {DeleteIcon, EditIcon} from "@heroui/shared-icons";
import TabelaEstoqueBottomContent from "@/components/estoque/tabela/TabelaEstoqueBottomContent";
import {getFilteredItems, getSortedProduto} from "@/helpers/tabela";
import Link from "next/link";
import paths from "@/paths";
import ItemDeleteModal, {DeletingItemModalSettings} from "@/components/produtos/ItemDeleteModal";
import {deletarProduto} from "@/actions/produto";
import {FilterCollection} from "@/models/shared/FilterCollection";
import TabelaEstoquesTopContent from "@/components/estoque/tabela/TabelaEstoqueTopContent";
import {ProdutoEstoqueComRelacoes} from "@/actions/estoques";
import {priceOptions, stockOptions} from "@/models/estoque/filters";
import {formatToBrazilianCurrency} from "@/helpers";

const columns = [
    {name: "PRODUTO", uid: "nome", sortable: true},
    {name: "CATEGORIA", uid: "categoria", sortable: false},
    {name: "TIPO", uid: "tipo", sortable: false},
    {name: "DATA DE ADIÇÃO", uid: "data", sortable: false},
    {name: "STATUS", uid: "status", sortable: false},
    {name: "PREÇO", uid: "preco", sortable: false},
    {name: "ESTOQUE", uid: "quantidade", sortable: false},
    {name: "AÇÕES", uid: "actions", sortable: true},
];

interface TabelaEstoqueProps {
    products: ProdutoEstoqueComRelacoes[],
    categoriesCollection: FilterCollection[]
}

const TabelaEstoque: React.FC<TabelaEstoqueProps> = ({products, categoriesCollection}) => {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set());
    const [statusFilter, setStatusFilter] = React.useState<string | string[]>("all");
    const [categoryFilter, setCategoryFilter] = React.useState<string | string[]>("all");
    const [priceFilter, setPriceFilter] = React.useState<string | string[]>(['Desativado']);
    const [stockFilter, setStockFilter] = React.useState<string | string[]>(['Desativado']);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "id",
        direction: "ascending",
    });
    const [isShowingToast, setIsShowingToast] = useState<boolean>(false);

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    const rowsPerPage = 6;
    const [currentPage, setCurrentPage] = React.useState(1);
    const hasSearchFilter = Boolean(filterValue);

    useEffect(() => {
        if (isShowingToast) {
            setTimeout(() => {
                setIsShowingToast(false)
            }, 5000)
        }
    }, [isShowingToast]);

    const filteredItems = React.useMemo(() => {
        let filteredProducts = [...products];

        if (hasSearchFilter) {
            filteredProducts = filteredProducts.filter((estoque) =>
                estoque.estoque.produto.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        if (categoryFilter !== "all" && Array.from(categoriesCollection).length !== categoryFilter.length) {
            filteredProducts = filteredProducts.filter((product) => {
                    return Array.from(categoryFilter).includes(product.estoque.categoriaId?.nome!);
                }
            );
        }

        if (statusFilter !== "all") {
            filteredProducts = filteredProducts.filter((product) => {
                const statusMap = {
                    'Ativo': true,
                    'Inativo': false
                };

                return Array.from(statusFilter).some((status) => {
                    return product.estoque.ativo === statusMap[status as keyof typeof statusMap];
                });
            });
        }

        if (stockFilter !== "all" && Array.from(stockOptions).length !== stockFilter.length) {
            filteredProducts = filteredProducts.filter((product) => getFilteredItems(product.estoque.quantidade, stockFilter, stockOptions, ' unidades'));
        }

        if (priceFilter !== "all" && Array.from(priceOptions).length !== priceFilter.length) {
            filteredProducts = filteredProducts.filter((product) => getFilteredItems(product.estoque.preco, priceFilter, priceOptions, 'R$'));
        }

        return filteredProducts;
    }, [products, filterValue, statusFilter, categoryFilter, priceFilter, stockFilter, hasSearchFilter, categoriesCollection]);

    const totalPagesQuantity = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [currentPage, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return getSortedProduto(items, sortDescriptor)
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((product: ProdutoEstoqueComRelacoes, columnKey: string) => {
        switch (columnKey) {
            case "nome":
                return (
                    <Usuario
                        avatarProps={{radius: "lg", size: 'lg', src: product.estoque.imagemLink!}}
                        name={product.estoque.produto}
                    >
                        {product.estoque.produto}
                    </Usuario>
                );
            case "categoria":
                return (
                    <Chip className="capitalize" size="sm" variant="flat">
                        {product.estoque.categoriaId?.nome}
                    </Chip>
                );
            case "tipo":
                return (
                    <Chip className="capitalize" color={product.estoque.tipo == 'A' ? 'success' : 'warning'} size="sm"
                          variant="flat">
                        {product.estoque.tipo == 'A' ? 'Agrícola' : 'Pecuária'}
                    </Chip>
                );
            case "status":
                return (
                    <Chip classNames={{base: 'border-none'}} className="capitalize"
                          color={product.estoque.ativo ? 'success' : 'danger'} size="sm"
                          variant="dot">
                        {product.estoque.ativo ? 'Ativo' : 'Inativo'}
                    </Chip>
                );
            case "data":
                return (
                    <p>
                        {new Date(product.dataAlter).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        })}
                    </p>
                );
            case "preco":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{formatToBrazilianCurrency(product.estoque.preco)}</p>
                    </div>);
            case "quantidade":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{`${product.estoque.quantidade}`}</p>
                    </div>);
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-2">
                        <Tooltip content="Editar Produto">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <Link href={paths.editProduto(product.id.toString())}><EditIcon/></Link>
                            </span>
                        </Tooltip>
                        <Tooltip isDisabled={!product.estoque.ativo} color="danger" content="Deletar Produto">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon className={`${!product.estoque.ativo ? 'opacity-25 text-gray-300' : ''}`} onClick={() => {
                                    if (!product.estoque.ativo) return;
                                    setSelectedKeys(new Set())
                                    setSelectedProductId(product.id);
                                    onOpen();
                                }}/>
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return <h1>Implementar</h1>;
        }
    }, [onOpen]);

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

    const itemDeleteModalSettings: DeletingItemModalSettings = {
        title: 'Excluir/Inativar Estoque',
        text: 'Tem certeza que deseja excluir este estoque? Caso ele tenha sido utilizado em vendas, ele será inativado..',
        actionFn: deletarProduto,
        isOpen: isOpen,
        onClose: onClose,
    }


    return (
        <div className={'w-11/12'}>
            <ItemDeleteModal itemId={selectedProductId} settings={itemDeleteModalSettings}/>
            <div className={'bg-white dark:bg-customDarkFooter rounded-md p-4 mb-4 shadow-md'}>
                <TabelaEstoquesTopContent
                    products={products}
                    selectedItems={Array.from(selectedKeys)} // Convert Set to array
                    categoriesOptions={categoriesCollection}
                    setCategoryFilter={setCategoryFilter}
                    categoryFilter={categoryFilter} filterValue={filterValue}
                    setStatusFilter={setStatusFilter} onClear={onClear}
                    onSearchChange={onSearchChange} statusFilter={statusFilter} priceFilter={priceFilter}
                    setPriceFilter={setPriceFilter} stockFilter={stockFilter}
                    setStockFilter={setStockFilter} hasSearchFilter={hasSearchFilter}
                    itemsLenght={products.length}
                />
            </div>
            <Table
                aria-label={' '}
                isHeaderSticky
                bottomContentPlacement="outside"
                bottomContent={
                    <TabelaEstoqueBottomContent
                        showPagination={true}
                        currentPage={currentPage} setCurrentPage={setCurrentPage}
                        filteredItemsLength={filteredItems.length}
                        totalPagesQuantity={totalPagesQuantity}
                        hasSearchFilter={hasSearchFilter}
                        selectedKeys={Array.from(selectedKeys)} // Convert Set to array
                    />
                }
                selectionMode="multiple"
                selectedKeys={selectedKeys} // Pass Set directly
                onSelectionChange={(keys) => {
                    const keysSet = new Set(keys); // Convert Selection to Set
                    const lastSelectedKey = Array.from(keysSet).pop(); // Get the last selected key

                    const product = products.find((item) => item.id === parseInt(lastSelectedKey!.toString()!));

                    if (product && product.estoque.ativo) {
                        setSelectedKeys(keysSet as any); // Update state with the new Set
                    } else {
                        keysSet.delete(lastSelectedKey!); // Remove the last selected key if the product is not available

                        if (!isShowingToast) {
                            addToast({
                                color: 'danger',
                                title: "Produto inativado",
                                description: "Não é possível selecionar esse produto",
                                timeout: 5000,
                                onClose: () => setIsShowingToast(false),
                            });
                            setIsShowingToast(true);
                        }


                        setSelectedKeys(new Set(keysSet) as any); // Update state with the filtered Set
                    }
                }}
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
                classNames={{
                    wrapper: "max-h-2/4 min-h-[25rem] h-[34rem]",
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
                <TableBody className={'h-auto'} emptyContent={"Nenhum estoque disponível"}
                           items={sortedItems as ProdutoEstoqueComRelacoes[]}>
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

export default TabelaEstoque;