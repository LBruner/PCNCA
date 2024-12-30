import React from "react";
import {pegaTodasPessoas} from "@/actions/pessoas";
import TabelaPessoas from "@/components/pessoas/tabela/tabela-pessoas";

const PessoasPage: React.FC = async _ => {
    const pessoas = await pegaTodasPessoas();

    if (!pessoas) {
        return <div>Nenhuma pessoa encontrada</div>
    }

    return (
        <div className={'mt-36 flex justify-center'}>
            <TabelaPessoas pessoas={pessoas} categoryFilterCollection={[{name: 'Física', uid: '1'}, {name: 'Jurídica', uid: '2'}]}/>
        </div>
    )
}

export default PessoasPage;