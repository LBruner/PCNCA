import React from "react";
import AdmNoticiasTable from "@/components/adm/noticias/adm-noticias-table";
import {getAutoresFilterColletion, getCategoriasFilterColletion, getNoticias} from "@/actions/adm";

const AdmNoticiasPage: React.FC = async _ => {
    const noticias = await getNoticias();
    const autoresUnicos = await getAutoresFilterColletion();
    const categoriasUnicas = await getCategoriasFilterColletion();

    console.log(autoresUnicos)
    return (
        <div className={'flex justify-center'}>
            <AdmNoticiasTable categoryFilterCollection={categoriasUnicas} authorFilterCollection={autoresUnicos} noticias={noticias}/>
        </div>
    )
}

export default AdmNoticiasPage;