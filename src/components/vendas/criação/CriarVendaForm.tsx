'use client';

import { CategoriaPessoaComEmpresa } from "@/actions/clientes";
import { pegaPreference } from "@/actions/pagamentos";
import { useCart } from "@/app/context/CartContext";
import { ProdutosSelecionados } from "@/app/vendas/criar/page";
import NoData from "@/components/UI/NoData";
import CriarVendaCheckout from "@/components/vendas/criação/CriarVendaCheckout";
import CriarVendaSeletorProdutos from "@/components/vendas/criação/CriarVendaSeletorProdutos";
import { Accordion, AccordionItem, Divider, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import FreteCalculator from "./FreteCalculator";

interface CriarVendaFormProps {
    clientes: CategoriaPessoaComEmpresa[];
}

export interface VendaComDados {
    vendas: ProdutosSelecionados[],
    clienteId: number;
}

const CriarVendaForm: React.FC<CriarVendaFormProps> = ({ clientes }) => {
    const { items, updateQuantity, removeItem, totalItems } = useCart();
    const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));
    const [selectedClienteId, setSelectedClienteId] = useState(new Set<number>([]));
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [isCreatingPreference, setIsCreatingPreference] = useState(false);
    const [shippingValue, setShippingValue] = useState<number | null>(null);
    const [lastPreferenceShippingValue, setLastPreferenceShippingValue] = useState<number | null>(null);

    // Converter items do carrinho para o formato esperado
    const selectedProducts = items.map(item => ({
        id: item.id,
        produto: item.produto,
        preco: item.preco,
        quantity: item.quantidade,
        imagemLink: item.imagemLink,
        descricao: '',
        empresaId: item.empresaId,
        vendorName: item.vendorName,
        unidadeMedida: item.unidadeMedida,
    }));

    const createPreference = async () => {
        if (shippingValue === null) return;

        setIsCreatingPreference(true);
        const shippingSnapshot = shippingValue;
        try {
            const preferenceResponse = await pegaPreference({
                items: selectedProducts.map(estoque => ({
                    id: estoque.id.toString(),
                    title: estoque.produto,
                    quantity: estoque.quantity,
                    unit_price: estoque.preco,
                    currency_id: 'BRL',
                    description: estoque.descricao || estoque.produto,
                    picture_url: estoque.imagemLink || 'https://m.media-amazon.com/images/M/MV5BMzE0ZDU1MzQtNTNlYS00YjNlLWE2ODktZmFmNDYzMTblZTBmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
                })),
                shippingCost: shippingSnapshot,
            });
            console.log('Preference created:', preferenceResponse);
            if (shippingValue !== shippingSnapshot) {
                setPreferenceId(null);
                setLastPreferenceShippingValue(null);
                return;
            }
            setPreferenceId(preferenceResponse);
            setLastPreferenceShippingValue(shippingSnapshot);
        } catch (error) {
            console.error('Error creating preference:', error);
        } finally {
            setIsCreatingPreference(false);
        }
    }

     useEffect(() => {
        const checkoutIsOpen = selectedKeys.has("2");
        const canGeneratePreference = shippingValue !== null;

        if (checkoutIsOpen && canGeneratePreference && !preferenceId && !isCreatingPreference && selectedProducts.length > 0) {
            createPreference();
        }
    }, [selectedKeys, preferenceId, isCreatingPreference, selectedProducts.length, shippingValue, createPreference]);

    useEffect(() => {
        if (shippingValue === null) {
            if (preferenceId) {
                setPreferenceId(null);
            }
            if (lastPreferenceShippingValue !== null) {
                setLastPreferenceShippingValue(null);
            }
            return;
        }

        if (lastPreferenceShippingValue !== null && shippingValue !== lastPreferenceShippingValue) {
            if (preferenceId) {
                setPreferenceId(null);
            }
            setLastPreferenceShippingValue(null);
        }
    }, [shippingValue, preferenceId, lastPreferenceShippingValue]);

    const onChangeProductQuantity = (productId: number, newQuantity: number) => {
        updateQuantity(productId, newQuantity);
        setPreferenceId(null);
    }

    const onRemoveProduct = (productId: number) => {
        removeItem(productId);
        setPreferenceId(null);
    }

    if (totalItems === 0) {
        return (
            <NoData description={'Nenhum produto no carrinho'} />
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
                        indicator={<BsChevronLeft size={24} color={'blue'} />}
                        subtitle="Escolha e gerencie seus produtos"
                        classNames={{ title: 'text-3xl', subtitle: 'text-lg', heading: 'px-2' }}
                        key="1"
                        className="font-semibold py-4 dark:bg-customDarkFooter px-8 rounded-lg"
                        title="Seleção de Produtos"
                    >
                        <Divider />
                        <CriarVendaSeletorProdutos
                            estoques={selectedProducts}
                            changeProductQuantity={onChangeProductQuantity}
                            removeProduct={onRemoveProduct}
                            openCheckoutAccordion={() => setSelectedKeys(new Set(['3']))}
                        />
                    </AccordionItem>
                    <AccordionItem
                        indicator={<BsChevronLeft size={24} color={'blue'} />}
                        subtitle="Calcule o frete para entrega"
                        classNames={{ title: 'text-3xl', subtitle: 'text-lg', heading: 'px-2' }}
                        key="3"
                        className="font-semibold py-4 dark:bg-customDarkFooter px-8 rounded-lg"
                        title="Frete e entrega"
                    >
                        <Divider />
                        <div className="py-6">
                            <FreteCalculator shippingValue={shippingValue} setShippingValue={setShippingValue} openCheckoutAccordion={() => setSelectedKeys(new Set(['2']))} />
                        </div>
                    </AccordionItem>
                    <AccordionItem
                        indicator={<BsChevronLeft size={24} color={'blue'} />}
                        subtitle="Finalize a venda"
                        classNames={{ title: 'text-3xl', subtitle: 'text-lg', heading: 'px-2' }}
                        key="2"
                        className="font-semibold py-4 dark:bg-customDarkFooter px-8 rounded-lg"
                        title="Checkout"
                    >
                        <Divider />
                        {isCreatingPreference ? (
                            <div className="flex justify-center py-8">
                                <Spinner color={'warning'} label="Preparando checkout..." />
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
