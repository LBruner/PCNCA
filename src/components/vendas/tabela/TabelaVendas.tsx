'use client';

import React, {Dispatch, SetStateAction, useState} from "react";
import {
    DateValue,
    RangeValue,
    SortDescriptor,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {Chip} from "@nextui-org/chip";
import VendasTabelaBottomContent from "@/components/vendas/vendas-tabela-bottom-content";
import {getPublicacaoData} from "@/helpers/noticia/criacao/criar-noticia";
import VendasTabelaTopContent from "@/components/vendas/vendas-tabela-top-content";
import {VendasAgrupadas} from "@/actions/vendas";
import {User} from "@nextui-org/user";
import {formatToBrazilianCurrency} from "@/helpers";
import {FilterCollection} from "@/models/shared/FilterCollection";

const columns = [
    {name: "CLIENTE", uid: "cliente", sortable: false},
    {name: "DATA", uid: "data", sortable: false},
    {name: "PRODUTOS", uid: "produtos", sortable: false},
    {name: "QUANT. UNITÁRIA", uid: "quantidadeUnitaria", sortable: false},
    {name: "VALOR UNITÁRIO", uid: "vrUnitario", sortable: false},
    {name: "QUANT. GERAL", uid: "quantidadeGeral", sortable: false},
    {name: "VALOR TOTAL", uid: "vrTotal", sortable: false},
];

interface TabelaVendasProps {
    vendas: VendasAgrupadas[][],
    clientesFilterCollection: FilterCollection[];
    produtosFilterCollection: FilterCollection[];
    produtosFilter: string | string[];
    setProdutosFilter: Dispatch<SetStateAction<string | string[]>>;
}

const TabelaVendas: React.FC<TabelaVendasProps> = (
    {
        vendas,
        clientesFilterCollection,
        produtosFilterCollection,
        setProdutosFilter,
        produtosFilter,
    }) => {
    const [filterValue, setFilterValue] = React.useState("");
    const [clientesFilter, setClientesFilter] = React.useState<string | string[]>("all");
    const [dateRange, setDateRange] = useState<RangeValue<DateValue>>();
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "id",
        direction: "ascending",
    });

    const hasSearchFilter = Boolean(filterValue);

    const rowsPerPage = 5;

    const [currentPage, setCurrentPage] = React.useState(1);

    const filteredItems = React.useMemo(() => {
        let filteredVendas = [...vendas];

        if (hasSearchFilter) {
            filteredVendas = vendas.filter(sale => sale[0].venda.estoques.some(item => {
                return item.estoque.produto.toLowerCase().includes(filterValue.toLowerCase());
            }));
        }

        if (clientesFilter !== "all" && Array.from(clientesFilterCollection).length !== clientesFilter.length) {
            let newFilteredVendas = [];

            for (let venda of filteredVendas) {
                let nestedFilteredVendas = [];
                for (let nestedVenda of venda) {
                    if (nestedVenda.venda.pessoas[0].pessoa.pessoaJuridica?.razaoSocial == clientesFilter) {
                        nestedFilteredVendas.push(nestedVenda);
                    }
                }
                if (nestedFilteredVendas.length > 0) {
                    newFilteredVendas.push(nestedFilteredVendas);
                }
            }

            filteredVendas = newFilteredVendas;
        }

        if (produtosFilter !== "all" && Array.from(produtosFilterCollection).length !== produtosFilter.length) {
            let newFilteredVendas = [];

            for (let venda of filteredVendas) {
                let nestedFilteredVendas = [];
                for (let nestedVenda of venda) {
                    for (let produtos of nestedVenda.venda.estoques) {
                        if (produtos.estoque.produto == produtosFilter) {
                            nestedFilteredVendas.push(nestedVenda);
                        }
                    }
                }
                if (nestedFilteredVendas.length > 0) {
                    newFilteredVendas.push(nestedFilteredVendas);
                }
            }

            filteredVendas = newFilteredVendas;
        }

        if (dateRange) {
            filteredVendas = filteredVendas.filter((venda) => {
                const productDate = new Date(venda[0].venda.dataVenda).toISOString().split('T')[0];
                const filteredInitialDate = new Date(dateRange.start.year, dateRange.start.month - 1, dateRange.start.day).toISOString().split('T')[0];
                const filteredEndingDate = new Date(dateRange.end.year, dateRange.end.month - 1, dateRange.end.day).toISOString().split('T')[0];
                return productDate >= filteredInitialDate && productDate <= filteredEndingDate;
            });
        }

        return filteredVendas;
    }, [vendas, filterValue, produtosFilter,clientesFilter, dateRange, hasSearchFilter]);

    const totalPagesQuantity = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [currentPage, filteredItems, rowsPerPage]);

    const renderCell = React.useCallback((venda: VendasAgrupadas[], columnKey: string) => {
        switch (columnKey) {
            case "cliente":
                return (
                    <User
                        avatarProps={{radius: "lg", size: 'lg', src: venda[0].venda.pessoas[0].pessoa.imagemLink!}}
                        name={venda[0].venda.pessoas[0].pessoa.pessoaJuridica?.razaoSocial}
                        description={<p>{venda[0].venda.pessoas[0].pessoa.email}</p>}
                    >
                    </User>
                );
            case "vrTotal":
                return (
                    <p>{`${formatToBrazilianCurrency(venda[0].venda.valorVenda)}`}</p>
                );
            case "data":
                return (
                    <Chip className="capitalize" size="sm" variant="flat">
                        <p>{getPublicacaoData(true, venda[0].venda.dataVenda.toString())}</p>
                    </Chip>
                );
            case "produtos":
                return (
                    <div className="flex gap-4 flex-col">
                        {venda[0].venda.estoques.map((estoque) => (
                            <p>{`${estoque.estoque.produto}`}</p>
                        ))}
                    </div>);
            case "vrUnitario":
                return (
                    <div className="flex gap-4 flex-col">
                        {venda[0].venda.estoques.map((estoque) => (
                            <p>{`${formatToBrazilianCurrency(estoque.estoque.preco)}`}</p>
                        ))}
                    </div>);
            case "quantidadeUnitaria":
                return (
                    <div className="flex gap-4 flex-col">
                        {venda.map((venda) => <p>{venda.valorAlter} unidade(s)</p>)}
                    </div>);
            case "quantidadeGeral":
                return (
                    <div className="flex flex-col">
                        <p>{venda[0].venda.quantidadeVenda} unidade(s)</p>
                    </div>);
            default:
                return <h1>IMPLEMENTAR</h1>;
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
            <div className={'bg-white rounded-md p-4 mb-4 shadow-md'}>
                <VendasTabelaTopContent
                    clientesFilter={clientesFilter}
                    setClientesFilter={setClientesFilter}
                    clientesFilterCollection={clientesFilterCollection}
                    datesRange={dateRange!}
                    setDatesRange={setDateRange}
                    hasSearchFilter={hasSearchFilter}
                    filterValue={filterValue}
                    onClear={onClear}
                    onSearchChange={onSearchChange}
                    itemsLenght={vendas.length}
                produtosFilter={produtosFilter}
                    setProdutosFilter={setProdutosFilter}
                    produtosFilterCollection={produtosFilterCollection}
                />
            </div>
            <Table
                isStriped={true}
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
                    wrapper: "max-h-2/4 min-h-[25rem] h-[33rem]",
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
                           items={[...items]}>
                    {(sale: VendasAgrupadas[]) => (
                        <TableRow key={sale[0].venda.id}>
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


export default TabelaVendas;
