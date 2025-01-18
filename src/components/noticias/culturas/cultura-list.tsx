import React from "react";
import CulturaCard from "@/components/noticias/culturas/cultura-card";
import {Cultura} from "@prisma/client";

interface CulturaListProps {
    culturas: Cultura[];
}

const CulturaList: React.FC<CulturaListProps> = ({culturas}) => {
    return (
        <div className={'w-3/4 mb-20'}>
            <p className={'text-4xl text-orange-500 font-bold'}>Descubra</p>
            <p className={'mt-1 mb-10 text-lg font-semibold text-orange-500'}>Navegue por setores</p>
            <div className="grid grid-cols-3 grid-rows-2 gap-4">
                {culturas.map((cultura, index) => {
                    const row = Math.floor(index / 3) + 1;
                    const col = (index % 3) + 1;

                    return (
                        <div
                            key={cultura.culturaId}
                            className={`col-start-${col} row-start-${row}`}
                        >
                            <CulturaCard
                                title={cultura.nome}
                                image={cultura.imagemLink!}
                                id={cultura.culturaId}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default CulturaList;