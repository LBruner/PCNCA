import React from "react";
import AdmCategoriasTable from "@/components/adm/categorias/adm-categorias-table";
import {getAllCategories} from "@/actions/categorias";
import NoItemsFallback from "@/components/shared/no-items-fallback";
import {noCulturesFallbackData} from "@/constants/messages/noticias/culturas";

const AdmCategoriasPage: React.FC = async _ => {
    const categorias = await getAllCategories();

    let renderingContent;

    if (!categorias || categorias.length == 0) {
        renderingContent = <NoItemsFallback {...noCulturesFallbackData}/>
    } else {
        renderingContent = <AdmCategoriasTable categorias={categorias}/>
    }


    return (
        <div className={'flex justify-center'}>
            {renderingContent}
        </div>
    )
}

export default AdmCategoriasPage;