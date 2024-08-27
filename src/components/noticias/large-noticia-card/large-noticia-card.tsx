import React from "react";
import NoticiaImagemWrapper from "@/components/noticias/noticia-imagem-wrapper";
import Link from "next/link";

const LargeNoticiaCard: React.FC = _ => {
    return (
        <div className={'flex justify-center items-center'}>
            <Link href={''} className={'h-full w-3/4'}>
                <div className="flex items-center">
                    <div className="w-[50%] h-72 px-14">
                        <NoticiaImagemWrapper classes={'rounded-none'}
                                              imageUrl={'https://brazilianfarmers.com/wp-content/uploads/2024/08/40302948931_febb85dc6a_6k-600x418.jpg'}/>
                    </div>
                    <div className="h-72 flex-1 flex flex-col gap-2 border-b-1 border-blue-900 px-3 overflow-hidden">
                        <div>
                            <p className={'text-sm fill-blue-900'}>
                                08/23/2024
                            </p>
                        </div>
                        <div className={'flex flex-col'}>
                            <div>
                                <p className={'text-2xl font-bold text-blue-900'}>
                                    Technological Advancement in Brazilian Beef Cattle: EMBRAPA’s New App Enhances
                                    Andrological Tests
                                </p>
                            </div>
                            <div>
                                <p className={'text-lg'}>
                                    Brazilian beef cattle breeding is benefiting from a new app developed by the
                                    Brazilian Agricultural Research Corporation (EMBRAPA), designed to improve
                                    andrological tests in bulls and optimize the assessment of bovine reproductive
                                    health, making the process more […]
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default LargeNoticiaCard;