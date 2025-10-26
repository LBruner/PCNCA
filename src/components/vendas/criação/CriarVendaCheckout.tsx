'use client';

import { CategoriaPessoaComEmpresa } from "@/actions/clientes";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import React from "react";

initMercadoPago('APP_USR-223affd2-b3f2-4522-a682-34d10eafe281');

interface CriarVendaCheckoutFormProps {
    clienteSelecionadoId: Set<number> | null;
    clientes: CategoriaPessoaComEmpresa[];
    setSelectedClienteId: React.Dispatch<React.SetStateAction<Set<number>>>;
    preferenceId?: string | null;
}

const CriarVendaCheckout: React.FC<CriarVendaCheckoutFormProps> = (
    {
        clienteSelecionadoId,
        preferenceId
    }) => {
    
    if (!preferenceId) {
        return (
            <div className={'mx-2 mt-6 flex flex-col gap-6 dark:bg-customDarkFooter'}>
                <p className={'text-lg text-gray-500'}>Aguarde enquanto preparamos seu checkout...</p>
            </div>
        );
    }

    return (
        <div className={'mx-2 mt-6 flex flex-col gap-6 dark:bg-customDarkFooter'}>
            <div className={'flex flex-col gap-4'}>
                <p className={'text-xl font-normal'}>Realize o pagamento abaixo</p>
                <div style={{ width: '300px' }}>
                    <Wallet initialization={{ preferenceId }} />
                </div>
            </div>
        </div>
    )
}

export default CriarVendaCheckout;