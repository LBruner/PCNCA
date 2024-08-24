import React from "react";
import Image from "next/image";
import Link from "next/link";
import paths from "@/paths";

interface NoticiaCardProps {
    title: string;
    imageUrl: string;
    id: number;
}

const NoticiaImagemWrapper: React.FC<NoticiaCardProps> = ({title, imageUrl, id}) => {
    return (
            <div className="relative flex rounded-md overflow-hidden w-auto h-full">
                <Image
                    src={imageUrl}
                    alt="Milho"
                    fill={true}
                    className="object-cover"
                />
                <div
                    className="flex items-center justify-start absolute bottom-0 left-0 w-full bg-green-950 bg-opacity-70 text-white p-2 h-[25%]">
                    <p className="text-xl">{title}</p>
                </div>
            </div>
    );
};

export default NoticiaImagemWrapper;
