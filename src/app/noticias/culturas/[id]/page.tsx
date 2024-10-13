'use client';
import React, {useState} from "react";
import LargeNoticiaCard from "@/components/noticias/large-noticia-card/large-noticia-card";
import {notFound} from "next/navigation";
import {BreadcrumbItem, Breadcrumbs, Pagination} from "@nextui-org/react";
import {articles} from "@/dummy_data/articles";
import paths from "@/paths";
import CustomBreadcumbs from "@/components/custom-breadcumbs";

interface CulturaShowPageProps {
    params: {
        id: string;
    }
}

const CulturaShowPage: React.FC<CulturaShowPageProps> = ({params: {id}}) => {
    const noticiasFiltradas = articles.filter((article) => article.categoryId == parseInt(id));


    if (noticiasFiltradas.length === 0) {
        return notFound();
    }

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentNoticias = noticiasFiltradas.slice(startIndex, endIndex);

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
                    title: 'Cultura Selecionada',
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
                    />
                ))}
            </div>

            {/* Pagination component */}
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
};

export default CulturaShowPage;
