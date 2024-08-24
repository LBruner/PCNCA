import React from "react";
import ReactMarkdown from 'react-markdown';
import {db} from "@/db";
import {notFound} from "next/navigation";

interface NoticiaPageProps{
    params: {
        id: string;
    }
}

const NoticiaShowPage: React.FC<NoticiaPageProps> = async ({params}) => {
    const noticia = await db.article.findFirst({
        where: {
            id: parseInt(params.id),
        }
    });

    if(!noticia) return notFound();

    return (
        <div className="mt-28 prose w-full max-w-screen-lg mx-auto">
            <ReactMarkdown components={{
                img: ({ node, ...props }) => (
                    <img {...props} className="mx-auto my-4" alt={props.alt} />
                ),}} className="markdown-body">
                {noticia.content}
            </ReactMarkdown>
        </div>

    );
};

export default NoticiaShowPage;