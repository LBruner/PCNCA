import React from "react";
import {pegaTodasCategoriasPessoas, pegaUmaPessoa} from "@/actions/pessoas";
import {notFound} from "next/navigation";
import CriarPessoaForm from "@/components/pessoas/CriarPessoaForm";

interface EditPessoaPageProps {
    params: Promise<{
        pessoaId: number;
    }>,
}

const EditarPessoaPage: React.FC<EditPessoaPageProps> = async ({params}) => {
    const pessoaId = (await params).pessoaId;
    const pessoa = await pegaUmaPessoa(pessoaId);
    const tiposPessoa = await pegaTodasCategoriasPessoas();

    if(!pessoa) return notFound();

    return (
        <div>
            <CriarPessoaForm pessoaCriada={pessoa} tiposPessoas={tiposPessoa}/>
        </div>
    )
}

export default EditarPessoaPage;