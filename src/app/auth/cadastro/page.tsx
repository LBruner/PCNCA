import React from 'react';
import CadastroPageBody from "@/components/auth/cadastro/CadastroPageBody";
import {pegaTodasEmpresas} from "@/actions/cadastro";

const CadastroPage: React.FC = async () => {
    const empresas = await pegaTodasEmpresas();

    return (
        <CadastroPageBody empresas={empresas}/>
    );
}

export default CadastroPage;
