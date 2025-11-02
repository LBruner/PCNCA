'use client';

import React, {Dispatch, SetStateAction} from "react";
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
} from "@heroui/react";
import {Chip} from "@heroui/chip";
import VendasTabelaBottomContent from "@/components/vendas/vendas-tabela-bottom-content";
import {getPublicacaoData} from "@/helpers/noticia/criacao/criar-noticia";
import {VendasAgrupadas} from "@/actions/vendas";
import {User} from "@heroui/user";
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
    clientesFilter: string | string[];
    setClientesFilter: Dispatch<SetStateAction<string | string[]>>;
    dateRange: RangeValue<DateValue>;
    setDatesRange: (range: RangeValue<DateValue>) => void;
}

const TabelaVendas: React.FC<TabelaVendasProps> = (
    {
        vendas,
        clientesFilterCollection,
        clientesFilter,
    }) => {
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "id",
        direction: "ascending",
    });

    const rowsPerPage = 5;

    const [currentPage, setCurrentPage] = React.useState(1);

    const filteredItems = React.useMemo(() => {
        let filteredVendas = [...vendas];

        if (clientesFilter !== "all" && Array.from(clientesFilterCollection).length !== clientesFilter.length) {
            let newFilteredVendas = [];
            for (let venda of filteredVendas) {
                let nestedFilteredVendas = [];
                for (let nestedVenda of venda) {
                    const pessoa = nestedVenda.venda.pessoas[0]?.pessoa;
                    if (pessoa) {
                        const razaoSocial = pessoa.pessoaJuridica?.razaoSocial;
                        const nome = pessoa.pessoaFisica?.nome;
                        if (razaoSocial && clientesFilter.includes(razaoSocial) || nome && clientesFilter.includes(nome)) {
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

        return filteredVendas;
    }, [vendas, clientesFilter, clientesFilterCollection]);

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
                        avatarProps={{radius: "lg", size: 'lg', src: venda[0].venda.usuario.imagemLink!}}
                        name={venda[0].venda.usuario.nome!}
                        description={<p>{venda[0].venda.usuario.email!}</p>}
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
                            <p key={estoque.id}>{`${estoque.estoque.produto}`}</p>
                        ))}
                    </div>);
            case "vrUnitario":
                return (
                    <div className="flex gap-4 flex-col">
                        {venda[0].venda.estoques.map((estoque) => (
                            <p key={estoque.id}>{`${formatToBrazilianCurrency(estoque.estoque.preco)}`}</p>
                        ))}
                    </div>);
            case "quantidadeUnitaria":
                return (
                    <div className="flex gap-4 flex-col">
                        {venda[0].venda.estoques.map((estoque) => {
                            // Find the matching HistoricoEstoque record for this product
                            const matchingHistorico = venda.find(
                                (historico) => historico.estoqueId === estoque.estoque.id
                            );
console.log(estoque)
                            return (
                                <p key={estoque.id}>
                                    {matchingHistorico ? matchingHistorico.valorAlter : 0} unidade(s)
                                </p>
                            );
                        })}
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

    return (
        <div className={'w-5/6 mt-8'}>
            <Table
                aria-label={' '}
                isStriped={true}
                isHeaderSticky
                // key={`${sortDescriptor.column}-${sortDescriptor.direction}`}
                topContentPlacement={'outside'}
                bottomContentPlacement="outside"
                bottomContent={<VendasTabelaBottomContent
                    currentPage={currentPage} setCurrentPage={setCurrentPage}
                    filteredItemsLength={filteredItems.length}
                    totalPagesQuantity={totalPagesQuantity}/>}
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
                    {(sale: VendasAgrupadas[]) => {
                        console.log(sale);
                        return (
                        <TableRow key={Math.random()}>
                            {
                                columns.map((column) => (
                                    <TableCell key={column.uid}>
                                        {renderCell(sale, column.uid)}
                                    </TableCell>
                                ))}
                        </TableRow>
                    )
                    }}
                </TableBody>
            </Table>
        </div>
    );
};

export default TabelaVendas;