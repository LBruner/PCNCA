import React from "react";
import {pegaTodasCategoriasPessoas, pegaTodasPessoas} from "@/actions/pessoas";
import TabelaPessoas from "@/components/pessoas/tabela/tabela-pessoas";
import NoData from "@/components/UI/NoData";
import CustomButton from "@/components/UI/CustomButton";
import paths from "@/paths";
import {ToastProvider} from "@heroui/toast";

const PessoasPage: React.FC = async _ => {
    const pessoas = await pegaTodasPessoas();
    const tiposPessoas = await pegaTodasCategoriasPessoas();

    if (pessoas.length == 0) {
        return <NoData
            description={'Nenhuma pessoa cadastrada'}
        ><CustomButton
            title={'Criar Pessoa'}
            url={paths.createPessoa()} className={'border-transparent bg-warning-500 hover:bg-warning-600 text-white'}/>
        </NoData>
    }

    const tiposPessoasMap = tiposPessoas.map(tipo => {
        return {
            uid: tipo.id.toString(),
            name: tipo.descricao
        }
    })

    return (
        <div className={'flex justify-center pt-6 pb-12 dark:bg-customDarkBg'}>
            <ToastProvider placement={'top-right'} maxVisibleToasts={1} toastOffset={80}/>
            <TabelaPessoas pessoas={pessoas}
                           categoryFilterCollection={[{name: 'Física', uid: '1'}, {name: 'Jurídica', uid: '2'}]}
                           tipoFilterCollection={tiposPessoasMap}/>
        </div>
    )
}

export default PessoasPage;