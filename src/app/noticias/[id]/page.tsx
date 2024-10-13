import React from "react";
import ReactMarkdown from 'react-markdown';
import {notFound} from "next/navigation";
import { getRelatedArticles} from "@/actions/noticias";
import {generateMarkdown} from "@/helpers/noticia/criacao/criar-noticia";
import ShortNoticiaCardDetailedBottom
    from "@/components/noticias/short-noticia-card/short-noticia-card-detailed-bottom";
import {articles} from "@/dummy_data/articles";

interface NoticiaPageProps {
    params: {
        id: string;
    }
}

const NoticiaShowPage: React.FC<NoticiaPageProps> = async ({params}) => {
    // const noticia = await getNoticia(params.id);
    const noticia = articles.find((item) => item.id == params.id);
    const noticiasRelacionadas = await getRelatedArticles(params.id,6);

    if (!noticia) return notFound();

    const content = generateMarkdown(noticia.title, noticia.subtitle, noticia.imageUrl || '', noticia.content);

    return (
        <div className="mt-36 flex justify-center">
            <div className={' w-2/3'}>
                <div className={'prose prose-full'}>
                    <ReactMarkdown components={{
                        img: ({node, ...props}) => (
                            <img {...props} className="mx-auto my-4" alt={props.alt}/>
                        ),
                    }} className="markdown-body">
                        {content}
                    </ReactMarkdown>
                </div>
                {noticiasRelacionadas.length > 0 && <div className={'mt-12'}>
                    <p className={'text-2xl font-semibold text-orange-500'}>VEJA TAMBÉM:</p>
                    <div className="mt-12 mb-4 grid grid-cols-4 gap-4">
                        {noticiasRelacionadas.map(noticia => (
                            <div key={noticia.id} className="">
                                <ShortNoticiaCardDetailedBottom
                                    showDetails={true}
                                    title={noticia.thumbnailText}
                                    shortDescription={noticia.title}
                                    imageUrl={noticia.imageUrl!}
                                    id={noticia.id}
                                />
                            </div>
                        ))}
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default NoticiaShowPage;