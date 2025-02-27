'use client';

import React, {useEffect, useState} from "react";
import {pegaProduto} from "@/actions/produto";
import {Accordion, AccordionItem, Divider, Spinner} from "@heroui/react";
import CriarVendaSeletorProdutos from "@/components/vendas/criação/CriarVendaSeletorProdutos";
import {ProdutosSelecionados} from "@/app/vendas/criar/page";
import {CategoriaPessoaComEmpresa} from "@/actions/clientes";
import {FormaPagamento} from "@prisma/client";
import {BsChevronLeft} from "react-icons/bs";
import CriarVendaCheckout from "@/components/vendas/criação/CriarVendaCheckout";
import {criarVenda} from "@/actions/vendas";
import NoData from "@/components/UI/NoData";
import {useRouter} from "next/navigation";
import paths from "@/paths";

interface CriarVendaFormProps {
    clientes: CategoriaPessoaComEmpresa[];
    formasPagamento: FormaPagamento[];
}

export interface VendaComDados {
    vendas: ProdutosSelecionados[],
    clienteId: number;
    formaPagamento: number;
}


const CriarVendaForm: React.FC<CriarVendaFormProps> = ({clientes, formasPagamento}) => {
    const [selectedProducts, setSelectedProducts] = useState<ProdutosSelecionados[]>([]);
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["1"]));
    const [selectedClienteId, setSelectedClienteId] = useState(new Set<number>([]));
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const router = useRouter();

    useEffect(() => {
        getSelectedProducts();
    }, []);

    const getSelectedProducts = async () => {
        const items = localStorage.getItem('selectedItems');

        if (items) {
            const selectedIds = await JSON.parse(items).map(String);
            const selectedProducts: ProdutosSelecionados[] = await Promise.all(
                selectedIds.map(async (id: string) => {
                    const product = await pegaProduto(parseInt(id));
                    return {...product, quantity: 1};
                })
            );

            setSelectedProducts(selectedProducts);
            setIsLoading(false);
        }
    }

    const onChangeProductQuantity = (productId: number, newQuantity: number) => {
        setSelectedProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId ? {...product, quantity: newQuantity} : product
            )
        );
    }

    const onRemoveProduct = (productId: number) => {
        setSelectedProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
        );
        localStorage.setItem('selectedItems', JSON.stringify(selectedProducts.filter((product) => product.id !== productId).map((product) => product.id)));
    }

    const onFinalizaVenda = async () => {
        setIsLoading(true);

        await criarVenda(
            {
                vendas: selectedProducts,
                clienteId: parseInt(selectedClienteId as unknown as string),
                formaPagamento: 1,
            }
        );

        localStorage.removeItem('selectedItems');

        router.push(paths.vendas());
        setIsLoading(false);
    }

    if (isLoading) {
        return <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10  z-50">
            <Spinner color={'warning'}/>
        </div>
    }

    if (selectedProducts.length == 0) {
        return (
            <NoData description={'Nenhum produto selecionado'}/>
        )
    }

    return (
        <div className={'flex justify-center w-full'}>
            <div className={'w-4/6 flex flex-col '}>
                <Accordion selectedKeys={selectedKeys}
                           onSelectionChange={(key) => setSelectedKeys(key as any)}>
                    <AccordionItem
                        indicator={<BsChevronLeft size={24} color={'blue'}/>}
                        subtitle="Escolha e gerencie seus produtos"
                        classNames={{title: 'text-3xl', subtitle: 'text-lg', heading: 'px-2'}}
                        key="1"
                        className="font-semibold py-4"
                        title="Seleção de Produtos"
                    >
                        <Divider/>
                        <CriarVendaSeletorProdutos
                            produtos={selectedProducts}
                            changeProductQuantity={onChangeProductQuantity}
                            removeProduct={onRemoveProduct}
                            openCheckoutAccordion={() => setSelectedKeys(new Set('2'))}
                        />
                    </AccordionItem>
                    <AccordionItem
                        indicator={<BsChevronLeft size={24} color={'blue'}/>}
                        subtitle="Finalize a venda"
                        classNames={{title: 'text-3xl', subtitle: 'text-lg', heading: 'px-2'}}
                        key="2"
                        className="font-semibold py-4"
                        title="Checkout"
                    >
                        <Divider/>
                        <CriarVendaCheckout setSelectedClienteId={setSelectedClienteId}
                                            formasPagamento={formasPagamento} clientes={clientes}
                                            onFinalizaVenda={onFinalizaVenda}/>
                    </AccordionItem>
                </Accordion>
            </div>

        </div>
    );
}

export default CriarVendaForm;