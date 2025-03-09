export interface IFilterable {
    name: string;
    uid: string;
}

export const statusOptions: IFilterable[] = [
    {name: "Ativo", uid: "Ativo"},
    {name: "Inativo", uid: "Inativo"},
];

export const priceOptions: IFilterable[] = [
    {name: "R$0 - R$50", uid: "R$0 - R$50"},
    {name: "R$50 - R$100", uid: "R$50 - R$100"},
    {name: "R$100 - R$200", uid: "R$100 - R$200"},
    {name: "R$200 - R$500", uid: "R$200 - R$500"},
    {name: "Acima de R$500", uid: "Acima de R$500"},
    {name: "Desativado", uid: "Desativado"},
];

export const stockOptions: IFilterable[] = [
    {name: "0 - 50 unidades", uid: "0 - 50 unidades"},
    {name: "51 - 100 unidades", uid: "51 - 100 unidades"},
    {name: "101 - 200 unidades", uid: "101 - 200 unidades"},
    {name: "201 - 500 unidades", uid: "201 - 500 unidades"},
    {name: "Acima de 500 unidades", uid: "Acima de 500 unidades"},
    {name: "Sem estoque", uid: "Sem estoque"},
    {name: "Desativado", uid: "Desativado"},
];