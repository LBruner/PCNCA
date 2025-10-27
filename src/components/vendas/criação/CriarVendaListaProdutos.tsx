import React from "react";
import {ProdutosSelecionados} from "@/app/vendas/criar/page";
import CriarVendaItemProduto from "@/components/vendas/criação/CriarVendaItemProduto";

interface CriarVendaListaProdutosProps {
    estoques: ProdutosSelecionados[];
    changeProductQuantity: (productId: number, newQuantity: number) => void;
    removeProduct: (productId: number) => void;
}

const CriarVendaListaProdutos: React.FC<CriarVendaListaProdutosProps> = (props) => {
    const {estoques, changeProductQuantity, removeProduct} = props;

    return (
        <div className={'flex w-full flex-col gap-12 px-4 mt-8'}>
            {estoques.map((estoque, index) =>
                <CriarVendaItemProduto
                    key={index}
                    estoque={estoque}
                    changeProductQuantity={changeProductQuantity}
                    removeProduct={removeProduct}
                />)
            }
        </div>
    )
}

export default CriarVendaListaProdutos;