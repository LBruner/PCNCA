'use client';

import React, {useRef, useState} from "react";
import {createNoticia} from "@/actions/noticias";
import CriarNoticiaVizualizarPublicar from "@/components/noticias/criacao/telas/criar-noticia-vizualizar-publicar";
import {generateMarkdown} from "@/helpers/noticia/criacao/criar-noticia";
import StepsGuide from "@/components/noticias/criacao/steps-guide";
import Spacer from "@/components/noticias/criacao/spacer";
import {Button, Spinner} from "@nextui-org/react";
import {Category} from "@prisma/client";
import CriarNoticiaInformacoesBasicas from "@/components/noticias/criacao/telas/criar-noticia-informacoes-basicas";
import {Artigo} from "@/models/artigo";
import CriarNoticiaConteudo from "@/components/noticias/criacao/telas/criar-noticia-conteudo";

interface NoticiaCreateForm {
    categories: Category[]
}

const NoticiaCreateForm: React.FC<NoticiaCreateForm> = ({categories}) => {
    const [content, setNoticiaContent] = useState("# Escreva aqui sua notícia");
    const [screenIndex, setScreenIndex] = useState(0);
    const [article, setArticle] = useState<Artigo | undefined>();
    const [isLoading, setIsLoading] = useState(false);

    const handleNoticiaContentChange = (newContent: string) => {
        setNoticiaContent(newContent);
    };

    const createNovaNoticia = async () => {
        setIsLoading(true);
        await createNoticia(
            {
                title: article?.title!,
                subtitle: article?.subtitle!,
                imageUrl: article?.imageUrl!,
                categoryName: article?.categoryNome!,
                authorId: 3,
                categoryId: article?.categoryId!,
                thumbnailSubtitle: article?.thumbnailSubtitle,
                status: article?.status,
                content: content,
            });
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

            <div className={'mt-32 flex justify-center items-center h-auto'}>
                <div className={'w-[75%] mb-8 bg-white h-full border rounded-lg'}>
                    <div className={'flex px-4 border-b-1 items-center justify-between'}>
                        <div className={'flex items-center gap-2'}>
                            <StepsGuide isEnabled={screenIndex == 0} number={1} text={'Informações Básicas'}/>
                            <Spacer/>
                            <StepsGuide isEnabled={screenIndex == 1} number={2} text={'Conteúdo da Notícia'}/>
                            <Spacer/>
                            <StepsGuide isEnabled={screenIndex == 2} number={3} text={'Visualizar e Publicar'}/>
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
