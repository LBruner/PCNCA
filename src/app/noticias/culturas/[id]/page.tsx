import React from "react";
import ShowCulturaPageBody from "@/components/noticias/culturas/show-cultura-page-body";
import {Cultura} from "@prisma/client";
import {pegaCulturaPorId} from "@/actions/culturas";
import {NoticiaComAutorCultura, pegaNoticiasPorId} from "@/actions/noticias";
import EmptyState from "@/components/UI/NoData";

interface CulturaShowPageProps {
    params: Promise<{
        id: string
    }>
}

const CulturaShowPage: React.FC<CulturaShowPageProps> = async ({params}) => {
    const culturaId = (await params).id;
    const noticiasFiltradas: NoticiaComAutorCultura[] = await pegaNoticiasPorId(parseInt(culturaId));
    const cultura: Cultura | null = await pegaCulturaPorId(parseInt(culturaId));

    if (noticiasFiltradas.length === 0) {
        return <EmptyState description={'Nenhuma notícia dessa categoria encontrada'}/>
    }

    return (
        <ShowCulturaPageBody noticiasFiltradas={noticiasFiltradas} cultura={cultura ?? undefined}/>
    );
};

export default CulturaShowPage;
