'use client';
import React from "react";
import ReactMarkdown from "react-markdown";
import ShortNoticiaCardDetailedBottom
    from "@/components/noticias/short-noticia-card/short-noticia-card-detailed-bottom";
import paths from "@/paths";
import CustomBreadcumbs from "@/components/custom-breadcumbs";
import {Noticia} from "@prisma/client";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface ShowNoticiaPageBodyProps {
    content: string;
    noticiasRelacionadas: Noticia[];
    from?: string;
}

const getBreadcumbs = (fromPage: string) => {
    if (!fromPage) {
        return [];
    }
    const fromPageUrl = fromPage.split('/');
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

const ShowNoticiaPageBody: React.FC<ShowNoticiaPageBodyProps> = ({content, noticiasRelacionadas, from}) => {

    return (
        <>
            <CustomBreadcumbs breadcumbs={getBreadcumbs(from!)}/>
            <div className={'flex justify-center flex-col items-center'}>
                <div className={'w-2/3'}>
                    <div className={'prose prose-full'}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                img: ({node, ...props}) => (
                                    <img {...props} className="mx-auto my-4" alt={props.alt}/>
                                ),
                                h1: ({node, children, ...props}) => (
                                    <h1 className="dark:text-green-600 text-green-700" {...props}>
                                        {children}
                                    </h1>
                                ),
                                strong: ({node, children, ...props}) => (
                                    <strong className="dark:text-white" {...props}>
                                        {children}
                                    </strong>
                                ),
                                u: ({node, children, ...props}) => (
                                    <u className="dark:text-white" {...props}>
                                        {children}
                                    </u>
                                ),
                            }}
                            className="markdown-body text-xl dark:text-white"
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                    {noticiasRelacionadas.length > 0 && <div className={'mt-24'}>
                        <p className={'text-2xl font-semibold text-orange-400 dark:text-orange-400'}>VEJA TAMBÉM:</p>
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
