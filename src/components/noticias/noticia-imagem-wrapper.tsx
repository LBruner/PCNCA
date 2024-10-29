'use client';

import React, {useEffect, useState} from "react";
import Image from "next/image";
import {fallbackImgUrl} from "@/constants/messages/images";

interface NoticiaCardProps {
    title?: string;
    imageUrl: string;
    showDetails?: boolean;
    classes?: string;
}

const NoticiaImagemWrapper: React.FC<NoticiaCardProps> = ({title, imageUrl, showDetails, classes}) => {
    const placeholderUrl = fallbackImgUrl;
    const [url, setUrl] = useState(imageUrl);

    useEffect(() => {
        const isImageValid = imageUrl.startsWith('http') || imageUrl.startsWith('/');
        setUrl(isImageValid ? imageUrl : placeholderUrl);
    }, [imageUrl, placeholderUrl]);

    return (
        <div className={`relative flex rounded-md overflow-hidden w-auto h-full ${classes}`}>
            <Image
                src={url}
                alt="Preview"
                fill
                onError={() => setUrl(placeholderUrl)}
            />
            {showDetails && (
                <div
                    className="flex items-center justify-start absolute bottom-0 left-0 w-full bg-green-950 bg-opacity-70 text-white p-2 h-[25%]">
                    <p className="text-xl">{title}</p>
                </div>
            )}
        </div>
    );
};

export default NoticiaImagemWrapper;
