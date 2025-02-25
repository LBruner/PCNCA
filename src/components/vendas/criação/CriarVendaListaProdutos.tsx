import React from "react";
import {ProdutosSelecionados} from "@/app/vendas/criar/page";
import CriarVendaItemProduto from "@/components/vendas/criação/CriarVendaItemProduto";

interface CriarVendaListaProdutosProps {
    produtos: ProdutosSelecionados[];
    changeProductQuantity: (productId: number, newQuantity: number) => void;
    removeProduct: (productId: number) => void;
}

const CriarVendaListaProdutos: React.FC<CriarVendaListaProdutosProps> = (props) => {
    const {produtos, changeProductQuantity, removeProduct} = props;

    return (
        <div className={'flex w-full flex-col gap-12 px-4 mt-8'}>
            {produtos.map((produto, index) =>
                <CriarVendaItemProduto
                    key={index}
                    produto={produto}
                    changeProductQuantity={changeProductQuantity}
                    removeProduct={removeProduct}
                />)
            }
        </div>
    )
}

export default CriarVendaListaProdutos;