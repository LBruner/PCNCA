'use client';

import React from "react";
import {
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
import type {CategoriaPessoa, Pessoa} from '@prisma/client';
import {Chip} from "@nextui-org/chip";
import {DeleteIcon, EditIcon} from "@nextui-org/shared-icons";
import TabelaBottomContent from "@/components/estoque/tabela/tabela-bottom-content";
import {getSortedPessoas} from "@/helpers/tabela";
import {FilterCollection} from "@/models/shared/FilterCollection";
import TabelaPessoasTopContent from "@/components/pessoas/tabela/tabela-pessoas-top-content";
import CreatePessoaModal, {CreatePessoaModalSettings} from "@/components/pessoas/create_pessoa_modal";
import ItemDeleteModal, {DeletingItemModalSettings} from "@/components/produtos/ItemDeleteModal";
import {deletePessoa} from "@/actions/pessoas";

const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "NOME", uid: "nome", sortable: true},
    {name: "EMAIL", uid: "email", sortable: false},
    {name: "CATEGORIA", uid: "categoria", sortable: false},
    {name: "AÇÕES", uid: "actions"},
];

export type PessoasComCategoria = Pessoa & {
    categoria: CategoriaPessoa;
};

interface PessoasTableProps {
    pessoas: PessoasComCategoria[];
    categoryFilterCollection: FilterCollection[];
}

const PessoasTable: React.FC<PessoasTableProps> = ({pessoas, categoryFilterCollection}) => {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedPessoa, setSelectedPessoa] = React.useState<PessoasComCategoria | null>();

    const [categoryFilter, setCategoryFilter] = React.useState<string | string[]>("all");
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "id",
        direction: "ascending",
    });

    const createModal = useDisclosure();
    const editModal = useDisclosure();
    const deleteModal = useDisclosure();

    const rowsPerPage = 7;

    const [currentPage, setCurrentPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = React.useMemo(() => {
        let filteredPessoas = [...pessoas];

        if (hasSearchFilter) {
            filteredPessoas = filteredPessoas.filter((pessoa) =>
                pessoa.nome.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        if (categoryFilter !== "all" && Array.from(categoryFilterCollection).length !== categoryFilter.length) {
            filteredPessoas = filteredPessoas.filter((pessoa) => {
                    return categoryFilter.includes(pessoa.categoria.titulo.toString());
                }
            );
        }

        return filteredPessoas;
    }, [pessoas, filterValue, categoryFilter, categoryFilterCollection, hasSearchFilter]);

    const totalPagesQuantity = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [currentPage, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return getSortedPessoas(items, sortDescriptor)
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((pessoa: PessoasComCategoria, columnKey: string) => {
        switch (columnKey) {
            case "id":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{pessoa.id}</p>
                    </div>);
            case "nome":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small ">{pessoa.nome}</p>
                    </div>
                )
            case "email":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small ">{pessoa.email}</p>
                    </div>
                )
            case "categoria":
                return (
                    <Chip className="capitalize" size="sm" variant="flat">
                        {pessoa.categoria.titulo}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-2">
                        <Tooltip content="Editar Notícia">
                            <EditIcon onClick={() => {
                                setSelectedPessoa(pessoa);
                                editModal.onOpen();
                            }}/>
                        </Tooltip>
                        <Tooltip color="danger" content="Excluir Notícia">
                          <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon onClick={() => {
                                setSelectedPessoa(pessoa);
                                deleteModal.onOpen();
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

    const itemDeleteModalSettings: DeletingItemModalSettings = {
        title: 'Excluir Pessoa',
        text: 'Tem certeza que deseja excluir esta pessoa? Essa ação não pode ser desfeita...',
        deletingFunction: deletePessoa,
        isOpen: deleteModal.isOpen,
        onClose: deleteModal.onClose,
    }

    const itemCreateModalSettings: CreatePessoaModalSettings = {
        title: 'Adicionar Pessoa',
        text: `Preencha abaixo os campos da nova pessoa.`,
        actionText: 'Adicionar',
        isOpen: createModal.isOpen,
        onClose: createModal.onClose,
        categorias: categoryFilterCollection,
    }

    const itemEditModalSettings: CreatePessoaModalSettings = {
        pessoa: selectedPessoa!,
        title: 'Editar Pessoa',
        text: `Atualize abaixo os campos da pessoa.`,
        actionText: 'Editar',
        isOpen: editModal.isOpen,
        onClose: editModal.onClose,
        categorias: categoryFilterCollection
    }

    return (
        <div className={'mt-12 w-9/12'}>
            <CreatePessoaModal settings={itemCreateModalSettings}/>
            <CreatePessoaModal settings={itemEditModalSettings}/>
            <ItemDeleteModal
                itemId={selectedPessoa?.id ?? 0}
                settings={itemDeleteModalSettings}
            />
            <Table
                isHeaderSticky={false}
                topContent={<TabelaPessoasTopContent
                    onOpenCreatePessoaModal={createModal.onOpen}
                    categoryColletion={categoryFilterCollection}
                    setCategoryFilter={setCategoryFilter}
                    filterValue={filterValue} onClear={onClear}
                    onSearchChange={onSearchChange}
                    categoryFilter={categoryFilter}
                    hasSearchFilter={hasSearchFilter}
                    itemsLenght={pessoas.length}/>}
                topContentPlacement={'inside'}
                bottomContentPlacement="outside"
                bottomContent={<TabelaBottomContent
                    currentPage={currentPage} setCurrentPage={setCurrentPage}
                    filteredItemsLength={filteredItems.length}
                    totalPagesQuantity={totalPagesQuantity}
                    hasSearchFilter={hasSearchFilter} selectedKeys={[]}/>}
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
                           items={sortedItems as PessoasComCategoria[]}>
                    {(noticia: PessoasComCategoria) => (
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

export default PessoasTable;
