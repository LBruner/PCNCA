'use client';
import React from "react";
import ReactMarkdown from "react-markdown";
import ShortNoticiaCardDetailedBottom
    from "@/components/noticias/short-noticia-card/short-noticia-card-detailed-bottom";
import {useSearchParams} from "next/navigation";
import paths from "@/paths";
import CustomBreadcumbs from "@/components/custom-breadcumbs";
import {Noticia} from "@prisma/client";

interface ShowNoticiaPageBodyProps {
    content: string;
    noticiasRelacionadas: Noticia[];
}

const getBreadcumbs = (fromPage: string) => {
    if (!fromPage) {
        return [];
    }
    const fromPageUrl = fromPage.split('/');
    console.log(fromPageUrl)
    if (fromPageUrl[0] === 'culturas') {
        return [
            {title: 'Todas Notícias', href: paths.noticias()},
            {title: 'Todas Culturas', href: paths.culturas()},
            {title: fromPageUrl[1], href: paths.getCultura(parseInt(fromPageUrl[2]))},
            {title: 'Notícia', href: paths.culturas()},
        ];
    }
    if (fromPageUrl[0] === 'all-news') {
        return [
            {title: 'Todas Notícias', href: paths.noticias()},
            {title: 'Notícia', href: paths.culturas()},
        ];
    }
    if (fromPageUrl[0] === 'mais-noticias') {
        return [
            {title: 'Todas Notícias', href: paths.noticias()},
            {title: 'Mais Notícias', href: paths.maisNoticias()},
            {title: 'Notícia', href: paths.culturas()},
        ];
    }
    return [];
}

const ShowNoticiaPageBody: React.FC<ShowNoticiaPageBodyProps> = ({content, noticiasRelacionadas}) => {
    const searchParams = useSearchParams();
    const from = searchParams.get('from')

    return (
        <>
            <CustomBreadcumbs breadcumbs={getBreadcumbs(from!)}/>
            <div className={'flex justify-center flex-col items-center'}>
                <div className={'w-2/3'}>
                    <div className={'prose prose-full'}>
                        <ReactMarkdown components={{
                            img: ({node, ...props}) => (
                                <img {...props} className="mx-auto my-4" alt={props.alt}/>
                            ),
                        }} className="markdown-body text-xl">
                            {content}
                        </ReactMarkdown>
                    </div>
                    {noticiasRelacionadas.length > 0 && <div className={'mt-12'}>
                        <p className={'text-2xl font-semibold text-orange-500'}>VEJA TAMBÉM:</p>
                        <div className="mt-12 mb-4 grid grid-cols-4 gap-4">
                            {noticiasRelacionadas.map(noticia => (
                                <div key={noticia.notId} className="">
                                    <ShortNoticiaCardDetailedBottom
                                        showDetails={true}
                                        title={noticia.descricao!}
                                        shortDescription={noticia.titulo}
                                        imageUrl={noticia.imagemLink!}
                                        id={noticia.notId}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default ShowNoticiaPageBody;
