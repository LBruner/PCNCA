import React from "react";
import CulturasTabs from "@/components/noticias/culturas-tabs";
import Link from "next/link";
import paths from "@/paths";
import ShortNoticiaCardDetailedRight from "@/components/noticias/short-noticia-card/short-noticia-card-detailed-right";
import ShortNoticiaCardDetailedBottom
    from "@/components/noticias/short-noticia-card/short-noticia-card-detailed-bottom";
import {Cultura, Noticia} from "@prisma/client";
import {pegaTodasNoticias} from "@/actions/noticias";
import NoData from "@/components/UI/NoData";
import {pegaCulturasUnicas} from "@/actions/adm";

const NoticiasPage: React.FC = async _ => {
    const noticias = await pegaTodasNoticias();
    const culturas: Cultura[] = await pegaCulturasUnicas();

    if (!noticias || noticias.length == 0) {
        return <NoData description={'Nenhuma notícia encontrada'}/>
    }

    return (
            <div className={'mt-32 flex justify-center items-center'}>
                <div className={' w-3/4'}>
                    <div className={'flex items-center justify-between'}>
                        <p className={'text-2xl font-bold my-6'}>MAIS RECENTES</p>
                        <Link className={'text-green-700 text-sm'} href={paths.maisNoticias()}>
                            <p className={'font-semibold text-lg'}>Ver mais</p>
                        </Link>
                    </div>
                    <div className="grid grid-cols-4 grid-rows-8 gap-4">
                        <div className="col-span-2 row-span-8 h-80">
                            <ShortNoticiaCardDetailedRight
                                title={noticias[0].titulo}
                                subTitle={''}
                                imageUrl={noticias[0].imagemLink!}
                                description={''}
                                id={noticias[0].notId}
                                showDetails={false}
                                from={'all-news'}
                            />
                        </div>
                        <div className="col-span-2 row-span-4 col-start-3">
                            <ShortNoticiaCardDetailedRight
                                title={noticias[1].descricao ?? 'Novidade'}
                                subTitle={noticias[1].titulo}
                                imageUrl={noticias[1].imagemLink!}
                                description={noticias[1].subtitulo}
                                id={noticias[1].notId}
                                showDetails={true}
                                from={'all-news'}
                            />
                        </div>
                        <div className="col-span-2 row-span-4 col-start-3 row-start-5">
                            <ShortNoticiaCardDetailedRight
                                title={noticias[2].descricao ?? 'Novidade'}
                                subTitle={noticias[2].titulo}
                                imageUrl={noticias[2].imagemLink!}
                                description={noticias[2].subtitulo}
                                id={noticias[2].notId}
                                showDetails={true}
                                from={'all-news'}
                            />
                        </div>
                        {noticias.slice(4, 8).map((noticia: Noticia) => (
                            <div key={noticia.notId} className="row-span-2 row-start-9">
                                <ShortNoticiaCardDetailedBottom
                                    showDetails={true}
                                    title={noticia.descricao ?? 'Novidade'}
                                    shortDescription={noticia.titulo}
                                    imageUrl={noticia.imagemLink!}
                                    id={noticia.notId}
                                    from={'all-news'}
                                />
                            </div>
                        ))}
                        <CulturasTabs noticias={noticias} culturas={culturas.reverse().slice(0, 4)}/>
                    </div>
                </div>
            </div>
    )
}

export default NoticiasPage;
