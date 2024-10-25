import React from "react";
import '@mdxeditor/editor/style.css';
import {getCategorias, getNoticiaById} from "@/actions/noticias";
import NoticiaCreateForm from "@/components/noticias/criacao/noticia-create-form";
import NotFound from "next/dist/client/components/not-found-error";

interface EditNoticiaPageProps {
    params: {
        noticiaId: string
    },
}

const EditNoticiaPage: React.FC<EditNoticiaPageProps> = async ({params}) => {
    const categories = await getCategorias();
    const noticiaId = params.noticiaId;
    let createdNoticia;

    if (noticiaId) {
        createdNoticia = await getNoticiaById(noticiaId);
    }

    if (!createdNoticia) {
        return NotFound();
    }

    return (
        <div className={'ml-64 flex justify-center mt-12'}>
            <NoticiaCreateForm categories={categories} createdNoticia={createdNoticia}/>
        </div>
    );
};

export default EditNoticiaPage;