import React from "react";
import AdmNoticiasTable from "@/components/adm/noticias/adm-noticias-table";
import {getAutoresFilterColletion, getCategoriasFilterColletion} from "@/actions/adm";
import {pegaTodasNoticias} from "@/actions/noticias";
import {db} from "@/db";

const AdmNoticiasPage: React.FC = async _ => {
    const noticias = await pegaTodasNoticias();
    const autoresUnicos = await getAutoresFilterColletion();
    const categoriasUnicas = await getCategoriasFilterColletion();

    return (
        <div className={'flex justify-center'}>
            <AdmNoticiasTable categoryFilterCollection={categoriasUnicas} authorFilterCollection={autoresUnicos} noticias={noticias}/>
        </div>
    )
}

export default AdmNoticiasPage;

export async function generateStaticParams(){
    const noticias = await db.noticia.findMany();

    return noticias.map((noticia) => {
        return {
            id: noticia.notId.toString(),
        }
    })
}