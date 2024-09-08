import React from "react";
import ReactMarkdown from 'react-markdown';
import {notFound} from "next/navigation";
import {getNoticia} from "@/actions/noticias";
import {generateMarkdown} from "@/helpers/noticia/criacao/criar-noticia";

interface NoticiaPageProps {
    params: {
        id: string;
    }
}

const NoticiaShowPage: React.FC<NoticiaPageProps> = async ({params}) => {
    const noticia = await getNoticia(params.id);

    if (!noticia) return notFound();

    const content = generateMarkdown(noticia.title, noticia.subtitle, noticia.imageUrl || '', noticia.content);

    return (
        <div className="mt-28 prose w-full max-w-screen-lg mx-auto">
            <ReactMarkdown components={{
                img: ({node, ...props}) => (
                    <img {...props} className="mx-auto my-4" alt={props.alt}/>
                ),
            }} className="markdown-body">
                {content}
            </ReactMarkdown>
        </div>
    );
}

export default NoticiaShowPage;