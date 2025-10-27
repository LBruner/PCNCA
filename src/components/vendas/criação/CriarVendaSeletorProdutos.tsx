'use client';
import React from "react";
import CriarVendaListaProdutos from "@/components/vendas/criação/CriarVendaListaProdutos";
import {ProdutosSelecionados} from "@/app/vendas/criar/page";
import {formatToBrazilianCurrency} from "@/helpers";
import {Button} from "@heroui/react";

interface CriarVendaSeletorProdutosProps {
    estoques: ProdutosSelecionados[];
    changeProductQuantity: (productId: number, newQuantity: number) => void;
    removeProduct: (productId: number) => void;
    openCheckoutAccordion: () => void;
}

const CriarVendaSeletorProdutos: React.FC<CriarVendaSeletorProdutosProps> = (
    {
        estoques,
        changeProductQuantity,
        removeProduct,
        openCheckoutAccordion
    }) => {
    let subtotal: number = 0;
    estoques.forEach((item) => {
            subtotal = subtotal + (item.quantity * item.preco);
        }
    );

    return (
        <div className={'flex flex-col gap-6 dark:bg-customDarkFooter'}>
            <div className={'w-full flex'}>
                <CriarVendaListaProdutos estoques={estoques} changeProductQuantity={changeProductQuantity}
                                         removeProduct={removeProduct}/>
            </div>
            <div className={'w-full flex flex-col items-end justify-end mr-4 mt-4'}>
                <div className={'w-96 flex justify-between'}>
                    <p className={'font-light text-lg'}>Valor Total</p>
                    <p className={'text-lg tracking-wider'}> {formatToBrazilianCurrency(subtotal)}</p>
                </div>
            </div>
           <div className={'mt-2 w-full flex justify-end'}>
               <Button onPress={openCheckoutAccordion} className={'w-36'} color={'primary'}>
                   Ir para o checkout
               </Button>
           </div>
        </div>
    )
}

export default CriarVendaSeletorProdutos;