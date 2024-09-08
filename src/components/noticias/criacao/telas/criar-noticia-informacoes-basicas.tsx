'use client';
import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import CriarNoticiaInformacoesBasicasInputField from "@/components/noticias/criacao/criar-noticia-informacoes-basicas-input-field";
import CriarNoticiaInformacoesBasicasSelectField from "@/components/noticias/criacao/criar-noticia-informacoes-basicas-select-field";
import ShortNoticiaCardDetailedRight from "@/components/noticias/short-noticia-card/short-noticia-card-detailed-right";
import ShortNoticiaCardDetailedBottom
    from "@/components/noticias/short-noticia-card/short-noticia-card-detailed-bottom";
import {Category} from "@prisma/client";
import {Artigo} from "@/models/artigo";

const defaultTitle = 'Aqui vai o título da notícia'
const defaultSubtitle = 'Aqui vai o subtítulo da notícia'
const defaultImagem = 'https://placehold.co/600x400.png'
const defaultCategory = 'Categoria'

interface ProdutoFormProps {
    setScreenIndex: React.Dispatch<React.SetStateAction<number>>;
    article?: Artigo
    setArticle: React.Dispatch<React.SetStateAction<Artigo | undefined>>;
    categories: Category[]
}

const CriarNoticiaInformacoesBasicas: React.FC<ProdutoFormProps> = forwardRef((props, ref) => {
    const {article, setArticle, setScreenIndex, categories} = props;

    const [title, setTitle] = useState(article?.title || '');
    const [subtitle, setSubtitle] = useState(article?.subtitle || '');
    const [imageUrl, setImageUrl] = useState(article?.imageUrl || '');
    const [category, setCategory] = useState(article?.categoryNome);

    const formRef = useRef<HTMLFormElement>(null);

    useImperativeHandle(ref, () => ({
        submitForm() {
            if (!formRef || !formRef.current) return;

            if (formRef.current.checkValidity()) {
                const categoria = categories.find(item => item.name == category);

                setArticle({
                    title,
                    subtitle,
                    imageUrl: imageUrl,
                    categoryNome: categoria?.name || '',
                    categoryId: categoria?.id || 0,
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
                    subtitulo={'Será mostrado no topo da notícia'} value={title}
                    onChange={(newValue) => {
                        setTitle(newValue);
                    }}
                />
                <CriarNoticiaInformacoesBasicasInputField
                    titulo={'Subtitulo da artigo'}
                    subtitulo={'Será mostrado logo abaixo do título'} value={subtitle}
                    onChange={(newValue) => {
                        setSubtitle(newValue)
                    }}
                />
                <CriarNoticiaInformacoesBasicasInputField
                    titulo={'Imagem da artigo'}
                    subtitulo={'Será mostrado logo abaixo do subtítulo'} value={imageUrl}
                    onChange={(newValue) => {
                        setImageUrl(newValue)
                    }}
                />
                <CriarNoticiaInformacoesBasicasSelectField
                    titulo={'Categoria da Notícia'} valor={category}
                    subtitulo={'Categoria em que o artigo será exibido'}
                    collection={categories.map((category) => category.name)}
                    onChange={(novaCategoria) => setCategory(novaCategoria)}
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
                                title={title == '' ? defaultTitle : title}
                                subTitle={subtitle == '' ? defaultSubtitle : subtitle}
                                imageUrl={imageUrl == '' ? defaultImagem : imageUrl}
                                description={!category || category == '' ? defaultCategory : category}
                                id={0}
                                showDetails={false}
                            />
                        </div>
                        <div key={5} className={`col-span-2 h-52 row-span-2 col-start-3 row-start-1`}>
                            <p className={'mb-3 text-lg font-semibold'}>Médio</p>
                            <ShortNoticiaCardDetailedBottom
                                isClicable={false}
                                showDetails={true}
                                title={!category || category == '' ? defaultCategory : category}
                                shortDescription={title == '' ? defaultTitle : title}
                                imageUrl={imageUrl == '' ? defaultImagem : imageUrl}
                                id={7}
                            />
                        </div>
                        <div className="col-span-2 row-span-2 col-start-5 row-start-1 h-32">
                            <p className={'mb-3 text-lg font-semibold'}>Pequeno</p>
                            <ShortNoticiaCardDetailedRight
                                isClicable={false}
                                title={!category || category == '' ? defaultCategory : category}
                                subTitle={title == '' ? defaultTitle : title}
                                imageUrl={imageUrl == '' ? defaultImagem : imageUrl}
                                description={subtitle == '' ? defaultSubtitle : subtitle}
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

export default CriarNoticiaInformacoesBasicas;
