import React from "react";
import NoticiaImagemWrapper from "@/components/noticias/noticia-imagem-wrapper";
import Link from "next/link";
import paths from "@/paths";

interface NoticiaCardShortProps {
    title: string;
    subTitle: string;
    description: string;
    imageUrl: string;
    id: number;
    showDetails?: boolean;
}

const NoticiaCardDetailedRight: React.FC<NoticiaCardShortProps> = (
    {
        title,
        imageUrl,
        subTitle,
        description,
        id,
        showDetails
    }
) => {
    return (
        <Link href={paths.showNoticia(id)} className={'grid grid-cols-4 grid-rows-2 gap-4 h-full'}>
            <div className={`${showDetails ? 'row-span-2 col-span-2' : 'row-span-4 col-span-4'}`}>
                <NoticiaImagemWrapper title={title} imageUrl={imageUrl} id={id}/>
            </div>
            {showDetails &&
                <div className="row-span-2 col-span-2 justify-start items-start">
                    <p className={'font-bold overflow-ellipsis'}>{subTitle}</p>
                    <p>{description}</p>
                </div>}
        </Link>
    )
}

export default NoticiaCardDetailedRight;