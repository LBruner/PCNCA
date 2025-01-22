import React from "react";
import MaisNoticiasList from "@/components/noticias/ver-mais-noticias/MaisNoticiasList";
import {pegaTodasNoticias} from "@/actions/noticias";

const VerMaisNoticiasPage: React.FC = async () => {
    const noticias = await pegaTodasNoticias();

    return (
        <div>
            <MaisNoticiasList noticias={noticias}/>
        </div>
    );
};

export default VerMaisNoticiasPage;
