import React, {useState} from "react";
import {Autocomplete, AutocompleteItem, Button, Input, Select, SelectItem} from "@nextui-org/react";
import {Textarea} from "@nextui-org/input";
import {Radio, RadioGroup} from "@nextui-org/radio";
import {CreatePostFormState, FornecedorComRelacoes} from "@/actions/produto";
import {Cultura} from "@prisma/client";
import {FilterCollection} from "@/models/shared/FilterCollection";
import {unidadesMedidaCollection} from "@/constants/UnidadesMedida";
import {ProdutoEstoqueComRelacoes} from "@/actions/estoques";

interface ProdutoFormProps {
    formState: CreatePostFormState,
    action: (payload: FormData) => void,
    produto?: ProdutoEstoqueComRelacoes;
    fornecedores?: FornecedorComRelacoes[];
    culturas: Cultura[];
}

const ProdutoForm: React.FC<ProdutoFormProps> = ({formState, action, produto, fornecedores, culturas}) => {
    const [selectedChaveFornecedor, setSelectedChaveFornecedor] = useState(produto?.venda?.pessoas[0].pessoa.id.toString() ?? '');
    const [selectedChaveCategoria, setselectedChaveCategoria] = useState(produto?.estoque.categoriaId?.culturaId.toString() ?? '');
    const [unidadeMedidaChave, setUnidadeMedidaChave] = useState(produto?.estoque.unidadeMedida.toString() ?? '');

    const culturaCollection: FilterCollection[] = culturas.map((cultura) => {
        return {
            uid: cultura.culturaId.toString(),
            name: cultura.nome,
        }
    })

    return (
        <form action={formData => {
            formData.append('chave_fornecedor', selectedChaveFornecedor);
            action(formData);
        }} className={'flex flex-col justify-center items-center'}>
            <div className={'w-5/6 flex justify-between mb-4 items-center'}>
                <p className={'text-2xl font-semibold'}>Criar Produto</p>
                <Button type={'submit'}>{produto ? 'Editar' : 'Criar'} Produto</Button>
            </div>
            <div className={'w-5/6 flex justify-center bg-white rounded border-1 border-gray-200'}>
                <div className={'flex flex-col gap-4 w-full px-8 py-6'}>
                    <p className={'text-xl font-bold'}>Informações Gerais</p>
                    <div className={'flex flex-col gap-7'}>
                        <CustomInputButton defaultValue={produto?.estoque.produto ?? undefined} name={'nome'}
                                           label={'Nome'}
                                           placeholder={'Digite um nome...'}
                                           isInvalid={!!formState.errors.nome}
                                           errorMessage={formState.errors.nome?.join(', ')}/>
                        <CustomInputButton
                            defaultValue={produto?.estoque.preco.toString() ?? undefined} name={'preco'}
                            type={'number'} label={'Preço'}
                            placeholder={'0'} isInvalid={!!formState.errors.preco}
                            errorMessage={formState.errors.preco?.join(', ')}
                            startContent={<p className={'font-normal'}>R$</p>}
                        />
                        <CustomSelect
                            value={selectedChaveCategoria ?? undefined}
                            onChange={setselectedChaveCategoria}
                            name={'categoria'}
                            label={'Categoria'} placeholder={'Seleciona a categoria'}
                            collection={culturaCollection} isInvalid={!!formState.errors.categoria}
                            errorMessage={formState.errors.categoria?.join(', ')}
                        />
                        <Textarea defaultValue={produto?.estoque.descricao ?? undefined} name={'descricao'} size={'lg'}
                                  minRows={1}
                                  className={'font-semibold'}
                                  labelPlacement={'outside'} label={'Descrição'}
                                  placeholder={'Descreva seu produto em detalhes...'}
                                  isInvalid={!!formState.errors.descricao}
                                  errorMessage={formState.errors.descricao?.join(', ')}/>
                        <CustomInputButton defaultValue={produto?.estoque.imagemLink ?? undefined} name={'imagem'}
                                           label={'Imagem principal'}
                                           placeholder={'Digite a url da imagem...'}
                                           isInvalid={!!formState.errors.imagem}
                                           errorMessage={formState.errors.imagem?.join(', ')}/>
                    </div>
                </div>
                <div className={'flex flex-col gap-4 w-full px-8 py-6 mt-11'}>
                    <div className={'flex flex-col gap-7'}>
                        <Autocomplete
                            defaultSelectedKey={selectedChaveFornecedor ?? undefined}
                            name={'fornecedor'}
                            size={'lg'}
                            labelPlacement={'outside'}
                            label="Fornecedor"
                            isRequired={true}
                            multiple={false}
                            placeholder={'Selecione um fornecedor'}
                            className="w-full font-semibold"
                            onSelectionChange={key => {
                                setSelectedChaveFornecedor(key!.toString());
                                console.log(`${unidadeMedidaChave}`)
                            }}
                        >
                            {fornecedores!.map((fornecedor) => (
                                <AutocompleteItem value={fornecedor.id} key={fornecedor.id}>
                                    {fornecedor.pessoaJuridica?.razaoSocial}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                        <CustomInputButton defaultValue={produto?.estoque.quantidade.toString() ?? undefined}
                                           name={'estoque'}
                                           type={'number'} label={'Estoque'}
                                           placeholder={'0 Unidades'}
                                           isInvalid={!!formState.errors.estoque}
                                           errorMessage={formState.errors.estoque?.join(', ')}/>
                        <CustomSelect
                            value={unidadeMedidaChave ?? undefined} name={'unidade'}
                            onChange={setUnidadeMedidaChave}
                            label={'Unidade de medida'}
                            placeholder={'Seleciona a unidade de medida'}
                            collection={unidadesMedidaCollection} isInvalid={!!formState.errors.unidade}
                            errorMessage={formState.errors.unidade?.join(', ')}
                        />
                        <RadioGroup
                            defaultValue={produto?.estoque?.tipo ?? 'A'}
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
                            <Radio className={'font-normal'} value="A">Agrícola</Radio>
                            <Radio className={'desativado'}
                                   value="P">Pecuária</Radio>
                        </RadioGroup>
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
    value?: string,
    defaultValue?: string,
    name: string,
    variant?: "flat" | "faded" | "bordered" | "underlined",
    color?:  "default" | "primary" | "secondary" | "success" | "warning" | "danger",
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
    return <Input defaultValue={defaultValue} name={name} isRequired={true} className={'font-medium'} size={'lg'}
                  type={type} label={label}
                  labelPlacement={'outside'}
                  placeholder={placeholder} isInvalid={isInvalid} errorMessage={errorMessage}
                  startContent={startContent} endContent={endContent}/>
};


export const CustomSelect: React.FC<CustomInput & { collection: FilterCollection[] } & { onChange: any }> = (
    {
        value,
        onChange,
        name,
        label,
        placeholder,
        collection,
        color,
        variant,
    }
) => {
    return <Select
        color={color}
        variant={variant}
        selectedKeys={value ? [value] : undefined}
        multiple={false}
        onChange={event => onChange(event.target.value)}
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
            <SelectItem key={item.uid} value={item.uid}>
                {item.name}
            </SelectItem>
        ))}
    </Select>
};

export default ProdutoForm;