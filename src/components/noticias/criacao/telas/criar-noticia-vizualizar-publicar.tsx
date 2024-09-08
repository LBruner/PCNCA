import React from "react";
import ReactMarkdown from "react-markdown";

interface ConfiguracoesNoticiaProps {
    noticiaCompleta: string;
}

const CriarNoticiaVizualizarPublicar: React.FC<ConfiguracoesNoticiaProps> = ({noticiaCompleta}) => {
    return (
        <div className=" prose-full w-full">
            <div className={'w-full mx-6 px-2 flex flex-col gap-2 border-b-1 my-4'}>
                <span className={'font-semibold  text-2xl'}>Visualizar e Publicar</span>
                <span className={'mb-4'}>Aqui você pode escrever o corpo da notícia, adicionando todos os detalhes importantes. Utilize as ferramentas de edição disponíveis para formatar seu texto e organizar as informações da melhor forma.</span>
            </div>
            <div className={'w-full mx-6 prose prose-full'}>
                <ReactMarkdown components={{
                    img: ({node, ...props}) => (
                        <img {...props} className="mx-auto" alt={props.alt}/>
                    ),
                }} className="markdown-body">
                    {noticiaCompleta}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export default CriarNoticiaVizualizarPublicar;