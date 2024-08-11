import React from "react";
import ReactMarkdown from 'react-markdown';
import { textoMD } from "@/app/noticias/[id]/Texto";

const NoticiaShowPage: React.FC = () => {
    return (
        <div className="mt-28 prose w-full max-w-screen-lg mx-auto">
            <ReactMarkdown components={{
                img: ({ node, ...props }) => (
                    <img {...props} className="mx-auto my-4" alt={props.alt} />
                ),}} className="markdown-body">
                {textoMD}
            </ReactMarkdown>
        </div>

    );
};

export default NoticiaShowPage;