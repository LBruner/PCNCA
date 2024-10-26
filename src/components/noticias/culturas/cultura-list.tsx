import React from "react";
import CulturaCard from "@/components/noticias/culturas/cultura-card";
import {Category} from "@prisma/client";

interface CulturaListProps {
    categorias: Category[];
}
const CulturaList: React.FC<CulturaListProps> = ({categorias}) => {
    return (
        <div className={'w-3/4 mb-20'}>
            <p className={'text-4xl text-orange-500 font-bold'}>Descubra</p>
            <p className={'mt-1 mb-10 text-lg font-semibold text-orange-500'}>Navegue por setores</p>
            <div className="grid grid-cols-3 grid-rows-2 gap-4">
                {categorias.map((categoria, index) => {
                    const row = Math.floor(index / 3) + 1;
                    const col = (index % 3) + 1;

                    return (
                        <div
                            key={categoria.id}
                            className={`col-start-${col} row-start-${row}`}
                        >
                            <CulturaCard
                                title={categoria.name}
                                image={categoria.url!}
                                id={categoria.id}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default CulturaList;