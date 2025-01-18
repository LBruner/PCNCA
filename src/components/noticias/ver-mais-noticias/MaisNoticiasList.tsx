'use client';

import React, {useEffect, useState} from "react";
import CustomBreadcumbs from "@/components/custom-breadcumbs";
import paths from "@/paths";
import LargeNoticiaCard from "@/components/noticias/large-noticia-card/large-noticia-card";
import {Pagination} from "@nextui-org/react";
import {NoticiaComAutorCultura} from "@/actions/noticias";

interface MaisNoticiasListProps {
    noticias: NoticiaComAutorCultura[];
}

const MaisNoticiasList: React.FC<MaisNoticiasListProps> = ({noticias}) => {
    console.log(noticias)
    const noticiasOrdenadas = noticias.sort((a, b) => {
        const dateA = new Date(a.dataPubli);
        const dateB = new Date(b.dataPubli);

        if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
            return dateB.getTime() - dateA.getTime();
        }

        return 0;
    });

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentArticles = noticiasOrdenadas.slice(startIndex, endIndex);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [currentPage]);

    return (
        <div>
            <CustomBreadcumbs breadcumbs={[
                {
                    title: 'Todas Notícias',
                    href: paths.noticias()
                },
                {
                    title: 'Mais Notícias',
                    href: paths.maisNoticias()
                },
            ]}/>
            <div className={'flex flex-col gap-y-20'}>
                {currentArticles.map((noticia) => (
                    <LargeNoticiaCard
                        id={noticia.notId}
                        title={noticia.titulo}
                        imageUrl={noticia.imagemLink!}
                        content={noticia.corpo!}
                        date={new Date(noticia.dataPubli).toString()}
                        key={noticia.notId}
                        from={'mais-noticias'}
                    />
                ))}

                <div className={'flex justify-center mb-12'}>
                    <Pagination size={'lg'} color={'primary'}
                                total={Math.ceil(noticias.length / itemsPerPage)}
                                initialPage={1}
                                onChange={(page) => setCurrentPage(page)}
                                page={currentPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default MaisNoticiasList;