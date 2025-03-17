import React from "react";
import AdmCategoriasTable from "@/components/adm/categorias/adm-categorias-table";
import {pegaTodasCulturas} from "@/actions/culturas";
import NoItemsFallback from "@/components/shared/no-items-fallback";
import {noCulturesFallbackData} from "@/constants/messages/noticias/culturas";
import {ToastProvider} from "@heroui/toast";

const AdmCategoriasPage: React.FC = async _ => {
    const culturas = await pegaTodasCulturas();

    let renderingContent;

    if (!culturas || culturas.length == 0) {
        renderingContent = <NoItemsFallback {...noCulturesFallbackData}/>
    } else {
        renderingContent = <AdmCategoriasTable culturas={culturas}/>
    }

    return (
        <div className={'flex justify-center h-screen'}>
            <ToastProvider placement={'top-right'} maxVisibleToasts={1} toastOffset={80}/>
            {renderingContent}
        </div>
    )
}

export default AdmCategoriasPage;