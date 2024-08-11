import React from "react";
import {Button, Input, Select, SelectItem, Switch} from "@nextui-org/react";
import {agribusinessCategories, unidadesDeMedida} from "@/db/factories/product";
import {Textarea} from "@nextui-org/input";
import {Radio, RadioGroup} from "@nextui-org/radio";
import {CreatePostFormState} from "@/actions/produto";
import {Product} from "@prisma/client";

interface ProdutoFormProps{
    formState: CreatePostFormState,
    action:  (payload: FormData) => void,
    produto?: Product;
}

const ProdutoForm: React.FC<ProdutoFormProps> = ({formState,action, produto}) => {
    const [hideProduct, setHideProduct] = React.useState<boolean>(!!(produto?.status && produto.status === 'Ativo'));

    return (
        <form action={action} className={'flex flex-col justify-center items-center mt-40'}>
            <div className={'w-5/6 flex justify-between mb-4 items-center'}>
                <p className={'text-2xl font-semibold'}>Criar Produto</p>
                <Button type={'submit'}>{produto ? 'Editar' : 'Criar'} Produto</Button>
            </div>
            <div className={'w-5/6 flex justify-center bg-white rounded border-1 border-gray-200'}>
                <div className={'flex flex-col gap-4 w-full px-8 py-6'}>
                    <p className={'text-xl font-bold'}>Informações Gerais</p>
                    <div className={'flex flex-col gap-7'}>
                        <CustomInputButton defaultValue={produto?.name ?? undefined} name={'nome'} label={'Nome'} placeholder={'Digite um nome...'}
                                           isInvalid={!!formState.errors.nome}
                                           errorMessage={formState.errors.nome?.join(', ')}/>
                        <CustomInputButton defaultValue={produto?.price.toString() ?? undefined} name={'preco'} type={'number'} label={'Preço'}
                                           placeholder={'0'} isInvalid={!!formState.errors.preco}
                                           errorMessage={formState.errors.preco?.join(', ')}
                                           startContent={<p className={'font-normal'}>R$</p>}/>
                        <CustomSelect defaultValue={produto?.category ?? undefined} name={'categoria'} label={'Categoria'} placeholder={'Seleciona a categoria'}
                                      collection={agribusinessCategories} isInvalid={!!formState.errors.categoria}
                                      errorMessage={formState.errors.nome?.join(', ')}/>
                        <Textarea defaultValue={produto?.description ?? undefined} name={'descricao'} size={'lg'} minRows={1}
                                  className={'font-semibold'}
                                  labelPlacement={'outside'} label={'Descrição'}
                                  placeholder={'Descreva seu produto em detalhes...'}
                                  isInvalid={!!formState.errors.descricao}
                                  errorMessage={formState.errors.descricao?.join(', ')}/>
                        <CustomInputButton defaultValue={produto?.imageUrl ?? undefined} name={'imagem'} label={'Imagem principal'}
                                           placeholder={'Digite a url da imagem...'}
                                           isInvalid={!!formState.errors.imagem}
                                           errorMessage={formState.errors.imagem?.join(', ')}/>
                    </div>
                </div>
                <div className={'flex flex-col gap-4 w-full px-8 py-6 mt-11'}>
                    <div className={'flex flex-col gap-7'}>
                        <CustomInputButton defaultValue={produto?.stock.toString() ?? undefined} name={'estoque'} type={'number'} label={'Estoque'}
                                           placeholder={'0 Unidades'}
                                           isInvalid={!!formState.errors.estoque}
                                           errorMessage={formState.errors.estoque?.join(', ')}/>
                        <CustomSelect defaultValue={produto?.unity ?? undefined} name={'unidade'} label={'Unidade de medida'}
                                      placeholder={'Seleciona a unidade de medida'}
                                      collection={unidadesDeMedida} isInvalid={!!formState.errors.unidade}
                                      errorMessage={formState.errors.unidade?.join(', ')}/>
                        <RadioGroup
                            //TODO: Adicionar tipo de commodity na tabela
                            defaultValue={'agricola'}
                            name={'tipoComodity'}
                            isRequired={true}
                            classNames={{
                                base: "mt-3",
                            }}
                            className={'font-medium'}
                            label="Selecione o tipo de commodity"
                            orientation="horizontal"
                            isInvalid={!!formState.errors.tipoComodity}
                            errorMessage={formState.errors.tipoComodity?.join(', ')}
                        >
                            <Radio className={'font-normal'} value="agricola">Agrícola</Radio>
                            <Radio className={'desativado'}
                                   value="pecuaria">Pecuária</Radio>
                        </RadioGroup>
                        <div className={'mt-1'}>
                            <p className={'mb-2'}>Visibilidade</p>
                            <Switch isSelected={hideProduct} onValueChange={setHideProduct}
                            value={hideProduct ? 'Ativado' : 'Desativado'} name={'status'}>
                                Mostrar produto
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
            {formState.errors._form ? <div
                className={'p-2 bg-red-200 border border-red-400 rounded'}>{formState.errors._form.join(', ')}</div> : null}
            <div>
            </div>
        </form>
    )
}

interface CustomInput {
    defaultValue?: string,
    name: string,
    label: string,
    placeholder: string,
    isInvalid: boolean,
    errorMessage?: string,
    type?: string,
    startContent?: React.ReactNode
    endContent?: React.ReactNode
}


const CustomInputButton: React.FC<CustomInput> = (
    {
        defaultValue,
        name,
        label,
        placeholder,
        errorMessage,
        isInvalid,
        type,
        startContent,
        endContent,
    }
) => {
    return <Input defaultValue={defaultValue} name={name} isRequired={true} className={'font-medium'} size={'lg'} type={type} label={label}
                  labelPlacement={'outside'}
                  placeholder={placeholder} isInvalid={isInvalid} errorMessage={errorMessage}
                  startContent={startContent} endContent={endContent}/>
};


const CustomSelect: React.FC<CustomInput & { collection: string[] }> = (
    {
        defaultValue,
        name,
        label,
        placeholder,
        collection
    }
) => {
    return <Select
        selectedKeys={defaultValue ? [defaultValue] : undefined }
        multiple={false}
        name={name}
        isRequired={true}
        classNames={{
            label: "font-medium font-lg",
        }}
        size={'lg'}
        labelPlacement={'outside'}
        label={label}
        placeholder={placeholder}
    >
        {collection.map((item) => (
            <SelectItem key={item} value={item}>
                {item}
            </SelectItem>
        ))}
    </Select>
};

export default ProdutoForm;