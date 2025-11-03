import React from "react";
import CustomBreadcumbs from "@/components/custom-breadcumbs";
import paths from "@/paths";
import CulturaList from "@/components/noticias/culturas/cultura-list";
import {Cultura} from "@prisma/client";

interface CulturaPageBodyProps {
    culturas: Cultura[];
}

const CulturaPageBody: React.FC<CulturaPageBodyProps> = ({culturas}) => {
    return (
        <div className="pt-6 pb-12 dark:bg-customDarkBg">
            <CustomBreadcumbs breadcumbs={
                [{title: 'Todas Notícias', href: paths.noticias()}, {title: 'Todas Culturas', href: paths.culturas()}]
            }/>
            <div className={'w-full flex justify-center'}>
                <CulturaList culturas={culturas}/>
            </div>
        </div>
    )
}

export default CulturaPageBody;