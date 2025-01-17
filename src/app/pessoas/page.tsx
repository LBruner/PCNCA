import React from "react";
import {pegaTodasPessoas, pegaTodosTiposPessoa} from "@/actions/pessoas";
import TabelaPessoas from "@/components/pessoas/tabela/tabela-pessoas";

const PessoasPage: React.FC = async _ => {
    const pessoas = await pegaTodasPessoas();
    const tiposPessoas = await pegaTodosTiposPessoa();

    if (!pessoas) {
        return <div>Nenhuma pessoa encontrada</div>
    }

    const tiposPessoasMap = tiposPessoas.map(tipo => {
        return {
            uid: tipo.id.toString(),
            name: tipo.nome
        }
    })

    return (
        <div className={'mt-40 flex justify-center'}>
            <TabelaPessoas pessoas={pessoas} categoryFilterCollection={[{name: 'Física', uid: '1'}, {name: 'Jurídica', uid: '2'}]} tipoFilterCollection={tiposPessoasMap}/>
        </div>
    )
}

export default PessoasPage;