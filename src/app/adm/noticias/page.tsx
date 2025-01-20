import React from "react";
import AdmNoticiasTable from "@/components/adm/noticias/adm-noticias-table";
import {getAutoresFilterColletion, getCategoriasFilterColletion} from "@/actions/adm";
import {pegaTodasNoticias} from "@/actions/noticias";

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