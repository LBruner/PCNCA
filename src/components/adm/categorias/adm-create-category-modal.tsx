import React, {useEffect, useState} from "react";
import CustomModal from "@/components/UI/CustomModal";
import {Input} from "@nextui-org/react";
import {createCategory, updateCategory} from "@/actions/categorias";
import {Category} from "@prisma/client";

export type CreateItemModalSettings = {
    title: string
    text: string
    actionText?: string
    closeText?: string
    isOpen: boolean,
    onClose: () => void,
    category?: Category
}

interface CustomModalProps {
    itemId?: number | null,
    settings: CreateItemModalSettings
}

const AdmCreateCategoryModal: React.FC<CustomModalProps> = ({settings}) => {

    const [isLoading, setIsLoading] = useState(false)
    const [nomeCategoria, setNomeCategoria] = useState(settings.category?.name ?? 'gds');
    const [urlCategoria, setUrlCategoria] = useState(settings.category?.url ?? '');
    const [descricaoCategoria, setDescricaoCategoria] = useState(settings.category?.description ?? '');

    useEffect(() => {
        if (settings.category) {
            setNomeCategoria(settings.category.name);
            setUrlCategoria(settings.category!.url!);
            setDescricaoCategoria(settings.category!.description!);
        } else {
            setNomeCategoria('');
            setUrlCategoria('');
            setDescricaoCategoria('');
        }
    }, [settings.category]);
    const onManageCategory = async () => {
        setIsLoading(true);

        if (settings.category) {
            await updateCategory({
                name: nomeCategoria,
                description: descricaoCategoria,
                url: urlCategoria,
                id: settings.category.id
            });
        } else {
            await createCategory(nomeCategoria, descricaoCategoria, urlCategoria);
        }

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
            action={onManageCategory}
            isOpen={settings.isOpen}
            onClose={settings.onClose}
            isLoading={isLoading}
            actionButtonColor={'success'}
            modalDisplayBody={
                <>
                    <form className={'flex flex-col gap-4'}>
                        <Input value={nomeCategoria} onValueChange={setNomeCategoria} isRequired={true}
                               label={'Nome da categoria'} labelPlacement={'inside'}>Nome</Input>
                        <Input value={urlCategoria} onValueChange={setUrlCategoria} isRequired={true} required={true}
                               label={'Url da imagem'} labelPlacement={'inside'}>Nome</Input>
                        <Input value={descricaoCategoria} onValueChange={setDescricaoCategoria} isRequired={true}
                               required={true} label={'Descrição da categoria'} labelPlacement={'inside'}>Nome</Input>
                    </form>
                </>
            }
        />
    )
}

export default AdmCreateCategoryModal;