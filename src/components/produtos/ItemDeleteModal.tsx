import React, {useState} from "react";
import CustomModal from "@/components/UI/CustomModal";
import {addToast} from "@heroui/react";

export type DeletingItemModalSettings = {
    title: string
    text: string
    actionText?: string
    closeText?: string
    actionFn: (id: any) => Promise<any>
    isOpen: boolean,
    onClose: () => void,
}

interface CustomModalProps {
    itemId: number | string | null,
    settings: DeletingItemModalSettings
}

const ItemDeleteModal: React.FC<CustomModalProps> = ({itemId, settings}) => {

    const [isLoading, setIsLoading] = useState(false)

    if (!itemId)
        return null;
    const onDeleteProduct = async () => {
        setIsLoading(true);
        const response = await settings.actionFn(itemId);

        if(!response){
            addToast({
                color: 'success',
                title: "Produto inativado",
                description: "Esse estoque já foi utilizado em uma venda.",
                timeout: 5000,
            });
        }

        setIsLoading(false);
        settings.onClose();
    }

    return (
        <CustomModal
            title={settings.title}
            text={settings.text}
            size={'lg'}
            actionText={settings.actionText ?? 'Confirmar'}
            closeText={settings.closeText ?? 'Cancelar'}
            action={onDeleteProduct}
            isOpen={settings.isOpen}
            onClose={settings.onClose}
            isLoading={isLoading}
        />
    )
}

export default ItemDeleteModal;