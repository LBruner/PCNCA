import React, {useState} from "react";
import CustomModal from "@/components/UI/CustomModal";

export type DeleteModalSettings = {
    title: string
    text: string
    actionText?: string
    closeText?: string
    deletingFunction: (id: number) => Promise<void>
    isOpen: boolean,
    onClose: () => void,
}

interface CustomModalProps {
    itemId: number | null,
    settings: DeleteModalSettings
}

const ItemDeleteModal: React.FC<CustomModalProps> = ({itemId, settings}) => {
    if (!itemId)
        return null;

    const [isLoading, setIsLoading] = useState(false)

    const onDeleteProduct = async () => {
        setIsLoading(true);
        await settings.deletingFunction(itemId);
        setIsLoading(false);
        settings.onClose();
    }

    return (
        <CustomModal
            title={settings.title}
            text={settings.text}
            size={'lg'}
            actionText={settings.actionText ?? 'Excluir'}
            closeText={settings.closeText ?? 'Cancelar'}
            action={onDeleteProduct}
            isOpen={settings.isOpen}
            onClose={settings.onClose}
            isLoading={isLoading}
        />
    )
}

export default ItemDeleteModal;