import React from "react";
import NoticiaCardDetailedRight from "@/components/noticias/noticia-card-detailed-right";
import NoticiaImagemWrapper from "@/components/noticias/noticia-imagem-wrapper";
import {getNoticias} from "@/actions/noticias";
import NoticiaCardDetailedBottom from "@/components/noticias/noticia-card-detailed-bottom";
import {dados} from "@/components/noticias/dados";


const NoticiasPage: React.FC = async _ => {
    // const noticias = dados;
    const noticias = await getNoticias();

    if (!noticias || noticias.length == 0) {
        return <p>Nenhuma notícia</p>
    }

    return (
        <div className={'flex justify-center items-center h-screen w-screen'}>
            <div className={'h-18 w-3/4 max-w-screen-lg'}>
                <div className="grid grid-cols-4 grid-rows-8 gap-4">
                    <div className="col-span-2 row-span-8">
                        <NoticiaCardDetailedRight
                            title={noticias[0].title}
                            subTitle={''}
                            imageUrl={noticias[0].imageUrl!}
                            description={''}
                            id={noticias[0].id}
                            showDetails={false}
                        />
                    </div>
                    <div className="col-span-2 row-span-4 col-start-3">
                        <NoticiaCardDetailedRight
                            title={noticias[1].thumbnailText}
                            subTitle={noticias[1].title}
                            imageUrl={noticias[1].imageUrl!}
                            description={noticias[1].subtitle}
                            id={noticias[1].id}
                            showDetails={true}
                        />
                    </div>
                    <div className="col-span-2 row-span-4 col-start-3 row-start-5">
                        <NoticiaCardDetailedRight
                            title={noticias[2].thumbnailText}
                            subTitle={noticias[2].title}
                            imageUrl={noticias[2].imageUrl!}
                            description={noticias[2].subtitle}
                            id={noticias[2].id}
                            showDetails={true}
                        />
                    </div>
                    {noticias.slice(4,8).map(noticia => (
                        <div key={noticia.id} className="row-span-2 row-start-9">
                            <NoticiaCardDetailedBottom
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
        </div>

)
}

export default NoticiasPage;
