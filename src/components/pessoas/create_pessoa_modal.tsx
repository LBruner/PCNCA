import React, {useEffect, useState} from "react";
import CustomModal from "@/components/UI/CustomModal";
import {Input, Select, SelectItem} from "@nextui-org/react";
import {Pessoa} from "@prisma/client";
import {createPessoa, updatePessoa} from "@/actions/pessoas";
import {FilterCollection} from "@/models/shared/FilterCollection";

export type CreatePessoaModalSettings = {
    title: string
    text: string
    actionText?: string
    closeText?: string
    isOpen: boolean,
    onClose: () => void,
    categorias: FilterCollection[]
    pessoa?: Pessoa
}

interface CustomModalProps {
    itemId?: number | null,
    settings: CreatePessoaModalSettings
}

const CreatePessoaModal: React.FC<CustomModalProps> = ({settings}) => {

    const [isLoading, setIsLoading] = useState(false)
    const [nomePessoa, setNomePessoa] = useState(settings.pessoa?.nome ?? '');
    const [email, setEmail] = useState(settings.pessoa?.email ?? '');
    const [categoria, setCategoria] = useState(settings.pessoa?.categoriaId ?? null);


    useEffect(() => {
        if (settings.pessoa) {
            setNomePessoa(settings.pessoa.nome);
            setEmail(settings.pessoa!.email!);

            console.log(categoria)

        } else {
            setNomePessoa('');
            setEmail('');
            setCategoria(0);
        }
    }, [settings.pessoa]);
    const onManageCategory = async () => {
        setIsLoading(true);

        if (settings.pessoa && categoria) {
            await updatePessoa({
                nome: nomePessoa,
                email: email,
                categoriaId: categoria,
                id: settings.pessoa.id
            });
        } else {
            await createPessoa(nomePessoa, email, categoria!);
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
                    <form aria-label={'fsa'} className={'flex flex-col gap-4'}>
                        <Input value={nomePessoa} onValueChange={setNomePessoa} isRequired={true}
                               label={'Nome da pessoa'} labelPlacement={'inside'}>Nome</Input>
                        <Input value={email} onValueChange={setEmail} isRequired={true} required={true}
                               label={'Email'} labelPlacement={'inside'}>Nome</Input>
                        <Select aria-label={'fsafa'} onSelectionChange={(a) => {
                            setCategoria(Array.from(a)[0] as any)
                        }} selectedKeys={[categoria as any]} label={'Categoria'} isRequired={true}>
                            {settings.categorias.map((categoria) => (
                                <SelectItem key={categoria.uid}>
                                    {categoria.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </form>
                </>
            }
        />
    )
}

export default CreatePessoaModal;