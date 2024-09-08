import React from "react";
import CustomMdEditor from "@/components/noticias/criacao/custom-md-editor";

interface CriarNoticiaEscreverProps {
    content: string;
    handleChange: (newContent: string) => void;
}

const CriarNoticiaConteudo: React.FC<CriarNoticiaEscreverProps> = ({handleChange,content}) => {
    return (
        <>
            <div className={'w-full px-5 flex flex-col gap-2 border-b-1 my-4'}>
                <span className={'font-semibold text-2xl'}>Conteúdo da Notícia</span>
                <span className={'mb-4'}>Aqui você pode escrever o corpo da notícia, adicionando todos os detalhes importantes. Utilize as ferramentas de edição disponíveis para formatar seu texto e organizar as informações da melhor forma.</span>
            </div>
            <div className={'max-h-[500px] h-[500px] overflow-y-auto'}>

                <CustomMdEditor content={content} handleChange={handleChange}/>
            </div>
        </>
    )
}

export default CriarNoticiaConteudo;