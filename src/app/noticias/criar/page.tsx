import React from "react";
import '@mdxeditor/editor/style.css';
import {getCategorias} from "@/actions/noticias";
import NoticiaCreateForm from "@/components/noticias/criacao/noticia-create-form";

const CreateNoticiaPage: React.FC = async () => {
    const categories = await getCategorias();
    return (
        <NoticiaCreateForm categories={categories}/>
    );
};

export default CreateNoticiaPage;