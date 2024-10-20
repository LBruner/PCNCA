'use client';
import React, {useState} from "react";
import LargeNoticiaCard from "@/components/noticias/large-noticia-card/large-noticia-card";
import {articles} from "@/dummy_data/articles";
import {Pagination} from '@nextui-org/react';
import CustomBreadcumbs from "@/components/custom-breadcumbs";
import paths from "@/paths";

const NoticiasLista: React.FC = () => {
    const noticias = articles.sort((a, b) => {
        const dateA = new Date(a.publishedAt);
        const dateB = new Date(b.publishedAt);

        if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
            return dateB.getTime() - dateA.getTime();
        }

        return 0;
    });

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentArticles = noticias.slice(startIndex, endIndex);

    return (
        <div className={'mt-36'}>
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
                        id={noticia.id}
                        title={noticia.title}
                        imageUrl={noticia.imageUrl!}
                        content={noticia.content}
                        date={new Date(noticia.publishedAt).toString()}
                        key={noticia.id}
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
};

export default NoticiasLista;