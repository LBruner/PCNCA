import React, {useEffect, useState} from "react";
import CustomModal from "@/components/UI/CustomModal";
import {Input} from "@nextui-org/react";
import {createCategory, updateCategory} from "@/actions/culturas";
import {Cultura} from "@prisma/client";

export type CreateItemModalSettings = {
    title: string
    text: string
    actionText?: string
    closeText?: string
    isOpen: boolean,
    onClose: () => void,
    cultura?: Cultura
}

interface CustomModalProps {
    itemId?: number | null,
    settings: CreateItemModalSettings
}

const AdmCreateCategoryModal: React.FC<CustomModalProps> = ({settings}) => {

    const [isLoading, setIsLoading] = useState(false)
    const [nomeCategoria, setNomeCategoria] = useState(settings.cultura?.nome ?? 'gds');
    const [urlCategoria, setUrlCategoria] = useState(settings.cultura?.imagemLink ?? '');
    const [descricaoCategoria, setDescricaoCategoria] = useState(settings.cultura?.descricao ?? '');

    useEffect(() => {
        if (settings.cultura) {
            setNomeCategoria(settings.cultura.nome);
            setUrlCategoria(settings.cultura!.imagemLink!);
            setDescricaoCategoria(settings.cultura!.descricao!);
        } else {
            setNomeCategoria('');
            setUrlCategoria('');
            setDescricaoCategoria('');
        }
    }, [settings.cultura]);
    const onManageCategory = async () => {
        setIsLoading(true);

        if (settings.cultura) {
            await updateCategory({
                name: nomeCategoria,
                description: descricaoCategoria,
                url: urlCategoria,
                id: settings.cultura.culturaId
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