'use client';

import React, {useRef, useState} from "react";
import {createNoticia, editNoticia} from "@/actions/noticias";
import CriarNoticiaVizualizarPublicar from "@/components/noticias/criacao/telas/criar-noticia-vizualizar-publicar";
import {generateMarkdown} from "@/helpers/noticia/criacao/criar-noticia";
import RoundedStepsGuide from "@/components/noticias/criacao/rounded-steps-guide";
import Spacer from "@/components/noticias/criacao/spacer";
import {Button, Spinner} from "@nextui-org/react";
import {Category} from "@prisma/client";
import CriarNoticiaInformacoesBasicas from "@/components/noticias/criacao/telas/criar-noticia-informacoes-basicas";
import {Artigo} from "@/models/artigo";
import CriarNoticiaConteudo from "@/components/noticias/criacao/telas/criar-noticia-conteudo";
import {NoticiasComAutorEstoque} from "@/components/adm/noticias/adm-noticias-table";

interface NoticiaCreateForm {
    categories: Category[];
    createdNoticia?: NoticiasComAutorEstoque;
}

const getInitialNoticia = (article: NoticiasComAutorEstoque): Artigo => ({
    title: article.title,
    subtitle: article.subtitle,
    imageUrl: article.imageUrl,
    categoryNome: article.category.name,
    categoryId: article.categoryId,
    thumbnailSubtitle: article.thumbnailText,
    status: article.status,
});

const NoticiaCreateForm: React.FC<NoticiaCreateForm> = ({categories, createdNoticia}) => {
    const [content, setNoticiaContent] = useState(createdNoticia?.content ?? "# Escreva aqui sua notícia");
    const [screenIndex, setScreenIndex] = useState(0);
    const [article, setArticle] = useState<Artigo | undefined>(createdNoticia ? getInitialNoticia(createdNoticia) : undefined);
    const [isLoading, setIsLoading] = useState(false);

    const handleNoticiaContentChange = (newContent: string) => {
        setNoticiaContent(newContent);
    };

    const createNovaNoticia = async () => {
        setIsLoading(true);

        const data = {
            title: article?.title!,
            subtitle: article?.subtitle!,
            imageUrl: article?.imageUrl!,
            categoryName: article?.categoryNome!,
            authorId: 3,
            categoryId: article?.categoryId!,
            thumbnailSubtitle: article?.thumbnailSubtitle,
            status: article?.status,
            content: content,
            id: createdNoticia?.id.toString()
        }

        console.log(createdNoticia?.id)
        createdNoticia ? await editNoticia(data) : await createNoticia(data);

        setIsLoading(false);
    }
    const childRef = useRef<HTMLFormElement>(null);

    const goToNextScreen = async () => {
        const handleScreenAction = async () => {
            switch (screenIndex) {
                case 0:
                    if (childRef.current) {
                        childRef.current.submitForm();
                    }
                    break;
                case 1:
                    setScreenIndex(screenIndex + 1);
                    break;
                case 2:
                    await createNovaNoticia();
                    break;
                default:
                    console.warn(`Unexpected screenIndex: ${screenIndex}`);
            }
        };

        await handleScreenAction();
    }

    let currentScreen;

    switch (screenIndex) {
        case 0:
            currentScreen = <CriarNoticiaInformacoesBasicas
                // @ts-ignore
                article={article} setArticle={setArticle} ref={childRef}
                categories={categories}
                setScreenIndex={setScreenIndex}
            />
            break;
        case 1:
            currentScreen = <CriarNoticiaConteudo content={content} handleChange={handleNoticiaContentChange}/>;
            break;
        case 2:
            currentScreen =
                <CriarNoticiaVizualizarPublicar
                    noticiaCompleta={generateMarkdown(article?.title!, article?.subtitle!, article?.imageUrl!, content)}/>
            break;
    }

    return (
        <>
            {isLoading && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-40">
                    <Spinner color={'warning'}/>
                </div>
            )}

            <div className={'flex justify-center items-center h-auto w-11/12'}>
                <div className={'mb-8 bg-white w-full h-full border rounded-lg'}>
                    <div className={'flex px-4 border-b-1 items-center justify-between'}>
                        <div className={'flex items-center gap-2'}>
                            <RoundedStepsGuide isEnabled={screenIndex == 0} number={1} text={'Informações Básicas'}/>
                            <Spacer/>
                            <RoundedStepsGuide isEnabled={screenIndex == 1} number={2} text={'Conteúdo da Notícia'}/>
                            <Spacer/>
                            <RoundedStepsGuide isEnabled={screenIndex == 2} number={3} text={'Visualizar e Publicar'}/>
                        </div>
                        <div className={'flex gap-3'}>
                            {screenIndex != 0 &&
                                <Button color={'default'} onClick={() => {
                                    setScreenIndex(prevState => prevState - 1)
                                }} type={'submit'}>Voltar</Button>}

                            <Button color={'primary'} onClick={goToNextScreen}
                                    type={'submit'}>{screenIndex == 2 ? 'Publicar' : 'Avançar'}</Button>
                        </div>
                    </div>
                    {currentScreen}
                </div>
            </div>
        </>
    )
}

export default NoticiaCreateForm;
