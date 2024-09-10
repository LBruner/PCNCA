import React from "react";
import LargeNoticiaCard from "@/components/noticias/large-noticia-card/large-noticia-card";
import {getNoticias} from "@/actions/noticias";
import {notFound} from "next/navigation";

interface CulturaShowPageProps {
    params: {
        id: string;
    }
}

const CulturaShowPage: React.FC<CulturaShowPageProps> = async ({params: {id}}) => {

    const noticiasFiltradas = await getNoticias({categoryId: id});

    if (noticiasFiltradas.length == 0) {
        return notFound();
    }

    return (
        <div className={'mt-32'}>
            <div className={'flex flex-col gap-12'}>
                {noticiasFiltradas.map((noticia) => (
                    <LargeNoticiaCard id={noticia.id} title={noticia.title} imageUrl={noticia.imageUrl!} content={noticia.content}
                                      date={noticia.publishedAt.toString()} key={noticia.id}/>
                ))}
            </div>
        </div>
    )
}

export default CulturaShowPage;