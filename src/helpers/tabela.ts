import type {Cultura} from "@prisma/client";
import {SortDescriptor} from "@heroui/react";
import {IFilterable} from "@/models/estoque/filters";
import {NoticiaComCultura} from "@/actions/noticias";
import {PessoaFisJurEnd} from "@/actions/pessoas";
import {EstoqueComCultura} from "@/actions/estoques";
import {UsuarioComEmpresa} from "@/actions/usuarios";

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

export const getSortedUsuario = (items: UsuarioComEmpresa[], sortDescriptor: SortDescriptor) => {
    return [...items].sort((a: UsuarioComEmpresa, b: UsuarioComEmpresa) => {
        const first = a.nome;
        const second = b.nome;

        const cmp = first! < second! ? -1 : first! > second! ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
}

export const getSortedEstoque = (items: EstoqueComCultura[], sortDescriptor: SortDescriptor) => {
    return [...items].sort((a: EstoqueComCultura, b: EstoqueComCultura) => {
        const first = a.produto;
        const second = b.produto;

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
    return [...items].sort((a: PessoaFisJurEnd, b: PessoaFisJurEnd) => {
        const first = a.pessoaFisica?.nome ?? a.pessoaJuridica?.razaoSocial;
        const second = b.pessoaFisica?.nome ?? b.pessoaJuridica?.razaoSocial;

        const cmp = first! < second! ? -1 : first! > second! ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
};

export const getSortedNoticia = (items: NoticiaComCultura[], sortDescriptor: SortDescriptor) => {

    return [...items].sort((a: NoticiaComCultura, b: NoticiaComCultura) => {
        const first = a[sortDescriptor.column as keyof NoticiaComCultura];
        const second = b[sortDescriptor.column as keyof NoticiaComCultura];

        const cmp = first! < second! ? -1 : first! > second! ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
}
