'use client';

import React, {useEffect, useState} from "react";
import {pegaProduto} from "@/actions/produto";
import {Accordion, AccordionItem, Divider, Spinner} from "@heroui/react";
import CriarVendaSeletorProdutos from "@/components/vendas/criação/CriarVendaSeletorProdutos";
import {ProdutosSelecionados} from "@/app/vendas/criar/page";
import {CategoriaPessoaComEmpresa} from "@/actions/clientes";
import {BsChevronLeft} from "react-icons/bs";
import CriarVendaCheckout from "@/components/vendas/criação/CriarVendaCheckout";
import {criarVenda} from "@/actions/vendas";
import NoData from "@/components/UI/NoData";
import {useRouter} from "next/navigation";
import paths from "@/paths";
import { pegaPreference } from "@/actions/pagamentos";

interface CriarVendaFormProps {
    clientes: CategoriaPessoaComEmpresa[];
}

export interface VendaComDados {
    vendas: ProdutosSelecionados[],
    clienteId: number;
}

const CriarVendaForm: React.FC<CriarVendaFormProps> = ({clientes}) => {
    const [selectedProducts, setSelectedProducts] = useState<ProdutosSelecionados[]>([]);
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["1"]));
    const [selectedClienteId, setSelectedClienteId] = useState(new Set<number>([]));
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [isCreatingPreference, setIsCreatingPreference] = useState(false);

    const router = useRouter();

    useEffect(() => {
        getSelectedProducts().then();
    }, []);

    // Create preference when accordion opens to checkout
    useEffect(() => {
        const checkoutIsOpen = selectedKeys.has("2");
        if (checkoutIsOpen && !preferenceId && !isCreatingPreference && selectedProducts.length > 0) {
            createPreference();
        }
    }, [selectedKeys, preferenceId, isCreatingPreference, selectedProducts]);

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

    const createPreference = async () => {
        setIsCreatingPreference(true);
        try {
            const preferenceResponse = await pegaPreference(
                selectedProducts.map(produto => ({
                    id: produto.id.toString(),
                    title: produto.estoque.produto,
                    quantity: produto.quantity,
                    unit_price: produto.estoque.preco,
                    currency_id: 'BRL',
                    description: produto.estoque.descricao,
                    picture_url: 'https://m.media-amazon.com/images/M/MV5BMzE0ZDU1MzQtNTNlYS00YjNlLWE2ODktZmFmNDYzMTBlZTBmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
                }))
            );
            console.log('Preference created:', preferenceResponse);
            setPreferenceId(preferenceResponse);
        } catch (error) {
            console.error('Error creating preference:', error);
        } finally {
            setIsCreatingPreference(false);
        }
    }

    const onChangeProductQuantity = (productId: number, newQuantity: number) => {
        setSelectedProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId ? {...product, quantity: newQuantity} : product
            )
        );
        // Reset preference when quantities change
        setPreferenceId(null);
    }

    const onRemoveProduct = (productId: number) => {
        setSelectedProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
        );
        localStorage.setItem('selectedItems', JSON.stringify(selectedProducts.filter((product) => product.id !== productId).map((product) => product.id)));
        // Reset preference when products change
        setPreferenceId(null);
    }

    if (isLoading) {
        return <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
            <Spinner color={'warning'}/>
        </div>
    }

    if (selectedProducts.length === 0) {
        return (
            <NoData description={'Nenhum produto selecionado'}/>
        )
    }

    return (
        <div className={'flex justify-center w-full'}>
            <div className={'w-4/6 flex flex-col'}>
                <Accordion 
                    selectedKeys={selectedKeys}
                    onSelectionChange={(key) => setSelectedKeys(key as any)}
                >
                    <AccordionItem
                        indicator={<BsChevronLeft size={24} color={'blue'}/>}
                        subtitle="Escolha e gerencie seus produtos"
                        classNames={{title: 'text-3xl', subtitle: 'text-lg', heading: 'px-2'}}
                        key="1"
                        className="font-semibold py-4 dark:bg-customDarkFooter px-8 rounded-lg"
                        title="Seleção de Produtos"
                    >
                        <Divider/>
                        <CriarVendaSeletorProdutos
                            produtos={selectedProducts}
                            changeProductQuantity={onChangeProductQuantity}
                            removeProduct={onRemoveProduct}
                            openCheckoutAccordion={() => setSelectedKeys(new Set(['2']))}
                        />
                    </AccordionItem>
                    <AccordionItem
                        indicator={<BsChevronLeft size={24} color={'blue'}/>}
                        subtitle="Finalize a venda"
                        classNames={{title: 'text-3xl', subtitle: 'text-lg', heading: 'px-2'}}
                        key="2"
                        className="font-semibold py-4 dark:bg-customDarkFooter px-8 rounded-lg"
                        title="Checkout"
                    >
                        <Divider/>
                        {isCreatingPreference ? (
                            <div className="flex justify-center py-8">
                                <Spinner color={'warning'} label="Preparando checkout..."/>
                            </div>
                        ) : (
                            <CriarVendaCheckout 
                                clienteSelecionadoId={selectedClienteId}
                                setSelectedClienteId={setSelectedClienteId} 
                                clientes={clientes}
                                preferenceId={preferenceId}
                            />
                        )}
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}

export default CriarVendaForm;