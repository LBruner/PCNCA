import React from "react";
import {notFound} from "next/navigation";
import {pegaUmaNoticia, pegaArtigosRelacionados} from "@/actions/noticias";
import {generateMarkdown} from "@/helpers/noticia/criacao/criar-noticia";
import ShowNoticiaPageBody from "@/components/noticias/show-noticia-page-body";
import {db} from "@/db";

interface NoticiaPageProps {
    params: Promise<{ id: string }>,
    searchParams: Promise<{from?: string}>
}

const NoticiaShowPage: React.FC<NoticiaPageProps> = async ({params,searchParams}) => {
    const noticiaId = (await params).id;
    const noticia = await pegaUmaNoticia(parseInt(noticiaId));

    const noticiasRelacionadas = await pegaArtigosRelacionados(parseInt(noticiaId), 4, noticia?.idCultura);

    if (!noticia) return notFound();

    const content = generateMarkdown(noticia.titulo, noticia.subtitulo, noticia.imagemLink || '', noticia.corpo);

    const searchParam = await searchParams;

    return (
        <div>
            <ShowNoticiaPageBody content={content} noticiasRelacionadas={noticiasRelacionadas} from={searchParam.from}/>
        </div>
    );
}

export default NoticiaShowPage;

export async function generateStaticParams (){
    return (await db.noticia.findMany()).map((noticia) => {
        return {
            id: noticia.notId.toString(),
        }
    })
}