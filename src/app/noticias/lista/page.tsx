import React from "react";
import LargeNoticiaCard from "@/components/noticias/large-noticia-card/large-noticia-card";

const NoticiasLista: React.FC = _ => {
    return (
        <div className={'mt-32 flex flex-col gap-y-20'}>
            <LargeNoticiaCard/>
            <LargeNoticiaCard/>
            <LargeNoticiaCard/>
        </div>
    )
}

export default NoticiasLista;