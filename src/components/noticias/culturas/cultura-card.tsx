import React from "react";
import Image from "next/image";
import Link from "next/link";
import paths from "@/paths";

interface CulturaCardProps {
    title: string;
    image: string;
    id: number;
}

const CulturaCard: React.FC<CulturaCardProps> = ({image, id, title}) => {
    return (
        <Link href={paths.getCultura(id)}>
            <div className="relative h-[364px] w-[100%]">
                <Image
                    sizes={'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
                    priority={true}
                    fill={true}
                    src={image}
                    alt="Cocoa Tree"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-4xl font-semibold">{title}</span>
                </div>
            </div>
        </Link>

    )
}

export default CulturaCard;