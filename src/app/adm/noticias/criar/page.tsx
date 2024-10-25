import React from "react";
import '@mdxeditor/editor/style.css';
import {getCategorias} from "@/actions/noticias";
import NoticiaCreateForm from "@/components/noticias/criacao/noticia-create-form";

const CreateNoticiaPage: React.FC = async () => {
    const categories = await getCategorias();

    return (
        <div className={'ml-64 flex justify-center mt-12'}>
            <NoticiaCreateForm categories={categories}/>
        </div>
    );
};

export default CreateNoticiaPage;