'use client';
import React, {useState, useEffect} from "react";
import CustomBreadcumbs from "@/components/custom-breadcumbs";
import paths from "@/paths";
import LargeNoticiaCard from "@/components/noticias/large-noticia-card/large-noticia-card";
import {Pagination} from "@nextui-org/react";
import {Article, Category} from "@prisma/client";

interface ShowCulturaPageBodyProps {
    noticiasFiltradas: Article[];
    categoria?: Category;
}

const ShowCulturaPageBody: React.FC<ShowCulturaPageBodyProps> = ({noticiasFiltradas, categoria}) => {
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
        <div className={'mt-36'}>
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
                    title: categoria?.name ?? 'Cultura Selecionada',
                },
            ]}/>
            <div className={'flex flex-col gap-12 my-12'}>
                {currentNoticias.map((noticia) => (
                    <LargeNoticiaCard
                        id={noticia.id}
                        title={noticia.title}
                        imageUrl={noticia.imageUrl!}
                        content={noticia.content}
                        date={new Date(noticia.publishedAt).toString()}
                        key={noticia.id}
                        from={`culturas/${categoria?.name ?? 'desconhecido'}/${categoria?.id}`}
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
