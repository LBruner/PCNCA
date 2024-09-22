'use client';

import React, {Key, useState} from "react";
import {Button, Tab, Tabs} from "@nextui-org/react";
import {Article, Category} from "@prisma/client";
import ShortNoticiaCardDetailedBottom
    from "@/components/noticias/short-noticia-card/short-noticia-card-detailed-bottom";
import Link from "next/link";
import paths from "@/paths";

interface CulturasListProps {
    noticias: Article[];
    categorias: Category[];
}

const CulturasTabs: React.FC<CulturasListProps> = ({noticias, categorias}) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('2');
    const [noticiasAmostradas, setNoticiasAmostradas] = useState<Article[]>(noticias.filter(noticia => noticia.categoryId == parseInt(selectedCategory.toString())).slice(0, 6));
    const handleCategoryChange = (category: Key) => {
        const newCategory = category.toString();
        setSelectedCategory(newCategory);
        setNoticiasAmostradas(noticias.filter(noticia => noticia.categoryId == parseInt(newCategory)).slice(0, 6));
    };

    console.log(selectedCategory);

    if (categorias.length == 0) {
        return <p>Nenhuma categoria adicionada...</p>
    }

    return (
        <div className={'row-span-8 col-span-4 mt-8'}>
            <div className={'flex items-center justify-between  mb-10'}>
                <p className={'text-xl font-bold'}>DESTAQUE EM CULTURAS</p>
                <Link className={'text-green-700 text-sm'} href={paths.culturas()}>
                    <p className={'font-semibold'}>Mais culturas</p>
                </Link>
            </div>
            <Tabs selectedKey={selectedCategory} onSelectionChange={handleCategoryChange} aria-label="Options">
                {categorias.slice(0,4).map((categoria) => (
                    <Tab title={categoria.name} key={categoria.id} className="mb-2">
                        {noticiasAmostradas.length == 0 ? <p>Nenhuma notícia encontrada</p> :
                            <CulturasList noticiasFiltradas={noticiasAmostradas}/>
                        }
                    </Tab>
                ))}
            </Tabs>
            <div className={'flex justify-center'}>
                <Button className={' px-4 py-6 text-white bg-green-800 font-semibold'} radius={'sm'}>CARREGAR MAIS
                    NOTÍCIAS</Button>
            </div>
        </div>
    )
}


const CulturasList: React.FC<{ noticiasFiltradas: Article[] }> = ({noticiasFiltradas}) => {
    console.log(`FILTRADAS: ${noticiasFiltradas}`);

    // Pega as duas primeiras notícias
    const duasPrimeirasNoticias = noticiasFiltradas.slice(0, 2);

    // Pega o restante das notícias
    const outrasNoticias = noticiasFiltradas.slice(2);

    // Determine o número de colunas e linhas da grid com base no número de notícias
    const gridCols = outrasNoticias.length > 0 ? 4 : 2; // 4 colunas se houver mais notícias, senão 2
    const gridRows = outrasNoticias.length > 0 ? 2 : 1; // 2 linhas se houver mais notícias, senão 1

    return (
        <div className="w-full">
            <div className={`grid grid-cols-${gridCols} grid-rows-${gridRows} gap-y-8 gap-x-4`}>
                {duasPrimeirasNoticias.map((noticia) => (
                    <div key={noticia.id} className="h-72 col-span-2 row-span-1">
                        <ShortNoticiaCardDetailedBottom
                            height={'h-[23.6rem]'}
                            showDetails={true}
                            title={noticia.thumbnailText}
                            shortDescription={noticia.title}
                            imageUrl={noticia.imageUrl!}
                            id={noticia.id}
                        />
                    </div>
                ))}
                {outrasNoticias.map((noticia) => (
                    <div key={noticia.id} className="row-start-2 col-span-1">
                        <ShortNoticiaCardDetailedBottom
                            showDetails={true}
                            title={noticia.thumbnailText}
                            shortDescription={noticia.title}
                            imageUrl={noticia.imageUrl!}
                            id={noticia.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CulturasTabs;