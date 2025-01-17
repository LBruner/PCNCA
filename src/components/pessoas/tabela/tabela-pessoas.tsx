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
import type {Pessoa} from '@prisma/client';
import {Chip} from "@nextui-org/chip";
import {DeleteIcon, EditIcon, EyeIcon} from "@nextui-org/shared-icons";
import TabelaEstoqueBottomContent from "@/components/estoque/tabela/TabelaEstoqueBottomContent";
import {getSortedPessoas} from "@/helpers/tabela";
import {FilterCollection} from "@/models/shared/FilterCollection";
import TabelaPessoasTopContent from "@/components/pessoas/tabela/tabela-pessoas-top-content";
import ItemDeleteModal, {DeletingItemModalSettings} from "@/components/produtos/ItemDeleteModal";
import {deletePessoa} from "@/actions/pessoas";
import {User} from "@nextui-org/user";
import PerfilModal from "@/components/configuracoes/perfil-modal";
import Link from "next/link";
import paths from "@/paths";
import {formatPhoneNumber} from "@/helpers";

const columns = [
    {name: "PESSOA", uid: "pessoa", sortable: true},
    {name: "TIPO", uid: "tipo", sortable: false},
    {name: "CATEGORIA", uid: "categoria", sortable: false},
    {name: "CONTATO", uid: "contato", sortable: false},
    {name: "ENDEREÇO", uid: "endereco", sortable: false},
    {name: "LOCALIZAÇÃO", uid: "localizacao", sortable: false},
    {name: "AÇÕES", uid: "actions"},
];

interface PessoasTableProps {
    pessoas: Pessoa[];
    categoryFilterCollection: FilterCollection[];
    tipoFilterCollection: FilterCollection[];
}

const PessoasTable: React.FC<PessoasTableProps> = ({pessoas, categoryFilterCollection,tipoFilterCollection}) => {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedPessoa, setSelectedPessoa] = React.useState<Pessoa | null>();

    const [categoryFilter, setCategoryFilter] = React.useState<string | string[]>("all");
    const [tipoFilter, setTipoPessoaFilter] = React.useState<string | string[]>("all");
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "id",
        direction: "ascending",
    });

    const addPessoaModal = useDisclosure();
    const deleteModal = useDisclosure();

    const rowsPerPage = 100;

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
                    return categoryFilter.includes(pessoa.categoria.toString());
                }
            );
        }

        if (tipoFilter !== "all" && Array.from(tipoFilterCollection).length !== tipoFilter.length) {
            filteredPessoas = filteredPessoas.filter((pessoa) => {
                    return tipoFilter.includes(pessoa.tipo!);
                }
            );
        }

        return filteredPessoas;
    }, [pessoas, filterValue, categoryFilter, categoryFilterCollection, tipoFilterCollection, tipoFilter, hasSearchFilter]);

    const totalPagesQuantity = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [currentPage, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return getSortedPessoas(items, sortDescriptor)
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((pessoa: Pessoa, columnKey: string) => {
        switch (columnKey) {
            case "pessoa":
                return (
                    <User
                        avatarProps={{radius: "sm", size: 'lg', src: pessoa.imagem}}
                        description={pessoa.email}
                        name={pessoa.nome}
                    >
                        {pessoa.email}
                    </User>
                )
            case "tipo":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small ">{pessoa.tipo == '' ? 'Pessoa Física' : pessoa.tipo}</p>
                    </div>
                );
            case "categoria":
                return (
                    <Chip className="capitalize" color={`${pessoa.categoria == 'Física' ? 'success' : 'warning'}`}
                          size="sm" variant="flat">
                        {pessoa.categoria}
                    </Chip>
                );
            case "contato":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small ">{formatPhoneNumber(pessoa.contato)}</p>
                    </div>
                );
            case "localizacao":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{pessoa.cidade}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{pessoa.estado}</p>
                    </div>
                );
            case "endereco":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small ">{pessoa.endereco}</p>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-2">
                        <Tooltip content="Ver Detalhes">
                          <span className="text-lg text-default-700 cursor-pointer">
                            <EyeIcon onClick={() => {
                                setSelectedPessoa(pessoa);
                                addPessoaModal.onOpen();
                            }} color={'black'}/>
                          </span>
                        </Tooltip>
                        <Tooltip content="Editar Pessoa">
                            <Link href={paths.editPessoa(pessoa.id)}>
                           <span className="text-lg text-default-700 cursor-pointer">
                              <EditIcon onClick={() => {
                                  setSelectedPessoa(pessoa);
                              }}/>
                           </span>
                            </Link>
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

    return (
        <div className={'w-11/12'}>
            <PerfilModal user={selectedPessoa! as any} isOpen={addPessoaModal.isOpen} onClose={addPessoaModal.onClose}/>
            <ItemDeleteModal
                itemId={selectedPessoa?.id ?? 0}
                settings={itemDeleteModalSettings}
            />
            <Table
                isStriped={true}
                isHeaderSticky={false}
                topContent={<TabelaPessoasTopContent
                    categoryColletion={categoryFilterCollection}
                    setCategoryFilter={setCategoryFilter}
                    categoryFilter={categoryFilter}
                    tipoPessoaColletion={tipoFilterCollection}
                    tipoPessoaFilter={tipoFilter}
                    setTipoPessoaFilter={setTipoPessoaFilter}
                    filterValue={filterValue} onClear={onClear}
                    onSearchChange={onSearchChange}
                    hasSearchFilter={hasSearchFilter}
                    itemsLenght={pessoas.length}/>}
                topContentPlacement={'inside'}
                bottomContentPlacement="outside"
                bottomContent={<TabelaEstoqueBottomContent
                    currentPage={currentPage} setCurrentPage={setCurrentPage}
                    filteredItemsLength={filteredItems.length}
                    totalPagesQuantity={totalPagesQuantity}
                    hasSearchFilter={hasSearchFilter} selectedKeys={[]}/>}
                selectionMode="none"
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
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
                <TableBody className={'min-h-96 h-96 max-h-96'} emptyContent={"Nenhuma pessoa encontrada"}
                           items={sortedItems as Pessoa[]}>
                    {(noticia: Pessoa) => (
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
