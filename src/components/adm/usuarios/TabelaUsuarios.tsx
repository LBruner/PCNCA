'use client';

import React, {useState} from "react";
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
    User as Usuario
} from "@heroui/react";
import {Chip} from "@heroui/chip";
import TabelaEstoqueBottomContent from "@/components/estoque/tabela/TabelaEstoqueBottomContent";
import {getSortedUsuario} from "@/helpers/tabela";
import ItemDeleteModal, {DeletingItemModalSettings} from "@/components/produtos/ItemDeleteModal";
import {
    deletarUsuario,
    desativarUsuario,
    reativarUsuario,
    resetarSenha,
    UsuarioComEmpresaEstoque
} from "@/actions/usuarios";
import TabelaUsuarioTopContent from "@/components/adm/usuarios/TabelaUsuarioTopContent";
import {GrCheckbox, GrCheckboxSelected} from "react-icons/gr";
import {RiLockPasswordLine, RiUserFollowLine} from "react-icons/ri";
import {FilterCollection} from "@/models/shared/FilterCollection";
import {LuUserMinus, LuUserRoundX} from "react-icons/lu";

const columns = [
    {name: "USUARIO", uid: "usuario", sortable: true},
    {name: "CPF", uid: "cpf", sortable: false},
    {name: "EMPRESA", uid: "empresa", sortable: false},
    {name: "ATIVO", uid: "ativado", sortable: false},
    {name: "TROCAR SENHA", uid: "resetSenha", sortable: true},
    {name: "AÇÕES", uid: "actions", sortable: false},
];

interface TabelaUsuariosProps {
    usuarios: UsuarioComEmpresaEstoque[],
    empresasFilterCollection: FilterCollection[],
}

const TabelaUsuarios: React.FC<TabelaUsuariosProps> = ({usuarios, empresasFilterCollection}) => {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<string | string[]>([]);
    const [empresaFilter, setEmpresaFilter] = React.useState<string | string[]>("all");
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "id",
        direction: "ascending",
    });

    const resetPasswordModal = useDisclosure();
    const deleteUserModal = useDisclosure();
    const disableUserModal = useDisclosure();
    const enableUserModal = useDisclosure();

    const [selectedUsuario, setSelectedUsuario] = useState<string | null>(null);

    const rowsPerPage = 7;

    const [currentPage, setCurrentPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = React.useMemo(() => {
        let filteredProducts = [...usuarios];

        if (hasSearchFilter) {
            filteredProducts = filteredProducts.filter((usuario) =>
                usuario.nome.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        if (empresaFilter !== "all" && Array.from(empresasFilterCollection).length !== empresaFilter.length) {
            filteredProducts = filteredProducts.filter((usuario) => {
                    return Array.from(empresaFilter).includes(usuario.empresa?.nome!);
                }
            );
        }

        return filteredProducts;
    }, [usuarios, filterValue, empresaFilter, hasSearchFilter, empresasFilterCollection]);

    const totalPagesQuantity = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [currentPage, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return getSortedUsuario(items, sortDescriptor)
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((usuario: UsuarioComEmpresaEstoque, columnKey: string) => {
        switch (columnKey) {
            case "usuario":
                return (
                    <Usuario
                        avatarProps={{radius: "lg", size: 'lg', src: usuario.imagemLink!}}
                        name={usuario.nome}
                        description={usuario.email}
                    >
                        {usuario.email}
                    </Usuario>
                );
            case "cpf":
                return (
                    <p>{usuario.cpf}</p>
                );
            case "ativado":
                return (
                    <Chip className="capitalize" color={!usuario.inativado ? 'success' : 'danger'} size="sm"
                          variant="flat">
                        {usuario.inativado == true ? 'Não' : 'Sim'}
                    </Chip>
                );
            case "resetSenha":
                return (
                    <div>
                        {usuario.alterarSenha == true ? <GrCheckboxSelected size={25} color={'grey'}/> :
                            <GrCheckbox size={25} color={'grey'}/>}
                    </div>
                );
            case "empresa":
                return (
                    <p>
                        {usuario.empresa?.nome}
                    </p>
                );
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-2">
                        {!usuario.alterarSenha && <Tooltip content="Trocar Senha">
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <RiLockPasswordLine onClick={() => {
                                setSelectedUsuario(usuario.id);
                                resetPasswordModal.onOpen();
                            }}/>
                          </span>
                        </Tooltip>}
                        {!usuario.admin && usuario.historicos.length == 0 &&
                            <Tooltip color="danger" content="Desativar Usuário">
                          <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <LuUserRoundX  onClick={() => {
                                setSelectedUsuario(usuario.id);
                                deleteUserModal.onOpen();
                            }}/>
                          </span>
                            </Tooltip>
                        }
                        {!usuario.admin && usuario.historicos.length > 0 && !usuario.inativado && <Tooltip color="warning" content="Inativar Usuário">
                          <span className="text-lg text-warning cursor-pointer active:opacity-50">
                            <LuUserMinus onClick={() => {
                                setSelectedUsuario(usuario.id);
                                disableUserModal.onOpen();
                            }}/>
                          </span>
                        </Tooltip>}
                        {!usuario.admin && usuario.inativado && <Tooltip color="success" content="Reativar Usuário">
                          <span className="text-lg text-success cursor-pointer active:opacity-50">
                            <RiUserFollowLine onClick={() => {
                                setSelectedUsuario(usuario.id);
                                enableUserModal.onOpen();
                            }}/>
                          </span>
                        </Tooltip>}
                    </div>
                );
            default:
                return <h1>Implementar</h1>;
        }
    }, [deleteUserModal, resetPasswordModal, disableUserModal, enableUserModal]);


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

    const resetPasswordModalSettings: DeletingItemModalSettings = {
        title: 'Reiniciar Senha',
        text: 'Tem certeza que resetar a senha do usuário selecionado? \nEle poderá escolher uma nova assim que tentar fazer um novo login.',
        actionFn: () => resetarSenha(selectedUsuario!),
        isOpen: resetPasswordModal.isOpen,
        onClose: resetPasswordModal.onClose,
    }

    const itemDesativarUsuarioModalSettings: DeletingItemModalSettings = {
        title: 'Inativar Usuário',
        text: 'Ele estará incapacitado de fazer vendas ou adicionar produtos ao estoque.',
        actionFn: async () => {
            await desativarUsuario(selectedUsuario!)
        },
        isOpen: disableUserModal.isOpen,
        onClose: disableUserModal.onClose,
    }

    const itemAtivarUsuarioModalSettings: DeletingItemModalSettings = {
        title: 'Reativar Usuário',
        text: 'Ele voltará a poder realizar vendas e adicionar produtos ao estoque.',
        actionFn: async () => {
            await reativarUsuario(selectedUsuario!)
        },
        isOpen: enableUserModal.isOpen,
        onClose: enableUserModal.onClose,
    }

    const itemDeleteUsuarioModalSettings: DeletingItemModalSettings = {
        title: 'Deletar Usuário',
        text: 'Essa ação não pode ser revertida',
        actionFn: async () => {
            await deletarUsuario(selectedUsuario!)
        },
        isOpen: deleteUserModal.isOpen,
        onClose: deleteUserModal.onClose,
    }

    return (
        <div className={'w-11/12'}>
            <ItemDeleteModal itemId={selectedUsuario} settings={itemDesativarUsuarioModalSettings}/>
            <ItemDeleteModal itemId={selectedUsuario} settings={resetPasswordModalSettings}/>
            <ItemDeleteModal itemId={selectedUsuario} settings={itemDeleteUsuarioModalSettings}/>
            <ItemDeleteModal itemId={selectedUsuario} settings={itemAtivarUsuarioModalSettings}/>
            <div className={'bg-white dark:bg-customDarkFooter rounded-md p-4 mb-4 shadow-md'}>
                <TabelaUsuarioTopContent
                    products={usuarios}
                    selectedItems={selectedKeys}
                    empresasFilterCollection={empresasFilterCollection}
                    setEmpresaFilter={setEmpresaFilter} onClear={onClear}
                    onSearchChange={onSearchChange} empresaFilter={empresaFilter}
                    hasSearchFilter={hasSearchFilter}
                    itemsLenght={usuarios.length}
                    filterValue={filterValue}/>
            </div>
            <Table
                aria-label={' '}
                isHeaderSticky
                bottomContentPlacement="outside"
                bottomContent={
                    <TabelaEstoqueBottomContent
                        showPagination={true}
                        currentPage={currentPage} setCurrentPage={setCurrentPage}
                        totalPagesQuantity={totalPagesQuantity}
                        hasSearchFilter={hasSearchFilter}/>
                }
                selectionMode="none"
                onSelectionChange={keys => setSelectedKeys([...keys as unknown as string[]])}
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
                classNames={{
                    wrapper: "max-h-2/4 min-h-[37rem] h-full",
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
                <TableBody className={'h-auto'} emptyContent={"Nenhum usuário disponível"}
                           items={sortedItems as UsuarioComEmpresaEstoque[]}>
                    {(usuario: UsuarioComEmpresaEstoque) => (
                        <TableRow key={usuario.id}>
                            {
                                columns.map((column) => (
                                    <TableCell key={column.uid}>
                                        {renderCell(usuario, column.uid)}
                                    </TableCell>
                                ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default TabelaUsuarios;
