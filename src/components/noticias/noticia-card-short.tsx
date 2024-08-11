import React from "react";
import NoticiaCard from "@/components/noticias/noticia-card";

interface NoticiaCardShortProps {
    title: string;
    subTitle: string;
    description: string;
    imageUrl: string;
}
const NoticiaCardShort: React.FC<NoticiaCardShortProps> = ({ title,imageUrl,subTitle,description}) => {
    return (
        <div className="flex flex-1">
            <div className="w-1/2 relative h-[100%]">
                <NoticiaCard title={title} imageUrl={imageUrl}/>
            </div>
            <div className="w-1/2 flex flex-col gap-0 items-start justify-start">
                <div className="px-4">
                    <p className={'font-bold'}>{subTitle}</p>
                </div>
                <div className="px-4">
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoticiaCardShort;