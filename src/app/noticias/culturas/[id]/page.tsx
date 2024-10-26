import React from "react";
import {notFound} from "next/navigation";
import ShowCulturaPageBody from "@/components/noticias/culturas/show-cultura-page-body";
import {Article, Category} from "@prisma/client";
import {getNoticias} from "@/actions/adm";
import {getCategoryById} from "@/actions/categorias";

interface CulturaShowPageProps {
    params: {
        id: string;
    }
}

const CulturaShowPage: React.FC<CulturaShowPageProps> = async ({params: {id}}) => {
    const noticiasFiltradas: Article[] = await getNoticias({categoryId: id})
    const category: Category | null = await getCategoryById(parseInt(id));

    if (noticiasFiltradas.length === 0) {
        return notFound();
    }

    return (
        <ShowCulturaPageBody noticiasFiltradas={noticiasFiltradas} categoria={category ?? undefined}/>
    );
};

export default CulturaShowPage;
