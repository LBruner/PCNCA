import React from "react";
import CustomBreadcumbs from "@/components/custom-breadcumbs";
import paths from "@/paths";
import CulturaList from "@/components/noticias/culturas/cultura-list";
import {Category} from "@prisma/client";

interface CulturaPageBodyProps {
    categorias: Category[];
}

const CulturaPageBody: React.FC<CulturaPageBodyProps> = ({categorias}) => {
    return (
        <>
            <CustomBreadcumbs breadcumbs={
                [{title: 'Todas Notícias', href: paths.noticias()}, {title: 'Todas Culturas', href: paths.culturas()}]
            }/>
            <div className={'w-full flex justify-center'}>
                <CulturaList categorias={categorias}/>
            </div>
        </>
    )
}

export default CulturaPageBody;