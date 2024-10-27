'use client';

import React, {Key, useState} from "react";
import {Button, Tab, Tabs} from "@nextui-org/react";
import {Article, Category} from "@prisma/client";
import ShortNoticiaCardDetailedBottom from "@/components/noticias/short-noticia-card/short-noticia-card-detailed-bottom";
import Link from "next/link";
import paths from "@/paths";

interface CulturasListProps {
    noticias: Article[];
    categorias: Category[];
}

const CulturasTabs: React.FC<CulturasListProps> = ({noticias, categorias}) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('2');
    const [noticiasAmostradas, setNoticiasAmostradas] = useState<Article[]>(noticias.filter(noticia => noticia.categoryId == parseInt(selectedCategory)).slice(0, 10));
    const handleCategoryChange = (category: Key) => {
        const newCategory = category.toString();
        setSelectedCategory(newCategory);
        setNoticiasAmostradas(noticias.filter(noticia => noticia.categoryId == parseInt(newCategory)).slice(0, 10));
    };

    if (categorias.length == 0) {
        return <p>Nenhuma categoria adicionada...</p>;
    }

    return (
        <div className={'row-span-8 col-span-4 mt-12 h-full'}>
            <div className={'flex items-center justify-between mb-10'}>
                <p className={'text-xl font-bold'}>DESTAQUE EM CULTURAS</p>
                <Link className={'text-green-700 text-sm'} href={paths.culturas()}>
                    <p className={'font-semibold'}>Mais culturas</p>
                </Link>
            </div>
            <Tabs selectedKey={selectedCategory} onSelectionChange={handleCategoryChange} aria-label="Options">
                {categorias.slice(0, 8).map((categoria) => (
                    <Tab title={categoria.name} key={categoria.id} className="mb-2">
                        {noticiasAmostradas.length === 0 ? <p>Nenhuma notícia encontrada</p> :
                            <CulturasList noticiasFiltradas={noticiasAmostradas}/>
                        }
                    </Tab>
                ))}
            </Tabs>
            <div className={'flex justify-center'}>
                <Link href={paths.maisNoticias()}>
                    <Button className={'px-4 py-6 text-white bg-green-800 font-semibold'} radius={'sm'}>
                        CARREGAR MAIS NOTÍCIAS
                    </Button>
                </Link>
            </div>
        </div>
    );
};

const CulturasList: React.FC<{ noticiasFiltradas: Article[] }> = ({noticiasFiltradas}) => {
    const noticiasExibidas = noticiasFiltradas.slice(0, 10); // Limita a 10 notícias
    const duasPrimeirasNoticias = noticiasExibidas.slice(0, 2);
    const outrasNoticias = noticiasExibidas.slice(2);

    return (
        <div className="w-full">
            <div className="grid grid-cols-4 gap-y-8 gap-x-4">
                {/* Primeira linha com 2 colunas ocupando o espaço de 2 colunas cada */}
                {duasPrimeirasNoticias.map((noticia) => (
                    <div key={noticia.id} className="h-72 col-span-2">
                        <ShortNoticiaCardDetailedBottom
                            height={'h-[23.6rem]'}
                            showDetails={true}
                            title={noticia.thumbnailText}
                            shortDescription={noticia.title}
                            imageUrl={noticia.imageUrl!}
                            id={noticia.id}
                            from={'all-news'}
                        />
                    </div>
                ))}
                {/* Segunda e terceira linhas com 4 colunas */}
                {outrasNoticias.map((noticia) => (
                    <div key={noticia.id} className="h-72 col-span-1">
                        <ShortNoticiaCardDetailedBottom
                            showDetails={true}
                            title={noticia.thumbnailText}
                            shortDescription={noticia.title}
                            imageUrl={noticia.imageUrl!}
                            id={noticia.id}
                            from={'all-news'}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CulturasTabs;
