import type {Product} from "@prisma/client";
import {SortDescriptor} from "@nextui-org/react";
import {IFilterable} from "@/models/estoque/filters";

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

export const getSortedItem = (items: Product[], sortDescriptor: SortDescriptor) => {
    return [...items].sort((a: Product, b: Product) => {
        const first = a[sortDescriptor.column as keyof Product];
        const second = b[sortDescriptor.column as keyof Product];

        const cmp = first! < second! ? -1 : first! > second! ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
}