import React from "react";
import {pegaUmaPessoa} from "@/actions/pessoas";
import {notFound} from "next/navigation";
import CriarPessoaForm from "@/components/pessoas/CriarPessoaForm";

interface EditPessoaPageProps {
    params: {
        pessoaId: number
    },
}

const EditarPessoaPage: React.FC<EditPessoaPageProps> = async ({params}) => {
    const pessoa = await pegaUmaPessoa(params.pessoaId);

    if(!pessoa) return notFound();

    return (
        <div>
            <CriarPessoaForm pessoaCriada={pessoa}/>
        </div>
    )
}

export default EditarPessoaPage;