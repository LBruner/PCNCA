'use client';
import React from "react";
import CriarVendaListaProdutos from "@/components/vendas/criação/CriarVendaListaProdutos";
import {ProdutosSelecionados} from "@/app/vendas/criar/page";
import {formatToBrazilianCurrency} from "@/helpers";
import {Button} from "@nextui-org/react";

interface CriarVendaSeletorProdutosProps {
    produtos: ProdutosSelecionados[];
    changeProductQuantity: (productId: number, newQuantity: number) => void;
    removeProduct: (productId: number) => void;
    openCheckoutAccordion: () => void;
}

const CriarVendaSeletorProdutos: React.FC<CriarVendaSeletorProdutosProps> = (
    {
        produtos,
        changeProductQuantity,
        removeProduct,
        openCheckoutAccordion
    }) => {
    let subtotal: number = 0;
    produtos.forEach((item) => {
            subtotal = subtotal + (item.quantity * item.estoque.preco);
        }
    );

    return (
        <div className={'flex flex-col gap-6'}>
            <div className={'w-full flex'}>
                <CriarVendaListaProdutos produtos={produtos} changeProductQuantity={changeProductQuantity}
                                         removeProduct={removeProduct}/>
            </div>
            <div className={'w-full flex flex-col items-end justify-end mr-4 mt-4'}>
                <div className={'w-96 flex justify-between'}>
                    <p className={'font-light text-lg'}>Subtotal</p>
                    <p className={'text-lg tracking-wider'}> {formatToBrazilianCurrency(subtotal)}</p>
                </div>
                <div className={'w-96 flex justify-between'}>
                    <p className={'font-light text-lg'}>Disconto</p>
                    <p className={'text-lg tracking-wider'}> {formatToBrazilianCurrency(0)}</p>
                </div>
                <div className={'w-96 flex justify-between'}>
                    <p className={'font-light text-lg'}>Valor Total</p>
                    <p className={'text-lg tracking-wider'}> {formatToBrazilianCurrency(0)}</p>
                </div>
            </div>
           <div className={'mt-2 w-full flex justify-end'}>
               <Button onClick={openCheckoutAccordion} className={'w-36'} color={'primary'}>
                   Ir para o checkout
               </Button>
           </div>
        </div>
    )
}

export default CriarVendaSeletorProdutos;