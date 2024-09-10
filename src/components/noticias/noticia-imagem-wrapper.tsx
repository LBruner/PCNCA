import React from "react";
import Image from "next/image";

interface NoticiaCardProps {
    title?: string;
    imageUrl: string;
    showDetails?: boolean;
    classes?: string;
}

const NoticiaImagemWrapper: React.FC<NoticiaCardProps> = ({title, imageUrl,showDetails, classes}) => {
    return (
            <div className={`relative flex rounded-md overflow-hidden w-auto h-full ${classes}`}>
                <Image
                    src={imageUrl}
                    alt={title ?? 'Sem legenda'}
                    fill={true}
                    className="object-cover"
                />
                {showDetails && <div
                    className="flex items-center justify-start absolute bottom-0 left-0 w-full bg-green-950 bg-opacity-70 text-white p-2 h-[25%]">
                    <p className="text-xl">{title}</p>
                </div>}
            </div>
    );
};

export default NoticiaImagemWrapper;
