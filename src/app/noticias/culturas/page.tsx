import React from "react";
import CulturaCard from "@/components/noticias/culturas/cultura-card";

const CulturasPage: React.FC = _ => {
    return (
        <div className={'w-full mt-32 flex justify-center'}>
            <div className={'w-3/4 mb-20'}>
                <p className={'text-4xl text-orange-500 font-bold'}>Descubra</p>
                <p className={'mt-1 mb-10 text-lg font-semibold text-orange-500'}>Navegue por setores</p>
                <div className="grid grid-cols-3 grid-rows-2 gap-4">
                    <div className={'col-start-1 row-start-1'}><CulturaCard title={'Soja'} image={'/images/graos.jpg'}
                                                                            id={3}/></div>
                    <div className={'col-start-2 row-start-1'}><CulturaCard title={'Milho'} image={'/images/corn.jpg'}
                                                                            id={2}/></div>
                    <div className="col-start-3 row-start-1">
                        <CulturaCard title={'Café'} image={'/images/cafe.jpg'} id={6}/>
                    </div>
                    <div className={'col-start-1 row-start-2'}><CulturaCard title={'Cana-de-Açucar'} image={'/images/cana.jpg'}
                                                                            id={7}/></div>
                    <div className={'col-start-2 row-start-2'}><CulturaCard title={'Bovinos'} image={'/images/bovinos.jpg'}
                                                                            id={12}/></div>
                    <div className="col-start-3 row-start-2">
                        <CulturaCard title={'Aves'} image={'/images/aves.jpg'} id={13}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CulturasPage;