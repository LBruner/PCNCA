'use client';

import React, {useEffect, useState} from "react";
import {
    addToast,
    Image,
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
import {DeleteIcon, EditIcon, EyeIcon} from "@heroui/shared-icons";
import TabelaEstoqueBottomContent from "@/components/estoque/tabela/TabelaEstoqueBottomContent";
import {getSortedCategoria} from "@/helpers/tabela";
import AdmCategoriasTableTopContent from "@/components/adm/categorias/adm-categorias-table-top-content";
import CustomModal from "@/components/UI/CustomModal";
import CulturaCard from "@/components/noticias/culturas/cultura-card";
import ItemDeleteModal, {DeletingItemModalSettings} from "@/components/produtos/ItemDeleteModal";
import AdmCreateCategoryModal, {CreateItemModalSettings} from "@/components/adm/categorias/adm-create-category-modal";
import {CulturaComNoticia, deletarCultura} from "@/actions/culturas";

const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "TÍTULO", uid: "titulo", sortable: true},
    {name: "IMAGEM", uid: "imagem", sortable: false},
    {name: "URL", uid: "url", sortable: false},
    {name: "DESCRIÇÃO", uid: "description", sortable: false},
    {name: "AÇÕES", uid: "actions"},
];

interface AdmCategoriasTable {
    culturas: CulturaComNoticia[]
}

const AdmCategoriasTable: React.FC<AdmCategoriasTable> = ({culturas}) => {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedCultura, setSelectedCultura] = React.useState<CulturaComNoticia | null>();
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "id",
        direction: "ascending",
    });

    const previewModal = useDisclosure();
    const createModal = useDisclosure();
    const editModal = useDisclosure();
    const deleteModal = useDisclosure();

    const rowsPerPage = 6;

    const [currentPage, setCurrentPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = React.useMemo(() => {
        let filteredProducts = [...culturas];

        if (hasSearchFilter) {
            filteredProducts = filteredProducts.filter((cultura) =>
                cultura.nome.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        return filteredProducts;
    }, [culturas, filterValue, hasSearchFilter]);

    const [isShowingToast, setIsShowingToast] = useState<boolean>(false);

    useEffect(() => {
        if (isShowingToast) {
            setTimeout(() => {
                setIsShowingToast(false)
            }, 5000)
        }
    }, [isShowingToast]);

    const totalPagesQuantity = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [currentPage, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return getSortedCategoria(items, sortDescriptor)
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((categoria: CulturaComNoticia, columnKey: string) => {
        const podeExcluir = categoria.noticias == null || categoria.noticias?.length == 0;

        switch (columnKey) {
            case "id":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{categoria.culturaId}</p>
                    </div>);
            case "titulo":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small ">{categoria.nome}</p>
                    </div>
                )
            case "description":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small ">{categoria.descricao}</p>
                    </div>
                )
            case "url":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small ">{categoria.imagemLink}</p>
                    </div>
                );
            case "imagem":
                return (
                    <Image
                        width={200}
                        shadow={'sm'}
                        height={100}
                        alt={categoria.nome}
                        src={categoria.imagemLink!}
                    />
                );
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-2">
                        <Tooltip content="Ver Categoria">
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EyeIcon onClick={() => {
                                setSelectedCultura(categoria);
                                previewModal.onOpen();
                            }}/>
                          </span>
                        </Tooltip>
                        <Tooltip content="Editar Categoria">
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                              <EditIcon onClick={() => {
                                  setSelectedCultura(categoria);
                                  editModal.onOpen();
                              }}/>
                          </span>
                        </Tooltip>
                        <Tooltip isDisabled={!podeExcluir} color="danger" content="Excluir Cultura">
                        <span className="text-lg text-danger cursor-pointer active:opacity-75">
                                <DeleteIcon
                                    className={`${!podeExcluir ? 'opacity-50 text-gray-500' : ''}`}
                                    onClick={() => {
                                        if (!podeExcluir) {
                                            if (!isShowingToast) {
                                                addToast({
                                                    color: 'danger',
                                                    title: "Ação não permitida",
                                                    description: "Essa cultura foi utilizada em notícias e não pode ser excluída.",
                                                    timeout: 5000,
                                                    onClose: () => setIsShowingToast(false),
                                                });
                                                setIsShowingToast(true);
                                            }
                                            return;
                                        }

                                        setSelectedCultura(categoria);
                                        deleteModal.onOpen();
                                    }}/>
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return <h1>Implementar</h1>;
        }
    }, [deleteModal, editModal, previewModal, isShowingToast]);


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
        title: 'Excluir Cultura',
        text: `Tem certeza que deseja excluir a cultura: ${selectedCultura?.nome}? Essa ação não pode ser desfeita...`,
        actionFn: deletarCultura.bind(null, selectedCultura?.culturaId ?? 0),
        isOpen: deleteModal.isOpen,
        onClose: deleteModal.onClose,
    }

    const itemCreateModalSettings: CreateItemModalSettings = {
        title: 'Adicionar Cultura',
        text: `Preencha abaixo os campos da nova cultura.`,
        actionText: 'Adicionar',
        isOpen: createModal.isOpen,
        onClose: createModal.onClose,
    }

    const itemEditModalSettings: CreateItemModalSettings = {
        cultura: selectedCultura!,
        title: 'Editar Cultura',
        text: `Atualize abaixo os campos da cultura.`,
        actionText: 'Editar',
        isOpen: editModal.isOpen,
        onClose: editModal.onClose,
    }

    return (
        <div className={'ml-64 mt-6 w-9/12'}>
            <CustomModal
                size={'2xl'} title={'Visualizar Categoria'} text={''} action={previewModal.onClose}
                actionText={'Fechar'} isOpen={previewModal.isOpen} onClose={previewModal.onClose}
                modalDisplayBody={
                    <CulturaCard
                        title={selectedCultura?.nome || ''}
                        id={selectedCultura?.culturaId || 0}
                        image={selectedCultura?.imagemLink || ''}
                    />
                } actionButtonColor={'primary'}
            />
            <ItemDeleteModal
                itemId={selectedCultura?.culturaId ?? 0}
                settings={itemDeleteModalSettings}
            />
            <AdmCreateCategoryModal settings={itemCreateModalSettings}/>
            <AdmCreateCategoryModal settings={itemEditModalSettings}/>
            <div className={'bg-white dark:bg-customDarkFooter rounded-md p-4 mb-4 shadow-md'}>

                <AdmCategoriasTableTopContent
                    openCreateCategoryModal={createModal.onOpen}
                    filterValue={filterValue} onClear={onClear}
                    onSearchChange={onSearchChange}
                    hasSearchFilter={hasSearchFilter}
                    itemsLenght={culturas.length}/>
            </div>
            <Table
                className={'mt-4'}
                aria-label={' '}
                isHeaderSticky={false}
                bottomContentPlacement="inside"
                topContentPlacement={'inside'}
                bottomContent={<TabelaEstoqueBottomContent
                    showPagination={true}
                    currentPage={currentPage} setCurrentPage={setCurrentPage}
                    totalPagesQuantity={totalPagesQuantity}
                    hasSearchFilter={hasSearchFilter}/>}
                selectionMode="none"
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
                classNames={{
                    wrapper: "min-h-[20rem] h-auto",
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
                <TableBody className={'h-auto'} emptyContent={"Nenhuma categoria encontrada"}
                           items={sortedItems as CulturaComNoticia[]}>
                    {(cultura: CulturaComNoticia) => (
                        <TableRow key={cultura.culturaId}>
                            {
                                columns.map((column) => (
                                    <TableCell key={column.uid}>
                                        {renderCell(cultura, column.uid)}
                                    </TableCell>
                                ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdmCategoriasTable;
