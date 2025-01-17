import React from "react";
import CriarPessoaForm from "@/components/pessoas/CriarPessoaForm";
import {pegaTodosTiposPessoa} from "@/actions/pessoas";

const PessoaCreatePage: React.FC =  async _ => {
    const tiposPessoa = await pegaTodosTiposPessoa();

    return (
        <div className={'mt-36 flex justify-center'}>
            <CriarPessoaForm tiposPessoas={tiposPessoa}/>
        </div>
    )
}

export default PessoaCreatePage;