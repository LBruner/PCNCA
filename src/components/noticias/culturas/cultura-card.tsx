'use client';
import React, {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import paths from "@/paths";

interface CulturaCardProps {
    title: string;
    image: string;
    id: number;
}

const CulturaCard: React.FC<CulturaCardProps> = ({image, id, title}) => {
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
        const isImageValid = isValidUrl(image) || image.startsWith('/');
        setUrl(isImageValid ? image : placeholderUrl);
    }, [image, placeholderUrl]);

    return (
        <Link href={paths.getCultura(id)}>
            <div className="relative h-[364px] w-[100%]">
                <Image
                    sizes={'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
                    priority={true}
                    fill={true}
                    src={url}
                    alt="Cocoa Tree"
                    className="w-full h-full object-cover"
                    onError={() => setUrl(placeholderUrl)}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-4xl font-semibold">{title}</span>
                </div>
            </div>
        </Link>

    )
}

export default CulturaCard;