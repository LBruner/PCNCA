'use client';
import React from "react";
import {ProductionProduct} from "@/models/producao-internacional/produtos";
import {Button, useDisclosure} from "@heroui/react";
import ProductionProductPickerModal from "@/components/producao-internacional/product-picker-modal";

interface Props {
    selectedProduct: ProductionProduct,
    setSelectedProduct: (product: ProductionProduct) => void
}
const ProductionProductPicker: React.FC<Props> = ({selectedProduct,setSelectedProduct}) => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <div className={'mb-5 flex gap-6 items-center justify-between'}>
            <p className={'text-left text-2xl font-semibold text-gray-700'}>
                Produção de {selectedProduct.translationName}, 2022
            </p>
            <Button onPress={onOpen} color={'primary'}>Alterar produto</Button>
            <ProductionProductPickerModal setSelectedProduct={setSelectedProduct} isOpen={isOpen} onOpenChange={onOpenChange}/>
        </div>
    )
}

export default ProductionProductPicker;