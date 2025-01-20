'use client';
import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import CriarNoticiaInformacoesBasicasInputField
    from "@/components/noticias/criacao/criar-noticia-informacoes-basicas-input-field";
import CriarNoticiaInformacoesBasicasSelectField
    from "@/components/noticias/criacao/criar-noticia-informacoes-basicas-select-field";
import ShortNoticiaCardDetailedRight from "@/components/noticias/short-noticia-card/short-noticia-card-detailed-right";
import ShortNoticiaCardDetailedBottom
    from "@/components/noticias/short-noticia-card/short-noticia-card-detailed-bottom";
import {Cultura} from "@prisma/client";
import {NoticiaBasica} from "@/models/noticiaBasica";
import {fallbackImgUrl} from "@/constants/messages/images";

const defaultTitle = 'Aqui vai o título da notícia'
const defaultSubtitle = 'Aqui vai o subtítulo da notícia'
const defaultImagem = fallbackImgUrl;
const defaultThumbnail = 'Legenda'

interface ProdutoFormProps {
    setScreenIndex: React.Dispatch<React.SetStateAction<number>>;
    noticia?: NoticiaBasica
    setArticle: React.Dispatch<React.SetStateAction<NoticiaBasica | undefined>>;
    culturas: Cultura[]
}

const CriarNoticiaInformacoesBasicas = forwardRef((props: ProdutoFormProps, ref) => {
    const { noticia, setArticle, setScreenIndex, culturas } = props;

    const [titulo, setTitle] = useState(noticia?.titulo || '');
    const [subtitulo, setSubtitulo] = useState(noticia?.subtitulo || '');
    const [imagemLink, setImagemLink] = useState(noticia?.imagemLink || '');
    const [cultura, setCultura] = useState(noticia?.idCultura);
    const [descricao, setDescricao] = useState(noticia?.descricao || '')

    const formRef = useRef<HTMLFormElement>(null);

    useImperativeHandle(ref, () => ({
        submitForm() {
            if (!formRef || !formRef.current) return;

            if (formRef.current.checkValidity()) {
                setArticle({
                    titulo: titulo,
                    subtitulo: subtitulo,
                    imagemLink: imagemLink,
                    idCultura: cultura!,
                    descricao: descricao,
                });
                setScreenIndex(1);
            } else {
                formRef.current.reportValidity();
            }
        }
    }));

    return (
        <form ref={formRef}
              className={'flex flex-col items-center pt-8 h-auto overflow-hidden mb-5'}>
            <div className={'w-[88%] flex flex-col gap-8 justify-start items-start'}>
                <CriarNoticiaInformacoesBasicasInputField
                    titulo={'Título do artigo'}
                    subtitulo={'Será mostrado no topo da notícia'} value={titulo}
                    onChange={(newValue) => {
                        setTitle(newValue);
                    }}
                />
                <CriarNoticiaInformacoesBasicasInputField
                    titulo={'Subtitulo da artigo'}
                    subtitulo={'Será mostrado logo abaixo do título'} value={subtitulo}
                    onChange={(newValue) => {
                        setSubtitulo(newValue)
                    }}
                />
                <CriarNoticiaInformacoesBasicasInputField
                    titulo={'Imagem da artigo'}
                    subtitulo={'Será mostrado logo abaixo do subtítulo'} value={imagemLink}
                    onChange={(newValue) => {
                        setImagemLink(newValue)
                    }}
                />
                <CriarNoticiaInformacoesBasicasInputField
                    titulo={'Legenda do artigo'}
                    subtitulo={'Campo será adicionado à thumbnail da imagem. Caso seja nulo, a categoria será utilizada.'} value={descricao}
                    onChange={(newValue) => {
                        setDescricao(newValue)
                    }}
                />
                <CriarNoticiaInformacoesBasicasSelectField
                    titulo={'Categoria da Notícia'} valor={cultura?.toString()!}
                    subtitulo={'Categoria em que o artigo será exibido'}
                    placeholder={'Selecione a categoria'}
                    collection={culturas.map((cultura) => ({
                        name: cultura.nome,
                        uid: cultura.culturaId.toString(),
                    }))}
                    onChange={(novaCategoria) => setCultura(parseInt(novaCategoria))}
                />
                <div className={'flex flex-col justify-start w-full border-t-1 '}>
                    <p className={'text-start font-semibold text-lg mt-4'}>Thumbnail preview</p>
                    <p className={'text-start text-gray-500'}>Visualize como a sua configuração irá ser
                        mostrada em tempo real</p>
                </div>
                <div className="w-full h-72">
                    <div className="grid justify-center grid-cols-6 grid-rows-2 h-full gap-3">
                        <div className="col-span-2 row-span-4 row-start-1 col-start-1 h-52">
                            <p className={'mb-3 text-lg font-semibold'}>Grande</p>
                            <ShortNoticiaCardDetailedRight
                                isClicable={false}
                                title={titulo == '' ? defaultTitle : titulo}
                                subTitle={subtitulo == '' ? defaultSubtitle : subtitulo}
                                imageUrl={imagemLink == '' ? defaultImagem : imagemLink}
                                description={descricao}
                                id={0}
                                showDetails={false}
                            />
                        </div>
                        <div key={5} className={`col-span-2 h-52 row-span-2 col-start-3 row-start-1`}>
                            <p className={'mb-3 text-lg font-semibold'}>Médio</p>
                            <ShortNoticiaCardDetailedBottom
                                isClicable={false}
                                showDetails={true}
                                title={descricao != '' ? descricao :  defaultThumbnail}
                                shortDescription={titulo == '' ? defaultTitle : titulo}
                                imageUrl={imagemLink == '' ? defaultImagem : imagemLink}
                                id={7}
                            />
                        </div>
                        <div className="col-span-2 row-span-2 col-start-5 row-start-1 h-32">
                            <p className={'mb-3 text-lg font-semibold'}>Pequeno</p>
                            <ShortNoticiaCardDetailedRight
                                isClicable={false}
                                title={descricao != '' ? descricao :  defaultThumbnail}
                                subTitle={titulo == '' ? defaultTitle : titulo}
                                imageUrl={imagemLink == '' ? defaultImagem : imagemLink}
                                description={subtitulo == '' ? defaultSubtitle : subtitulo}
                                id={1}
                                showDetails={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
})

CriarNoticiaInformacoesBasicas.displayName = 'CriarNoticiaInformacoesBasicas';

export default CriarNoticiaInformacoesBasicas;
