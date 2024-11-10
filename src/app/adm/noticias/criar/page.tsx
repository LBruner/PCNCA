import React from "react";
import '@mdxeditor/editor/style.css';
import NoticiaCreateForm from "@/components/noticias/criacao/noticia-create-form";
import {getCategorias} from "@/actions/categorias";

const CreateNoticiaPage: React.FC = async () => {
    const categories = await getCategorias();

    return (
        <div className={'ml-64 h-full flex justify-center mt-12'}>
            <NoticiaCreateForm categories={categories}/>
        </div>
    );
};

export default CreateNoticiaPage;