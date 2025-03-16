'use client';

import React, {Dispatch, SetStateAction, useState} from "react";
import {Autocomplete, AutocompleteItem, Button} from "@heroui/react";
import {CategoriaPessoaComEmpresa} from "@/actions/clientes";
import {FormaPagamento} from "@prisma/client";
import {BsCreditCard2Front} from "react-icons/bs";
import FormaPagamentoButton from "@/components/vendas/criação/FormaPagamentoButton";
import {IoQrCodeOutline} from "react-icons/io5";
import {FaBarcode} from "react-icons/fa";

interface CriarVendaCheckoutFormProps {
    clienteSelecionadoId: Set<number> | null;
    clientes: CategoriaPessoaComEmpresa[];
    formasPagamento: FormaPagamento[];
    selectedFormaPagamento: Set<number>;
    setSelectedFormaPagamento: Dispatch<SetStateAction<Set<number>>>;
    onFinalizaVenda: () => void;
    setSelectedClienteId: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const CriarVendaCheckout: React.FC<CriarVendaCheckoutFormProps> = (
    {
        formasPagamento,
        clienteSelecionadoId,
        clientes,
        onFinalizaVenda,
        selectedFormaPagamento,
        setSelectedFormaPagamento,
        setSelectedClienteId
    }) => {

    const [selecionouFormaPagamento, setSelecionouFormaPagamento] = useState(false);

    return (
        <form onSubmit={(_) => {
            if(!selecionouFormaPagamento) return;
            onFinalizaVenda();
        }} className={'mx-2 mt-6 flex flex-col gap-6 dark:bg-customDarkFooter'}>
            <p className={'text-xl font-normal'}>Selecione o cliente para entrega</p>
            <Autocomplete errorMessage={<p>Campo cliente é obrigatório</p>} isRequired={true} selectedKey={clienteSelecionadoId ?? null as any}
                          onSelectionChange={(key) => setSelectedClienteId(key as any)} size={'sm'} label={'Cliente'}>
                {clientes[0].pessoas.map((cliente) => <AutocompleteItem
                    key={cliente.id}>{cliente.pessoaJuridica != null ? cliente.pessoaJuridica!.razaoSocial : cliente.pessoaFisica!.nome}</AutocompleteItem>)}
            </Autocomplete>
            <div className={'flex flex-col gap-4'}>
                <p className={'text-xl font-normal'}>Selecione o método de pagamento</p>

                <div className={'flex gap-2'}>
                    {formasPagamento.map((forma) =>
                        <div key={forma.id} onClick={() => {
                            setSelectedFormaPagamento(new Set([forma.id]));
                            setSelecionouFormaPagamento(true);
                        }}
                             className={'flex-1'}>
                            <FormaPagamentoButton  title={forma.tipo}
                                                  isSelected={selectedFormaPagamento != null && selectedFormaPagamento.has(forma.id)}
                                                  icon={forma.id == 1 ? <FaBarcode/> : forma.id == 2 ?
                                                      <IoQrCodeOutline/> : <BsCreditCard2Front/>}/>
                        </div>
                    )}
                </div>
                <Button type={'submit'} disabled={!selecionouFormaPagamento}  className={'w-36'} color={`${selecionouFormaPagamento && clienteSelecionadoId?.size != 0 ? 'primary' : 'default'}`}>
                    Finalizar Venda
                </Button>
            </div>
        </form>
    )
}

export default CriarVendaCheckout;