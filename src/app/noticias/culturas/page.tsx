import React from "react";
import {pegaTodasCulturas} from "@/actions/culturas";
import CulturaPageBody from "@/components/noticias/culturas/cultura-page-body";
import {Cultura} from "@prisma/client";
import EmptyState from "@/components/UI/NoData";


const CategoriasPage: React.FC = async _ => {
    const categorias: Cultura[] = await pegaTodasCulturas();

    if(categorias.length == 0)
    {
        return <EmptyState description={'Nenhuma categoria cadastrada'}/>
    }

    return (
        <div className={'mt-36'}>
            <CulturaPageBody culturas={categorias}/>
        </div>
    );
}

export default CategoriasPage;