'use client';
import React, {useEffect, useState} from "react";
import CustomBreadcumbs from "@/components/custom-breadcumbs";
import paths from "@/paths";
import LargeNoticiaCard from "@/components/noticias/large-noticia-card/large-noticia-card";
import {Pagination} from "@heroui/react";
import {Cultura} from "@prisma/client";
import {NoticiaComCultura} from "@/actions/noticias";

interface ShowCulturaPageBodyProps {
    noticiasFiltradas: NoticiaComCultura[];
    cultura?: Cultura;
}

const ShowCulturaPageBody: React.FC<ShowCulturaPageBodyProps> = ({noticiasFiltradas, cultura}) => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentNoticias = noticiasFiltradas.slice(startIndex, endIndex);

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
                    title: 'Todas Culturas',
                    href: paths.culturas()
                },
                {
                    title: cultura?.nome ?? 'Cultura Selecionada',
                },
            ]}/>
            <div className={'flex flex-col gap-12 my-12'}>
                {currentNoticias.map((noticia) => (
                    <LargeNoticiaCard
                        id={noticia.notId}
                        title={noticia.titulo}
                        imageUrl={noticia.imagemLink!}
                        content={noticia.corpo}
                        date={new Date(noticia.dataPubli).toString()}
                        key={noticia.notId}
                        from={`culturas/${cultura?.nome ?? 'desconhecido'}/${cultura?.culturaId}`}
                    />
                ))}
            </div>

            <div className={'flex justify-center mt-8'}>
                <Pagination
                    total={Math.ceil(noticiasFiltradas.length / itemsPerPage)}
                    initialPage={1}
                    page={currentPage}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}

export default ShowCulturaPageBody;
