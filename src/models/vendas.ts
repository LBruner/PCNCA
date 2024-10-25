import type {Product, Sale} from "@prisma/client";

export type VendasComProdutos = Sale & {
    saleItems: Sale & {
        product: Product;
    }[];
}
