import React from "react";
import NoticiaImagemWrapper from "@/components/noticias/noticia-imagem-wrapper";
import Image from "next/image";
import Link from "next/link";
import paths from "@/paths";

interface NoticiaCardProps {
    title: string;
    shortDescription: string;
    imageUrl: string;
    id: number;
    showDetails?: boolean;
}

const NoticiaCardDetailedBottom: React.FC<NoticiaCardProps> = ({title, imageUrl, id, shortDescription,showDetails,}) => {
    return (
        <Link href={paths.showNoticia(id)}>
            <div className="flex flex-1 flex-col h-72 w-full">
                <div className={`relative ${showDetails ? 'h-[11.6rem] w-full' : 'w-full'}`}>
                    <NoticiaImagemWrapper title={title} imageUrl={imageUrl} id={id}/>
                </div>
                {showDetails && <div className="flex flex-col items-start justify-start">
                    <div className="mt-2">
                        <p className={'font-bold'}>{shortDescription}</p>
                    </div>
                </div>}
            </div>
        </Link>
    )
}

export default NoticiaCardDetailedBottom;