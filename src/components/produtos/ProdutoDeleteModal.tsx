import React, {useState} from "react";
import CustomModal from "@/components/UI/CustomModal";
import {deletarProduto} from "@/actions/produto";

interface CustomModalProps {
    isOpen: boolean,
    onClose: () => void,
    productId: number | null,
}

const ProdutoDeleteModal: React.FC<CustomModalProps> = ({isOpen, onClose, productId,}) => {
    if (!productId)
        return null;

    const [isLoading, setIsLoading] = useState(false)

    const onDeleteProduct = async () => {
        setIsLoading(true);
        await deletarProduto(productId.toString());
        setIsLoading(false);
        onClose();
    }

    return (
        <CustomModal
            title={'Excluir Produto'}
            text={'Tem certeza que deseja excluir este produto?'}
            size={'lg'}
            actionText={'Excluir'}
            closeText={'Cancelar'}
            action={onDeleteProduct}
            isOpen={isOpen}
            onClose={onClose}
            isLoading={isLoading}
        />
    )
}

export default ProdutoDeleteModal;