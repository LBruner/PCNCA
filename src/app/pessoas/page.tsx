import React from "react";
import {pegaTodasCategoriasPessoas, pegaTodasPessoas} from "@/actions/pessoas";
import TabelaPessoas from "@/components/pessoas/tabela/tabela-pessoas";
import {FilterCollection} from "@/models/shared/FilterCollection";

const PessoasPage: React.FC = async _ => {
    const pessoas = await pegaTodasPessoas();
    const categoriasPessoas = await pegaTodasCategoriasPessoas();

    if (!pessoas) {
        return <div>Nenhuma pessoa encontrada</div>
    }

    const categoriaPessoaFilterCollection: FilterCollection[] = categoriasPessoas.map((categoriaPessoa) => {
        return {
            uid: categoriaPessoa.id.toString(),
            name: categoriaPessoa.titulo
        }
    })

    return (
        <div className={'mt-36 flex justify-center'}>
            <TabelaPessoas pessoas={pessoas} categoryFilterCollection={categoriaPessoaFilterCollection}/>
        </div>
    )
}

export default PessoasPage;