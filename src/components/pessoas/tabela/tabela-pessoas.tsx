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
} from "@heroui/react";
import {Chip} from "@heroui/chip";
import {DeleteIcon, EditIcon} from "@heroui/shared-icons";
import {getSortedPessoas} from "@/helpers/tabela";
import {FilterCollection} from "@/models/shared/FilterCollection";
import TabelaPessoasTopContent from "@/components/pessoas/tabela/tabela-pessoas-top-content";
import ItemDeleteModal, {DeletingItemModalSettings} from "@/components/produtos/ItemDeleteModal";
import {deletePessoa, PessoaFisJurEnd} from "@/actions/pessoas";
import {User} from "@heroui/user";
import PerfilModal from "@/components/configuracoes/perfil-modal";
import Link from "next/link";
import paths from "@/paths";
import {formatPhoneNumber} from "@/helpers";
import {getFlatPessoa} from "@/helpers/pessoas";

const columns = [
    {name: "PESSOA", uid: "pessoa", sortable: true},
    {name: "TIPO", uid: "tipo", sortable: false},
    {name: "CATEGORIA", uid: "categoria", sortable: false},
    {name: "CONTATO", uid: "contato", sortable: false},
    {name: "LOCALIZAÇÃO", uid: "localizacao", sortable: false},
    {name: "PAIS", uid: "pais", sortable: false},
    {name: "AÇÕES", uid: "actions"},
];

interface PessoasTableProps {
    pessoas: PessoaFisJurEnd[];
    categoryFilterCollection: FilterCollection[];
    tipoFilterCollection: FilterCollection[];
}

const PessoasTable: React.FC<PessoasTableProps> = ({pessoas, categoryFilterCollection, tipoFilterCollection}) => {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedPessoa, setSelectedPessoa] = React.useState<PessoaFisJurEnd | null>();

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
                pessoa.pessoaFisica != null ? pessoa.pessoaFisica.nome.toLowerCase().includes(filterValue.toLowerCase()) : pessoa.pessoaJuridica!.razaoSocial.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        if (categoryFilter !== "all" && Array.from(categoryFilterCollection).length !== categoryFilter.length) {
            filteredPessoas = filteredPessoas.filter((pessoa) => {
                    if (categoryFilter == 'Física') {
                        return pessoa.pessoaFisica != null
                    }
                    if (categoryFilter == 'Jurídica') {
                        return pessoa.pessoaJuridica != null
                    }
                    return pessoa;
                }
            );
        }

        if (tipoFilter !== "all" && Array.from(tipoFilterCollection).length !== tipoFilter.length) {
            filteredPessoas = filteredPessoas.filter((pessoa) => {
                    return tipoFilter.includes(pessoa.categoria.descricao);
                }
            );
        }

        return filteredPessoas;
    }, [pessoas, filterValue, categoryFilter, categoryFilterCollection, tipoFilterCollection, tipoFilter, hasSearchFilter]);

    const items = React.useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [currentPage, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return getSortedPessoas(items, sortDescriptor)
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((pessoa: PessoaFisJurEnd, columnKey: string) => {
        switch (columnKey) {
            case "pessoa":
                return (
                    <User
                        avatarProps={{radius: "sm", size: 'lg', src: pessoa.imagemLink!}}
                        description={pessoa.email}
                        name={pessoa.pessoaFisica?.nome ?? pessoa.pessoaJuridica?.razaoSocial}
                    >
                        {pessoa.email}
                    </User>
                )
            case "tipo":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small ">{pessoa.categoria.descricao}</p>
                    </div>
                );
            case "categoria":
                return (
                    <Chip className="capitalize" color={`${pessoa.pessoaJuridica != null ? 'success' : 'warning'}`}
                          size="sm" variant="flat">
                        {pessoa.pessoaJuridica != null ? 'Jurídica' : 'Física'}
                    </Chip>
                );
            case "contato":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small ">{formatPhoneNumber(pessoa.telefones[0].numero)}</p>
                    </div>
                );
            case "localizacao":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{pessoa.enderecos[0].cidade}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{pessoa.enderecos[0].estado}</p>
                    </div>
                );
            case "pais":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small ">{pessoa.enderecos[0].pais}</p>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-2">
                        {/*<Tooltip content="Ver Detalhes">*/}
                        {/*  <span className="text-lg text-default-700 cursor-pointer">*/}
                        {/*    <EyeIcon onClick={() => {*/}
                        {/*        setSelectedPessoa(pessoa);*/}
                        {/*        addPessoaModal.onOpen();*/}
                        {/*    }} color={'black'}/>*/}
                        {/*  </span>*/}
                        {/*</Tooltip>*/}
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
    }, [addPessoaModal, deleteModal]);


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
        actionFn: deletePessoa,
        isOpen: deleteModal.isOpen,
        onClose: deleteModal.onClose,
    }

    return (
        <div className={'w-11/12'}>
            <PerfilModal user={getFlatPessoa(selectedPessoa!)} isOpen={addPessoaModal.isOpen} onClose={addPessoaModal.onClose}/>
            <ItemDeleteModal
                itemId={selectedPessoa?.id ?? 0}
                settings={itemDeleteModalSettings}
            />
            <Table
                aria-label={' '}
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
                topContentPlacement={'outside'}
                bottomContentPlacement="outside"

                selectionMode="none"
                sortDescriptor={sortDescriptor}
                classNames={{
                    wrapper: "max-h-2/4 min-h-[37rem] h-full",
                }}
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
                <TableBody className={'h-full'} emptyContent={"Nenhuma pessoa encontrada"}
                           items={sortedItems}>
                    {(pessoa: PessoaFisJurEnd) => (
                        <TableRow key={pessoa.id}>
                            {
                                columns.map((column) => (
                                    <TableCell key={column.uid}>
                                        {renderCell(pessoa, column.uid)}
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
