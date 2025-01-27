import type {Cultura, Sale} from "@prisma/client";
import {SortDescriptor} from "@nextui-org/react";
import {IFilterable} from "@/models/estoque/filters";
import {VendasComProdutos} from "@/models/vendas";
import {NoticiaComAutorCultura} from "@/actions/noticias";
import {PessoaFisJurEnd} from "@/actions/pessoas";
import {ProdutoEstoqueComRelacoes} from "@/actions/estoques";

type FilterableItem = string | string[];

export const getFilteredItems = (productField: number, stockFilter: FilterableItem, filterOption: IFilterable[], symbolToReplace: string) => {
    let stockMatch = false;

    Array.from(stockFilter).forEach((filter) => {
        const option = filterOption.find(option => option.uid === filter);

        if (option) {
            if (option.uid === "Desativado") {
                stockMatch = true;
            }
            if (option.uid === "Sem estoque") {
                stockMatch = stockMatch || (productField === 0);
            } else {
                const [min, max] = option.name.split(' - ').map(stock => {
                        return stock.includes('Acima de') ? 500 : parseInt(stock.replace(symbolToReplace, ''), 10);
                    }
                );
                if (max) {
                    stockMatch = stockMatch || (productField >= min && productField <= max);
                } else {
                    stockMatch = stockMatch || (productField >= min);
                }
            }
        }
    });
    return stockMatch;
}

export const getSortedProduto = (items: ProdutoEstoqueComRelacoes[], sortDescriptor: SortDescriptor) => {
    return [...items].sort((a: ProdutoEstoqueComRelacoes, b: ProdutoEstoqueComRelacoes) => {
        const first = a.estoque.produto;
        const second = b.estoque.produto;

        const cmp = first! < second! ? -1 : first! > second! ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
}

export const getSortedCategoria = (items: Cultura[], sortDescriptor: SortDescriptor) => {
    return [...items].sort((a: Cultura, b: Cultura) => {
        const first = a.nome;
        const second = b.nome;

        const cmp = first! < second! ? -1 : first! > second! ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
}

export const getSortedPessoas = (items: PessoaFisJurEnd[], sortDescriptor: SortDescriptor) => {
    console.log(sortDescriptor);
    return [...items].sort((a: PessoaFisJurEnd, b: PessoaFisJurEnd) => {
        const first = a.pessoaFisica?.nome ?? a.pessoaJuridica?.razaoSocial;
        const second = b.pessoaFisica?.nome ?? b.pessoaJuridica?.razaoSocial;

        const cmp = first! < second! ? -1 : first! > second! ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
};

export const getSortedNoticia = (items: NoticiaComAutorCultura[], sortDescriptor: SortDescriptor) => {
    if (sortDescriptor.column == 'author') {
        return [...items].sort((a: NoticiaComAutorCultura, b: NoticiaComAutorCultura) => {
            const first = a.autor.nomeAutor;
            const second = b.autor.nomeAutor;

            const cmp = first! < second! ? -1 : first! > second! ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }

    return [...items].sort((a: NoticiaComAutorCultura, b: NoticiaComAutorCultura) => {
        const first = a[sortDescriptor.column as keyof NoticiaComAutorCultura];
        const second = b[sortDescriptor.column as keyof NoticiaComAutorCultura];

        const cmp = first! < second! ? -1 : first! > second! ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
}


type SortableFields = keyof Pick<Sale, 'id' | 'customerName' | 'date' | 'status' | 'totalPrice'>;


//TODO: quem sabe usar uma interface aqui
export const getSortedVenda = (items: VendasComProdutos[], sortDescriptor: SortDescriptor): VendasComProdutos[] => {
    return [...items].sort((a: VendasComProdutos, b: VendasComProdutos) => {
        const column = sortDescriptor.column as SortableFields;
        let first = a[column];
        let second = b[column];

        if (first == null) return sortDescriptor.direction === "descending" ? 1 : -1;
        if (second == null) return sortDescriptor.direction === "descending" ? -1 : 1;

        if (typeof first === 'string' && typeof second === 'string') {
            first = first.toLowerCase();
            second = second.toLowerCase();
        } else if (first instanceof Date && second instanceof Date) {
            return sortDescriptor.direction === "descending"
                ? second.getTime() - first.getTime()
                : first.getTime() - second.getTime();
        } else if (typeof first === 'number' && typeof second === 'number') {
            return sortDescriptor.direction === "descending"
                ? second - first
                : first - second;
        } else {
            first = String(first);
            second = String(second);
        }

        return sortDescriptor.direction === "descending"
            ? second.localeCompare(first)
            : first.localeCompare(second);
    });
};
