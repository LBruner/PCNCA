import React from "react";
import {pegaTodasCategoriasPessoas, pegaTodasPessoas} from "@/actions/pessoas";
import TabelaPessoas from "@/components/pessoas/tabela/tabela-pessoas";
import NoData from "@/components/UI/NoData";
import CustomButton from "@/components/UI/CustomButton";
import paths from "@/paths";

const PessoasPage: React.FC = async _ => {
    const pessoas = await pegaTodasPessoas();
    const tiposPessoas = await pegaTodasCategoriasPessoas();

    if (pessoas.length == 0) {
        return <NoData children={
            <CustomButton
                title={'Criar Pessoa'}
                url={paths.createPessoa()} className={'border-transparent bg-warning-500 hover:bg-warning-600 text-white'}/>}
                       description={'Nenhuma pessoa cadastrada'}
        />
    }

    const tiposPessoasMap = tiposPessoas.map(tipo => {
        return {
            uid: tipo.id.toString(),
            name: tipo.descricao
        }
    })

    return (
        <div className={'flex justify-center'}>
            <TabelaPessoas pessoas={pessoas}
                           categoryFilterCollection={[{name: 'Física', uid: '1'}, {name: 'Jurídica', uid: '2'}]}
                           tipoFilterCollection={tiposPessoasMap}/>
        </div>
    )
}

export default PessoasPage;