'use client';

import React, {Key, useMemo, useState} from "react";
import {Button, Tab, Tabs} from "@heroui/react";
import {Cultura, Noticia} from "@prisma/client";
import ShortNoticiaCardDetailedBottom
    from "@/components/noticias/short-noticia-card/short-noticia-card-detailed-bottom";
import Link from "next/link";
import paths from "@/paths";

interface CulturasListProps {
    noticias: Noticia[];
    culturas: Cultura[];
}

const CulturasTabs: React.FC<CulturasListProps> = ({noticias, culturas}) => {
    const [selectedCultura, setSelectedCultura] = useState<number>(culturas[0]?.culturaId || 1);
    const noticiasAmostradas = useMemo(() => {
        return noticias
            .filter(noticia => noticia.idCultura === selectedCultura)
            .slice(0, 10);
    }, [noticias, selectedCultura]);

    const handleCulturaChange = (cultura: Key) => {
        const novaCultura = parseInt(cultura.toString());
        setSelectedCultura(novaCultura);
    };

    if (culturas.length == 0) {
        return <p>Nenhuma categoria adicionada...</p>;
    }

    return (
        <div className={'row-span-8 col-span-4 mt-12 h-full'}>
            <div className={'flex items-center justify-between mb-10'}>
                <p className={'text-2xl font-bold'}>DESTAQUE EM CULTURAS</p>
                <Link className={'text-green-700 text-sm'} href={paths.culturas()}>
                    <p className={'font-semibold text-lg'}>Mais culturas</p>
                </Link>
            </div>
            <Tabs size={'lg'} defaultSelectedKey={selectedCultura.toString()} onSelectionChange={handleCulturaChange} aria-label="Options">
                {culturas.map((categoria) => (
                    <Tab title={categoria.nome} key={categoria.culturaId}>
                        {noticiasAmostradas.length === 0 ?
                            <p className={'text-lg font-semibold'}>Nenhuma notícia dessa categoria encontrada</p> :
                            <CulturasList noticiasFiltradas={noticiasAmostradas}/>
                        }
                    </Tab>
                ))}
            </Tabs>
            <div className={'flex justify-center mt-2'}>
                <Link href={paths.maisNoticias()}>
                    <Button className={'px-4 py-6 text-white bg-green-800 font-semibold'} radius={'sm'}>
                        MAIS NOTÍCIAS
                    </Button>
                </Link>
            </div>
        </div>
    );
};

const CulturasList: React.FC<{ noticiasFiltradas: Noticia[] }> = ({noticiasFiltradas}) => {
    const noticiasExibidas = noticiasFiltradas.slice(0, 10);
    const duasPrimeirasNoticias = noticiasExibidas.slice(0, 2);
    const outrasNoticias = noticiasExibidas.slice(2);

    return (
        <div className="w-full">
            <div className="grid grid-cols-4 gap-y-8 gap-x-4">
                {duasPrimeirasNoticias.map((noticia) => (
                    <div key={noticia.notId} className="h-72 col-span-2">
                        <ShortNoticiaCardDetailedBottom
                            height={'h-[23.6rem]'}
                            showDetails={true}
                            title={noticia.descricao ?? 'Novidade'}
                            shortDescription={noticia.titulo}
                            imageUrl={noticia.imagemLink!}
                            id={noticia.notId}
                            from={'all-news'}
                        />
                    </div>
                ))}
                {outrasNoticias.map((noticia) => (
                    <div key={noticia.notId} className="h-72 col-span-1">
                        <ShortNoticiaCardDetailedBottom
                            showDetails={true}
                            title={noticia.descricao ?? 'Novidade'}
                            shortDescription={noticia.titulo}
                            imageUrl={noticia.imagemLink!}
                            id={noticia.notId}
                            from={'all-news'}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CulturasTabs;
