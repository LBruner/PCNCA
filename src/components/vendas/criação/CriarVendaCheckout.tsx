import React from "react";
import {Autocomplete, AutocompleteItem, Button, Checkbox} from "@nextui-org/react";
import {CategoriaPessoaComEmpresa} from "@/actions/clientes";
import {FormaPagamento} from "@prisma/client";
import {CheckboxGroup} from "@nextui-org/checkbox";

interface CriarVendaCheckoutFormProps {
    clientes: CategoriaPessoaComEmpresa[];
    formasPagamento: FormaPagamento[];
    onFinalizaVenda: () => void;
    setSelectedClienteId: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const CriarVendaCheckout: React.FC<CriarVendaCheckoutFormProps> = (
    {
        formasPagamento,
        clientes,
        onFinalizaVenda,
        setSelectedClienteId
    }) => {
    return (
        <div className={'mx-2 mt-6 flex flex-col gap-6'}>
            <p className={'text-xl font-normal'}>Selecione o cliente para entrega</p>
            <Autocomplete onSelectionChange={(key) => setSelectedClienteId(key as any)} size={'sm'} label={'Cliente'}>
                {clientes[0].pessoas.map((cliente) => <AutocompleteItem
                    key={cliente.pessoaJuridica!.id}>{cliente.pessoaJuridica!.razaoSocial}</AutocompleteItem>)}
            </Autocomplete>
            <div className={'flex flex-col gap-4'}>
                <p className={'text-xl font-normal'}>Selecione o método de pagamento</p>
                <div className={'px-3 py-3 text-gray-400 border border-gray-200 rounded-xl'}>
                    <CheckboxGroup>
                        {formasPagamento.map((forma) => <Checkbox checked={true} radius={'full'} defaultChecked={true}>
                            <p className={'font-light text-lg'}>
                                {forma.tipo}
                            </p></Checkbox>)}
                    </CheckboxGroup>
                </div>
                <Button onClick={() => onFinalizaVenda()} className={'w-36'} color={'primary'}>
                    Finalizar Venda
                </Button>
            </div>
        </div>
    )
}

export default CriarVendaCheckout;