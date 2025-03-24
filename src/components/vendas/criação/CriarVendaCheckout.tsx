'use client';

import React from "react";
import {Autocomplete, AutocompleteItem, Button} from "@heroui/react";
import {CategoriaPessoaComEmpresa} from "@/actions/clientes";

interface CriarVendaCheckoutFormProps {
    clienteSelecionadoId: Set<number> | null;
    clientes: CategoriaPessoaComEmpresa[];
    onFinalizaVenda: () => void;
    setSelectedClienteId: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const CriarVendaCheckout: React.FC<CriarVendaCheckoutFormProps> = (
    {
        clienteSelecionadoId,
        clientes,
        onFinalizaVenda,
        setSelectedClienteId
    }) => {


    console.log(clienteSelecionadoId)
    return (
        <form onSubmit={onFinalizaVenda} className={'mx-2 mt-6 flex flex-col gap-6 dark:bg-customDarkFooter'}>
            <p className={'text-xl font-normal'}>Selecione o cliente para entrega</p>
            <Autocomplete errorMessage={<p>Campo cliente é obrigatório</p>} isRequired={true} selectedKey={clienteSelecionadoId ?? null as any}
                          onSelectionChange={(key) => setSelectedClienteId(key as any)} size={'sm'} label={'Cliente'}>
                {clientes[0].pessoas.map((cliente) => <AutocompleteItem
                    key={cliente.id}>{cliente.pessoaJuridica != null ? cliente.pessoaJuridica!.razaoSocial : cliente.pessoaFisica!.nome}</AutocompleteItem>)}
            </Autocomplete>
            <div className={'flex flex-col gap-4'}>
                <p className={'text-xl font-normal'}>Selecione o método de pagamento</p>
                <Button type={'submit'} disabled={clienteSelecionadoId?.size == 0}  className={'w-36'} color={`${clienteSelecionadoId?.size != 0 ? 'primary' : 'default'}`}>
                    Finalizar Venda
                </Button>
            </div>
        </form>
    )
}

export default CriarVendaCheckout;