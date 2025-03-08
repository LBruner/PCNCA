'use client';

import React, {useState} from "react";
import {
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
} from "@heroui/react";
import {Chip} from "@heroui/chip";
import {DeleteIcon, EditIcon, EyeIcon} from "@heroui/shared-icons";
import TabelaEstoqueBottomContent from "@/components/estoque/tabela/TabelaEstoqueBottomContent";
import {getSortedNoticia} from "@/helpers/tabela";
import Link from "next/link";
import paths from "@/paths";
import ItemDeleteModal, {DeletingItemModalSettings} from "@/components/produtos/ItemDeleteModal";
import AdmNoticiasTableTopContent from "@/components/adm/noticias/adm-noticias-table-top-content";
import {FilterCollection} from "@/models/shared/FilterCollection";
import {deletarNoticia, NoticiaComAutorCultura} from "@/actions/noticias";

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

interface AdmNoticiasProps {
    noticias: NoticiaComAutorCultura[];
    authorFilterCollection: FilterCollection[];
    categoryFilterCollection: FilterCollection[];
}

const AdmNoticiasTable: React.FC<AdmNoticiasProps> = ({noticias, authorFilterCollection, categoryFilterCollection}) => {
    const [filterValue, setFilterValue] = React.useState("");
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
                noticia.titulo.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        if (authorFilter !== "all" && Array.from(authorFilterCollection).length !== authorFilter.length) {
            filteredProducts = filteredProducts.filter((noticia) =>
                Array.from(authorFilter).includes(noticia.autor.nomeAutor),
            )
        }

        if (categoryFilter !== "all" && Array.from(categoryFilterCollection).length !== categoryFilter.length) {
            filteredProducts = filteredProducts.filter((noticia) => {
                    return Array.from(categoryFilter).includes(noticia.cultura.nome);
                }
            );
        }

        if (dateRange) {
            filteredProducts = filteredProducts.filter((noticia) => {
                const productDate = new Date(noticia.dataPubli).toISOString().split('T')[0];
                const filteredInitialDate = new Date(dateRange.start.year, dateRange.start.month - 1, dateRange.start.day).toISOString().split('T')[0];
                const filteredEndingDate = new Date(dateRange.end.year, dateRange.end.month - 1, dateRange.end.day).toISOString().split('T')[0];
                return productDate >= filteredInitialDate && productDate <= filteredEndingDate;
            });
        }

        return filteredProducts;
    }, [noticias, filterValue, authorFilter, categoryFilter, dateRange, authorFilterCollection, categoryFilterCollection, hasSearchFilter]);

    const totalPagesQuantity = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [currentPage, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return getSortedNoticia(items, sortDescriptor)
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((noticia: NoticiaComAutorCultura, columnKey: string) => {
        switch (columnKey) {
            case "id":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{noticia.notId}</p>
                    </div>);
            case "titulo":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small ">{noticia.titulo}</p>
                    </div>
                )
            case "author":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small ">{noticia.autor.nomeAutor}</p>
                    </div>
                )
            case "categoria":
                return (
                    <Chip className="capitalize" size="sm" variant="flat">
                        {noticia.cultura.nome}
                    </Chip>
                );
            case "status":
                return (
                    <Chip className="capitalize" color='success' size="sm" variant="flat">
                        Publicado
                    </Chip>
                );
            case "imagem":
                return (
                    <Image
                        width={100}
                        shadow={'sm'}
                        height={50}
                        alt={noticia.titulo}
                        src={noticia.imagemLink!}
                    />
                );
            case "data":
                return (
                    <Chip className="capitalize" size="sm" variant="flat">
                        {new Date(noticia.dataPubli).toLocaleDateString('pt-BR', {
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
                        <Link href={paths.showNoticia(noticia.notId)}>
                            <Tooltip content="Ver Notícia">
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EyeIcon/>
                          </span>
                            </Tooltip>
                        </Link>
                        <Tooltip content="Editar Notícia">
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <Link href={paths.editNoticia(noticia.notId)}><EditIcon/></Link>
                          </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Excluir Notícia">
                          <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon onClick={() => {
                                setSelectedProductId(noticia.notId);
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
        title: 'Excluir Notícia',
        text: 'Tem certeza que deseja excluir esta notícia? Essa ação não pode ser desfeita...',
        actionFn: deletarNoticia,
        isOpen: isOpen,
        onClose: onClose,
    }

    return (
        <div className={'ml-64 mt-12 w-9/12'}>
            <ItemDeleteModal
                itemId={selectedProductId}
                settings={itemDeleteModalSettings}/>
            <Table
                aria-label={' '}
                isHeaderSticky={false}
                topContent={<
                    AdmNoticiasTableTopContent
                    setDatesRange={setDateRange} datesRange={dateRange!}
                    authorFilterCollection={authorFilterCollection}
                    categoryFilterCollection={categoryFilterCollection}
                    setCategoryFilter={setCategoryFilter}
                    authorFilter={authorFilter} filterValue={filterValue}
                    setStatusFilter={setStatusFilter} onClear={onClear}
                    onSearchChange={onSearchChange} statusFilter={statusFilter}
                    categoryFilter={categoryFilter}
                    setAuthorFilter={setAuthorFilter}
                    hasSearchFilter={hasSearchFilter}
                    itemsLenght={noticias.length}/>}
                topContentPlacement={'inside'}
                bottomContentPlacement="outside"
                bottomContent={<TabelaEstoqueBottomContent
                    showPagination={true}
                    currentPage={currentPage} setCurrentPage={setCurrentPage}
                    totalPagesQuantity={totalPagesQuantity}
                    hasSearchFilter={hasSearchFilter}/>}
                selectionMode="none"
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
                classNames={{
                    wrapper: "h-auto",
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
                           items={sortedItems as NoticiaComAutorCultura[]}>
                    {(noticia: NoticiaComAutorCultura) => (
                        <TableRow key={noticia.notId}>
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
