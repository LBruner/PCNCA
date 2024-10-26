import React from "react";
import {notFound} from "next/navigation";
import {getNoticia, getRelatedArticles} from "@/actions/noticias";
import {generateMarkdown} from "@/helpers/noticia/criacao/criar-noticia";
import ShowNoticiaPageBody from "@/components/noticias/show-noticia-page-body";

interface NoticiaPageProps {
    params: {
        id: string;
    }
}

const NoticiaShowPage: React.FC<NoticiaPageProps> = async ({params}) => {
    const noticia = await getNoticia(params.id);
    // const noticia = articles.find((item) => item.id == params.id);
    const noticiasRelacionadas = await getRelatedArticles(params.id,6);

    if (!noticia) return notFound();

    const content = generateMarkdown(noticia.title, noticia.subtitle, noticia.imageUrl || '', noticia.content);

    return (
        <div className="mt-36">
            <ShowNoticiaPageBody content={content} noticiasRelacionadas={noticiasRelacionadas}/>
        </div>
    );
}

export default NoticiaShowPage;