import React from "react";
import NoticiaImagemWrapper from "@/components/noticias/noticia-imagem-wrapper";
import Link from "next/link";
import paths from "@/paths";

interface NoticiaCardProps {
    title: string;
    shortDescription: string;
    imageUrl: string;
    id: number;
    showDetails?: boolean;
    height?: string;
    isClicable?: boolean
}

const ShortNoticiaCardDetailedBottom: React.FC<NoticiaCardProps> = (
    {
        title,
        imageUrl,
        id,
        shortDescription,
        showDetails,
        height,
        isClicable = true
    }
) => {

    const contentToRender =
        <div className="flex flex-1 flex-col h-full w-full">
            <div className={`relative ${showDetails ? `${height ? height : 'h-[11.6rem]'}  w-full` : 'w-full'}`}>
                <NoticiaImagemWrapper showDetails={true} title={title} imageUrl={imageUrl}/>
            </div>
            {showDetails && <div className="flex flex-col items-start justify-start">
                <div className="mt-2">
                    <p className={'font-bold'}>{shortDescription}</p>
                </div>
            </div>}
        </div>

    if (!isClicable) {
        return (
            contentToRender
        );
    }

    return (
        <Link href={paths.showNoticia(id)}>
            {contentToRender}
        </Link>
    )
}

export default ShortNoticiaCardDetailedBottom;