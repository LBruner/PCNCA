import React from "react";
import '@mdxeditor/editor/style.css';
import NoticiaCreateForm from "@/components/noticias/criacao/noticia-create-form";
import NotFound from "next/dist/client/components/not-found-error";
import {pegaCulturasUnicas} from "@/actions/adm";
import {pegaUmaNoticia} from "@/actions/noticias";

interface EditNoticiaPageProps {
    params: {
        noticiaId: string
    },
}

const EditNoticiaPage: React.FC<EditNoticiaPageProps> = async ({params}) => {
    const categories = await pegaCulturasUnicas();
    const noticiaId = params.noticiaId;    let createdNoticia;

    if (noticiaId) {
        createdNoticia = await pegaUmaNoticia(parseInt(params.noticiaId));
    }

    if (!createdNoticia) {
        return NotFound();
    }

    return (
        <div className={'ml-64 flex justify-center mt-12'}>
            <NoticiaCreateForm culturas={categories} noticiaCriada={createdNoticia}/>
        </div>
    );
};

export default EditNoticiaPage;