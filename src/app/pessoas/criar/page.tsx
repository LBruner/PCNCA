import React from "react";
import CriarPessoaForm from "@/components/pessoas/CriarPessoaForm";
import {pegaTodasCategoriasPessoas} from "@/actions/pessoas";

const PessoaCreatePage: React.FC =  async _ => {
    const tiposPessoa = await pegaTodasCategoriasPessoas();

    return (
        <div className={'flex justify-center pt-6 pb-12 dark:bg-customDarkBg'}>
            <CriarPessoaForm tiposPessoas={tiposPessoa}/>
        </div>
    )
}

export default PessoaCreatePage;