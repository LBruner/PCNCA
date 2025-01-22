import React from "react";
import {notFound} from "next/navigation";
import {pegaUmaNoticia, pegaArtigosRelacionados} from "@/actions/noticias";
import {generateMarkdown} from "@/helpers/noticia/criacao/criar-noticia";
import ShowNoticiaPageBody from "@/components/noticias/show-noticia-page-body";

interface NoticiaPageProps {
    params: {
        id: string;
    }
}

const NoticiaShowPage: React.FC<NoticiaPageProps> = async ({params}) => {
    const noticia = await pegaUmaNoticia(parseInt(params.id));

    const noticiasRelacionadas = await pegaArtigosRelacionados(parseInt(params.id), 4, noticia?.idCultura);

    if (!noticia) return notFound();

    const content = generateMarkdown(noticia.titulo, noticia.subtitulo, noticia.imagemLink || '', noticia.corpo);

    return (
        <div>
            <ShowNoticiaPageBody content={content} noticiasRelacionadas={noticiasRelacionadas}/>
        </div>
    );
}

export default NoticiaShowPage;