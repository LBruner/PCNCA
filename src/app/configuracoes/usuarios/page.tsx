import React from "react";
import NoData from "@/components/UI/NoData";
import {pegaTodosUsuarios} from "@/actions/usuarios";
import TabelaUsuarios from "@/components/adm/usuarios/TabelaUsuarios";
import {pegaTodasEmpresas} from "@/actions/empresas";
import {FilterCollection} from "@/models/shared/FilterCollection";

const page: React.FC = async _ => {
    const usuarios = await pegaTodosUsuarios();
    const empresas = await pegaTodasEmpresas();

    if (!usuarios || usuarios.length == 0) {
        return <NoData description={'Nenhuma notícia encontrada'}/>
    }

    const empresasFilterCollection: FilterCollection[] = empresas.map((empresa) => ({
        name: empresa.nome.toString(),
        uid: empresa.nome.toString()
    }))


    return (
        <div className={'ml-64 mt-12 flex justify-center'}>
            <TabelaUsuarios usuarios={usuarios} empresasFilterCollection={empresasFilterCollection}/>
        </div>
    )
}

export default page;