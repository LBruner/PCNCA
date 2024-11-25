import React from "react";
import CulturasTabs from "@/components/noticias/culturas-tabs";
import Link from "next/link";
import paths from "@/paths";
import ShortNoticiaCardDetailedRight from "@/components/noticias/short-noticia-card/short-noticia-card-detailed-right";
import ShortNoticiaCardDetailedBottom
    from "@/components/noticias/short-noticia-card/short-noticia-card-detailed-bottom";
import {articles} from "@/dummy_data/articles";
import {categories} from "@/dummy_data/categories";
import {getNoticias} from "@/actions/adm";
import {getCategorias} from "@/actions/categorias";
import {Article, Category} from "@prisma/client";

const NoticiasPage: React.FC = async _ => {
    // const noticias = dados;
    const noticias = await getNoticias();
    const categorias: Category[] = await getCategorias();
    //const noticias = articles;
    // const noticias = noticiasPCNCA;


    if (!noticias || noticias.length == 0) {
        return <p className={'mt-48 font-semibold  text-center text-2xl'}>Nenhuma notícia encontrada</p>
    }


    return (
            <div className={'mt-32 flex justify-center items-center'}>
                <div className={' w-3/4'}>
                    <div className={'flex items-center justify-between'}>
                        <p className={'text-xl font-bold my-6'}>MAIS RECENTES</p>
                        <Link className={'text-green-700 text-sm'} href={paths.maisNoticias()}>
                            <p className={'font-semibold'}>Ver mais</p>
                        </Link>
                    </div>
                    <div className="grid grid-cols-4 grid-rows-8 gap-4">
                        <div className="col-span-2 row-span-8 h-80">
                            <ShortNoticiaCardDetailedRight
                                title={noticias[0].title}
                                subTitle={''}
                                imageUrl={noticias[0].imageUrl!}
                                description={''}
                                id={noticias[0].id}
                                showDetails={false}
                                from={'all-news'}
                            />
                        </div>
                        <div className="col-span-2 row-span-4 col-start-3">
                            <ShortNoticiaCardDetailedRight
                                title={noticias[1].thumbnailText}
                                subTitle={noticias[1].title}
                                imageUrl={noticias[1].imageUrl!}
                                description={noticias[1].subtitle}
                                id={noticias[1].id}
                                showDetails={true}
                                from={'all-news'}
                            />
                        </div>
                        <div className="col-span-2 row-span-4 col-start-3 row-start-5">
                            <ShortNoticiaCardDetailedRight
                                title={noticias[2].thumbnailText}
                                subTitle={noticias[2].title}
                                imageUrl={noticias[2].imageUrl!}
                                description={noticias[2].subtitle}
                                id={noticias[2].id}
                                showDetails={true}
                                from={'all-news'}
                            />
                        </div>
                        {noticias.slice(4, 8).map((noticia: Article) => (
                            <div key={noticia.id} className="row-span-2 row-start-9">
                                <ShortNoticiaCardDetailedBottom
                                    showDetails={true}
                                    title={noticia.thumbnailText}
                                    shortDescription={noticia.title}
                                    imageUrl={noticia.imageUrl!}
                                    id={noticia.id}
                                    from={'all-news'}
                                />
                            </div>
                        ))}
                        <CulturasTabs noticias={noticias} categorias={categorias.reverse().slice(0, 4)}/>
                    </div>
                </div>
            </div>
    )
}

export default NoticiasPage;
