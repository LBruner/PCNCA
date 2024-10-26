import React from "react";
import NoticiaImagemWrapper from "@/components/noticias/noticia-imagem-wrapper";
import Link from "next/link";
import paths from "@/paths";
import {getPublicacaoData} from "@/helpers/noticia/criacao/criar-noticia";

interface LargeNoticiaCardProps {
    imageUrl: string;
    title: string;
    content: string;
    date: string;
    id: number;
    from?: string;
}

const LargeNoticiaCard: React.FC<LargeNoticiaCardProps> = ({date, content, imageUrl, title, id, from}) => {
    const displayingSummary = removerTextoEntreParenteses(content).slice(0, 250).concat(` [...]`);
    return (
        <div className={'flex justify-center items-center'}>
            <Link href={`${paths.showNoticia(id)}${from ? `?from=${from}` : ''}`} className={'h-full w-3/4'}>
                <div className="flex items-center">
                    <div className="w-[50%] h-72 px-14">
                        <NoticiaImagemWrapper classes={'rounded-none'}
                                              imageUrl={imageUrl}/>
                    </div>
                    <div className="h-72 flex-1 flex flex-col gap-2 border-b-1 border-green-900 px-3 overflow-hidden">
                        <div>
                            <p className={'text-sm fill-blue-900'}>
                                {getPublicacaoData(false, date)}
                            </p>
                        </div>
                        <div className={'flex flex-col'}>
                            <div>
                                <p className={'text-2xl font-bold text-green-800'}>
                                    {title}
                                </p>
                            </div>
                            <div>
                                <p className={'text-lg'}>
                                    {displayingSummary}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}


function removerTextoEntreParenteses(texto: string): string {
    return texto.replace(/\(.*?\)/g, '').trim();
}

export default LargeNoticiaCard;