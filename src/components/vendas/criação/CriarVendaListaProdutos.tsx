import React from "react";
import {ProductSale} from "@/app/vendas/criar/page";
import CriarVendaItemProduto from "@/components/vendas/criação/CriarVendaItemProduto";

interface CriarVendaListaProdutosProps {
    produtos: ProductSale[];
    changeProductQuantity: (productId: number, newQuantity: number) => void;
    removeProduct: (productId: number) => void;
}

const CriarVendaListaProdutos: React.FC<CriarVendaListaProdutosProps> = (props) => {
    const {produtos, changeProductQuantity, removeProduct} = props;

    return (
        <div className={'flex flex-col gap-6 px-4 mt-8'}>
            {produtos.map((produto) =>
                <CriarVendaItemProduto
                    produto={produto}
                    changeProductQuantity={changeProductQuantity}
                    removeProduct={removeProduct}
                />)
            }
        </div>
    )
}

export default CriarVendaListaProdutos;