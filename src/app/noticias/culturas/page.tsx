import React from "react";
import {pegaTodasCulturas} from "@/actions/culturas";
import CulturaPageBody from "@/components/noticias/culturas/cultura-page-body";
import {Cultura} from "@prisma/client";
import EmptyState from "@/components/UI/NoData";
import {db} from "@/db";


const CategoriasPage: React.FC = async _ => {
    const categorias: Cultura[] = await pegaTodasCulturas();

    if(categorias.length == 0)
    {
        return <EmptyState description={'Nenhuma categoria cadastrada'}/>
    }

    return (
        <div>
            <CulturaPageBody culturas={categorias}/>
        </div>
    );
}

export default CategoriasPage;

export async function generateStaticParams (){
    return (await db.cultura.findMany()).map((cultura) => {
        return {
            id: cultura.culturaId.toString(),
        }
    })
}