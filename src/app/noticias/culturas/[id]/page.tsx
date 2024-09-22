import React from "react";
import LargeNoticiaCard from "@/components/noticias/large-noticia-card/large-noticia-card";
import {getNoticias} from "@/actions/noticias";
import {notFound} from "next/navigation";
import {Pagination} from "@nextui-org/react";
import {articles} from "@/dummy_data/articles";

interface CulturaShowPageProps {
    params: {
        id: string;
    }
}

const CulturaShowPage: React.FC<CulturaShowPageProps> = async ({params: {id}}) => {

    // const noticiasFiltradas = await getNoticias({categoryId: id});
    const noticiasFiltradas = articles.filter((article) => article.categoryId == id);

    if (noticiasFiltradas.length == 0) {
        return notFound();
    }

    return (
        <div className={'mt-32'}>
            <div className={'flex flex-col gap-12 my-12'}>
                {noticiasFiltradas.map((noticia) => (
                    <LargeNoticiaCard id={noticia.id} title={noticia.title} imageUrl={noticia.imageUrl!}
                                      content={noticia.content}
                                      date={noticia.publishedAt.toString()} key={noticia.id}/>
                ))}
            </div>

            <div className={'flex justify-center mb-12'}>
                <Pagination total={2}/>
            </div>
        </div>
    )
}

export default CulturaShowPage;