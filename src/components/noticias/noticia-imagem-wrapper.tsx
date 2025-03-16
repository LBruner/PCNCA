'use client';

import React, {useEffect, useState} from "react";
import Image from "next/image";

interface NoticiaCardProps {
    title?: string;
    imageUrl: string;
    showDetails?: boolean;
    classes?: string;
}

const NoticiaImagemWrapper: React.FC<NoticiaCardProps> = ({ title, imageUrl, showDetails, classes }) => {
    const placeholderUrl = 'https://placehold.co/1920x1080/png?text=Sem+Imagem';
    const [url, setUrl] = useState(placeholderUrl); // Default to fallback image

    useEffect(() => {
        const isValidUrl = (url: string) => {
            try {
                // Check if the URL is valid
                new URL(url);
                return true;
            } catch (e) {
                return false;
            }
        };

        // Check if the imageUrl is valid or an absolute path
        const isImageValid = isValidUrl(imageUrl) || imageUrl.startsWith('/');
        setUrl(isImageValid ? imageUrl : placeholderUrl);
    }, [imageUrl, placeholderUrl]);

    return (
        <div className={`relative shadow-lg flex rounded-md overflow-hidden w-auto h-full ${classes}`}>
            <Image
                priority={true}
                sizes={'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
                src={url}
                alt="Preview"
                fill
                onError={() => setUrl(placeholderUrl)} // Fallback if the image fails to load
            />
            {showDetails && (
                <div className="flex items-center justify-start absolute bottom-0 left-0 w-full bg-green-950 bg-opacity-70 text-white p-2 h-[25%]">
                    <p className="text-xl">{title}</p>
                </div>
            )}
        </div>
    );
};

export default NoticiaImagemWrapper;