import React from "react";
import Image from "next/image";

interface NoticiaCardProps {
    title: string;
    imageUrl: string;
}
const NoticiaCard: React.FC<NoticiaCardProps> = ({ title,imageUrl }) => {
    return (
        <div className="relative flex border-1 rounded-md overflow-hidden w-full h-full">
            <Image
                src={imageUrl}
                alt="Milho"
                fill={true}
                className="object-cover"
            />
            <div className="flex items-center justify-start absolute bottom-0 left-0 w-full bg-green-950 bg-opacity-70 text-white p-2 h-[25%]">
                <p className="text-xl">{title}</p>
            </div>
        </div>
    );
};

export default NoticiaCard;
