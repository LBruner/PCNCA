import React from "react";
import {getCategorias} from "@/actions/categorias";
import NoItemsFallback from "@/components/shared/no-items-fallback";
import CulturaPageBody from "@/components/noticias/culturas/cultura-page-body";
import {noCulturesFallbackData} from "@/constants/messages/noticias/culturas";
import {Category} from "@prisma/client";


const CategoriasPage: React.FC = async _ => {
    const categorias: Category[] = await getCategorias();

    let renderingContent;

    if (!categorias || categorias.length == 0) {
        renderingContent = <NoItemsFallback {...noCulturesFallbackData}/>
    } else {
        renderingContent = <CulturaPageBody categorias={categorias}/>;
    }

    return (
        <div className={'mt-36'}>
            {renderingContent}
        </div>
    );
}

export default CategoriasPage;