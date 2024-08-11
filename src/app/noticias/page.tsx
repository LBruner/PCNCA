import React from "react";
import NoticiaCardShort from "@/components/noticias/noticia-card-short";
import NoticiaCard from "@/components/noticias/noticia-card";

const NoticiasPage: React.FC = _ => {
    return (
        <div className="mt-28 h-screen w-screen flex justify-center">
            <div className={'w-10/12 flex h-2/6'}>
                <div className="w-1/2">
                    <NoticiaCard title={'Desafios e perspectiva da pescaria'} imageUrl={'https://www.agrolink.com.br/upload/imagens-resizes/921d354516de4d6b844ad63d9527ce04_858x483.jpg'}/>
                </div>
                <div className="w-1/2 flex flex-col gap-2">
                    <NoticiaCardShort title={'Mercado'} subTitle={'Preços do milho sobem no Paraná'}
                                      imageUrl={'https://imagens-cdn.canalrural.com.br/wp-content/uploads/milho-em-graos.jpg'}
                                      description={'Coleita de milho avança no estado'}/>

                    <NoticiaCardShort title={'Commodities'} subTitle={' Branding: A nova rota das commodities'}
                                      imageUrl={'https://www.agrolink.com.br/upload/imagens-resizes/415ddec5aa194fc6bf3b1e593474d437_284x160.jpg'}
                                      description={'Narrativas bem elaboradas também desempenham um papel crucial na construção de marcas'}/>
                </div>
            </div>
        </div>

    )
}

export default NoticiasPage;
