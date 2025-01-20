import React from "react";
import '@mdxeditor/editor/style.css';
import NoticiaCreateForm from "@/components/noticias/criacao/noticia-create-form";
import {pegaCulturasUnicas} from "@/actions/adm";

const CreateNoticiaPage: React.FC = async () => {
    const culturas = await pegaCulturasUnicas();

    return (
        <div className={'ml-64 h-full flex justify-center mt-12'}>
            <NoticiaCreateForm culturas={culturas}/>
        </div>
    );
};

export default CreateNoticiaPage;