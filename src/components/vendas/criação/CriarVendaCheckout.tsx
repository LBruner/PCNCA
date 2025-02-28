import React, {Dispatch, SetStateAction} from "react";
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
    return (
        <div className={'mx-2 mt-6 flex flex-col gap-6'}>
            <p className={'text-xl font-normal'}>Selecione o cliente para entrega</p>
            <Autocomplete selectedKey={clienteSelecionadoId ?? null as any}
                          onSelectionChange={(key) => setSelectedClienteId(key as any)} size={'sm'} label={'Cliente'}>
                {clientes[0].pessoas.map((cliente) => <AutocompleteItem
                    key={cliente.pessoaJuridica != null ? cliente.pessoaJuridica!.id : cliente.pessoaFisica!.id}>{cliente.pessoaJuridica != null ? cliente.pessoaJuridica!.razaoSocial : cliente.pessoaFisica!.nome}</AutocompleteItem>)}
            </Autocomplete>
            <div className={'flex flex-col gap-4'}>
                <p className={'text-xl font-normal'}>Selecione o método de pagamento</p>

                <div className={'flex gap-2'}>
                    {formasPagamento.map((forma) =>
                        <div onClick={() => setSelectedFormaPagamento(new Set([forma.id]))}
                             className={'flex-1'}>
                            <FormaPagamentoButton title={forma.tipo}
                                                  isSelected={selectedFormaPagamento != null && selectedFormaPagamento.has(forma.id)}
                                                  icon={forma.id == 1 ? <FaBarcode/> : forma.id == 2 ?
                                                      <IoQrCodeOutline/> : <BsCreditCard2Front/>}/>
                        </div>
                    )}
                </div>
                <Button onClick={() => onFinalizaVenda()} className={'w-36'} color={'primary'}>
                    Finalizar Venda
                </Button>
            </div>
        </div>
    )
}

export default CriarVendaCheckout;