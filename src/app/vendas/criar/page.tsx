'use client';
import React, {useEffect, useState} from "react";
import {pegaProduto} from "@/actions/produto";
import CriarVendaSeletorProdutos from "@/components/vendas/criação/CriarVendaSeletorProdutos";
import {Product} from "@prisma/client";
import {Spinner} from "@nextui-org/react";

export type ProductSale = Product & {
    quantity: number
}

const CriarVendasPage: React.FC = () => {

    const [selectedProducts, setSelectedProducts] = useState<ProductSale[]>([]);

    useEffect(() => {
        getSelectedProducts();
    }, []);

    const getSelectedProducts = async () => {
        const items = localStorage.getItem('selectedItems');
        if (items) {
            const selectedIds = await JSON.parse(items).map(String);
            const selectedProducts = await Promise.all(
                selectedIds.map(async (id: string) => {
                    const product = await pegaProduto(id);
                    return {...product, quantity: 1};
                })
            );

            setSelectedProducts(selectedProducts);
        }
    }

    console.log(selectedProducts)
    if (selectedProducts.length == 0) {
        return (
            <div className={'h-screen w-screen flex justify-center items-center'}>
                <Spinner/>
            </div>
        )
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

    return (
        <div className={'mt-36 flex justify-center w-full'}>
            <CriarVendaSeletorProdutos produtos={selectedProducts} changeProductQuantity={onChangeProductQuantity} removeProduct={onRemoveProduct}/>
        </div>
    );
};

export default CriarVendasPage;
