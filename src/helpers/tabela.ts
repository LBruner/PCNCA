import type {Product, Sale} from "@prisma/client";
import {SortDescriptor} from "@nextui-org/react";
import {IFilterable} from "@/models/estoque/filters";
import {NoticiasComAutorEstoque} from "@/components/adm/noticias/adm-noticias-table";
import {VendasComProdutos} from "@/models/vendas";

type FilterableItem = string | string[];

export const getFilteredItems = (productField: number, stockFilter:FilterableItem, filterOption: IFilterable[], symbolToReplace: string) => {
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
                const [min, max] = option.name.split(' - ').map(stock =>
                    {
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

export const getSortedProduto = (items: Product[], sortDescriptor: SortDescriptor) => {
    return [...items].sort((a: Product, b: Product) => {
        const first = a[sortDescriptor.column as keyof Product];
        const second = b[sortDescriptor.column as keyof Product];

        const cmp = first! < second! ? -1 : first! > second! ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
}

export const getSortedNoticia = (items: NoticiasComAutorEstoque[], sortDescriptor: SortDescriptor) => {
    if(sortDescriptor.column == 'author'){
        return [...items].sort((a: NoticiasComAutorEstoque, b: NoticiasComAutorEstoque) => {
            const first = a.author.name;
            const second = b.author.name;

            const cmp = first! < second! ? -1 : first! > second! ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }

    return [...items].sort((a: NoticiasComAutorEstoque, b: NoticiasComAutorEstoque) => {
        const first = a[sortDescriptor.column as keyof NoticiasComAutorEstoque];
        const second = b[sortDescriptor.column as keyof NoticiasComAutorEstoque];

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
