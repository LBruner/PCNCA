'use client';

import React, {useState} from "react";
import {
    ChipProps,
    DateValue,
    Image,
    RangeValue,
    SortDescriptor,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
    useDisclosure,
} from "@nextui-org/react";
import type {Article, Author, Category} from '@prisma/client';
import {Chip} from "@nextui-org/chip";
import {DeleteIcon, EditIcon, EyeIcon} from "@nextui-org/shared-icons";
import TabelaBottomContent from "@/components/estoque/tabela/tabela-bottom-content";
import {statusOptions} from "@/models/estoque/filters";
import {getSortedNoticia} from "@/helpers/tabela";
import Link from "next/link";
import paths from "@/paths";
import ItemDeleteModal, {DeleteModalSettings} from "@/components/produtos/ItemDeleteModal";
import AdmNoticiasTableTopContent from "@/components/adm/noticias/adm-noticias-table-top-content";
import {FilterCollection} from "@/models/shared/FilterCollection";
import {deleteNoticia} from "@/actions/noticias";

const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "TÍTULO", uid: "titulo", sortable: false},
    {name: "IMAGEM", uid: "imagem", sortable: false},
    {name: "AUTOR", uid: "author", sortable: true},
    {name: "CATEGORIA", uid: "categoria", sortable: false},
    {name: "DATA DE PUBLICAÇÃO", uid: "data", sortable: false},
    {name: "STATUS", uid: "status", sortable: true},
    {name: "AÇÕES", uid: "actions"},
];

const statusColorMap: Record<Article['status'], ChipProps['color']> = {
    'Publicado': "success",
    'Rascunho': "warning",
};

export type NoticiasComAutorEstoque = Article & {
    author: Author;
    category: Category;
};

interface AdmNoticiasProps {
    noticias: NoticiasComAutorEstoque[];
    authorFilterCollection: FilterCollection[];
    categoryFilterCollection: FilterCollection[];
}

const AdmNoticiasTable: React.FC<AdmNoticiasProps> = ({noticias, authorFilterCollection, categoryFilterCollection}) => {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<string | string[]>([]);
    const [statusFilter, setStatusFilter] = React.useState<string | string[]>("all");
    const [authorFilter, setAuthorFilter] = React.useState<string | string[]>("all");
    const [categoryFilter, setCategoryFilter] = React.useState<string | string[]>("all");
    const [dateRange, setDateRange] = useState<RangeValue<DateValue>>();
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "id",
        direction: "ascending",
    });

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    const rowsPerPage = 7;

    const [currentPage, setCurrentPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = React.useMemo(() => {
        let filteredProducts = [...noticias];

        if (hasSearchFilter) {
            filteredProducts = filteredProducts.filter((noticia) =>
                noticia.title.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        if (authorFilter !== "all" && Array.from(authorFilterCollection).length !== authorFilter.length) {
            filteredProducts = filteredProducts.filter((product) =>
                Array.from(authorFilter).includes(product.author.name),
            )
        }

        if (statusFilter !== "all" && Array.from(statusOptions).length !== statusFilter.length) {
            filteredProducts = filteredProducts.filter((noticia) =>
                Array.from(statusFilter).includes(noticia.status),
            );
        }

        if (categoryFilter !== "all" && Array.from(categoryFilterCollection).length !== categoryFilter.length) {
            filteredProducts = filteredProducts.filter((noticia) => {
                    console.log(categoryFilter)
                    return Array.from(categoryFilter).includes(noticia.category.name);
                }
            );
        }

        if (dateRange) {
            filteredProducts = filteredProducts.filter((noticia) => {
                const productDate = new Date(noticia.publishedAt).toISOString().split('T')[0];
                const filteredInitialDate = new Date(dateRange.start.year, dateRange.start.month - 1, dateRange.start.day).toISOString().split('T')[0];
                const filteredEndingDate = new Date(dateRange.end.year, dateRange.end.month - 1, dateRange.end.day).toISOString().split('T')[0];
                return productDate >= filteredInitialDate && productDate <= filteredEndingDate;
            });
        }

        return filteredProducts;
    }, [noticias, filterValue, statusFilter, authorFilter, categoryFilter, dateRange]);

    const totalPagesQuantity = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [currentPage, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return getSortedNoticia(items, sortDescriptor)
    }, [sortDescriptor, items, hasSearchFilter]);

    const renderCell = React.useCallback((noticia: NoticiasComAutorEstoque, columnKey: string) => {
        switch (columnKey) {
            case "id":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{noticia.id}</p>
                    </div>);
            case "titulo":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small ">{noticia.title}</p>
                    </div>
                )
            case "author":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small ">{noticia.author.name}</p>
                    </div>
                )
            case "categoria":
                return (
                    <Chip className="capitalize" size="sm" variant="flat">
                        {noticia.category.name}
                    </Chip>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[noticia.status]} size="sm" variant="flat">
                        {noticia.status}
                    </Chip>
                );
            case "imagem":
                return (
                    <Image
                        width={100}
                        shadow={'sm'}
                        height={50}
                        alt={noticia.title}
                        src={noticia.imageUrl!}
                    />
                );
            case "data":
                return (
                    <Chip className="capitalize" size="sm" variant="flat">
                        {new Date(noticia.publishedAt).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        })}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-2">
                        <Link href={paths.showNoticia(noticia.id)}>
                            <Tooltip content="Ver Notícia">
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EyeIcon/>
                          </span>
                            </Tooltip>
                        </Link>
                        <Tooltip content="Editar Notícia">
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <Link href={`${paths.editNoticia(noticia.id)}`}><EditIcon/></Link>
                          </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Excluir Notícia">
                          <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon onClick={() => {
                                setSelectedProductId(noticia.id);
                                onOpen();
                            }}/>
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

    const itemDeleteModalSettings: DeleteModalSettings = {
        title: 'Excluir Notícia',
        text: 'Tem certeza que deseja excluir esta notícia? Essa ação não pode ser desfeita...',
        deletingFunction: deleteNoticia,
        isOpen: isOpen,
        onClose: onClose,
    }

    return (
        <div className={'ml-64 mt-12 w-9/12'}>
            <ItemDeleteModal itemId={selectedProductId}
                             settings={itemDeleteModalSettings}/>
            <div className={'bg-white rounded-md p-4 mb-4'}>
                <AdmNoticiasTableTopContent setDatesRange={setDateRange} datesRange={dateRange!}
                                            authorFilterCollection={authorFilterCollection}
                                            categoryFilterCollection={categoryFilterCollection}
                                            setCategoryFilter={setCategoryFilter}

                                            authorFilter={authorFilter} filterValue={filterValue}
                                            setStatusFilter={setStatusFilter} onClear={onClear}
                                            onSearchChange={onSearchChange} statusFilter={statusFilter}
                                            categoryFilter={categoryFilter}
                                            setAuthorFilter={setAuthorFilter} hasSearchFilter={hasSearchFilter}
                                            itemsLenght={noticias.length}/>
            </div>
            <Table
                isHeaderSticky={false}
                bottomContentPlacement="outside"
                bottomContent={<TabelaBottomContent
                    currentPage={currentPage} setCurrentPage={setCurrentPage}
                    filteredItemsLength={filteredItems.length}
                    totalPagesQuantity={totalPagesQuantity}
                    hasSearchFilter={hasSearchFilter} selectedKeys={selectedKeys}/>}
                selectionMode="none"
                onSelectionChange={keys => setSelectedKeys([...keys as unknown as string[]])}
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
                classNames={{
                    wrapper: "max-h-2/4 min-h-[30rem] h-[38rem]",
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
                           items={sortedItems as NoticiasComAutorEstoque[]}>
                    {(noticia: NoticiasComAutorEstoque) => (
                        <TableRow key={noticia.id}>
                            {
                                columns.map((column) => (
                                    <TableCell key={column.uid}>
                                        {renderCell(noticia, column.uid)}
                                    </TableCell>
                                ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdmNoticiasTable;
