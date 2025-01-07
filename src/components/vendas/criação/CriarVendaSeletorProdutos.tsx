'use client';
import React, {useState} from "react";
import {Accordion, AccordionItem, Divider} from "@nextui-org/react";
import {ProductSale} from "@/app/vendas/criar/page";
import CriarVendaListaProdutos from "@/components/vendas/criação/CriarVendaListaProdutos";
import {BsChevronLeft} from "react-icons/bs";

interface CriarVendaSeletorProdutosProps {
    produtos: ProductSale[];
    changeProductQuantity: (productId: number, newQuantity: number) => void;
    removeProduct: (productId: number) => void;
}

const CriarVendaSeletorProdutos: React.FC<CriarVendaSeletorProdutosProps> = ({produtos,changeProductQuantity, removeProduct}) => {
    const [seletorProdutosActive, setSeletorProdutosActive] = useState(true);

    return (
        <div className={'w-4/6 flex'}>
                <Accordion defaultExpandedKeys={["1"]} variant={'splitted'} className={''} >
                    <AccordionItem indicator={<BsChevronLeft size={24} color={'blue'}/>} subtitle={'Escolha e gerencie seus produtos'} classNames={{title: 'text-3xl', subtitle: 'text-lg', heading: 'px-2'}} key="1" className={'font-semibold py-4'} title="Seleção de Produtos">
                        <Divider/>
                        <CriarVendaListaProdutos
                            produtos={produtos} changeProductQuantity={changeProductQuantity} removeProduct={removeProduct}
                        />
                    </AccordionItem>
                    <AccordionItem indicator={<BsChevronLeft size={24} color={'blue'}/>} subtitle={'Finalize a transferência'} classNames={{title: 'text-3xl', subtitle: 'text-lg', heading: 'px-2'}} key="2" className={'font-semibold py-4'} title="Checkout">
                        <Divider/>
                        <CriarVendaListaProdutos produtos={produtos} changeProductQuantity={changeProductQuantity} removeProduct={removeProduct}/>
                    </AccordionItem>
                </Accordion>
        </div>
    )
}

export default CriarVendaSeletorProdutos;