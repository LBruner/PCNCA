import React from "react";
import CriarPessoaForm from "@/components/pessoas/CriarPessoaForm";

const PessoaCreatePage: React.FC = _ => {
    return (
        <div className={'mt-36 flex justify-center'}>
            <CriarPessoaForm/>
        </div>
    )
}

export default PessoaCreatePage;