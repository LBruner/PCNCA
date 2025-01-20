'use client';

import React, {useRef, useState} from "react";
import {criarNoticia, editarNoticia, NoticiaComAutorCultura, NoticiaCriacao, NoticiaEdicao} from "@/actions/noticias";
import CriarNoticiaVizualizarPublicar from "@/components/noticias/criacao/telas/criar-noticia-vizualizar-publicar";
import {generateMarkdown} from "@/helpers/noticia/criacao/criar-noticia";
import RoundedStepsGuide from "@/components/noticias/criacao/rounded-steps-guide";
import Spacer from "@/components/noticias/criacao/spacer";
import {Button, Spinner} from "@nextui-org/react";
import {Cultura} from "@prisma/client";
import CriarNoticiaInformacoesBasicas from "@/components/noticias/criacao/telas/criar-noticia-informacoes-basicas";
import CriarNoticiaConteudo from "@/components/noticias/criacao/telas/criar-noticia-conteudo";
import {NoticiaBasica} from "@/models/noticiaBasica";

interface NoticiaCreateForm {
    culturas: Cultura[];
    noticiaCriada?: NoticiaComAutorCultura;
}

const getInitialNoticia = (article: NoticiaComAutorCultura): NoticiaBasica => ({
    titulo: article.titulo,
    subtitulo: article.subtitulo,
    imagemLink: article.imagemLink,
    idCultura: article.idCultura,
    descricao: article.descricao!,
    idAutor: article.idAutor,
});

const NoticiaCreateForm: React.FC<NoticiaCreateForm> = ({culturas, noticiaCriada}) => {
    const [content, setNoticiaContent] = useState(noticiaCriada?.corpo ?? "# Escreva aqui sua notícia");
    const [screenIndex, setScreenIndex] = useState(0);
    const [noticia, setNoticia] = useState<NoticiaBasica | undefined>(noticiaCriada ? getInitialNoticia(noticiaCriada) : undefined);
    const [isLoading, setIsLoading] = useState(false);

    const handleNoticiaContentChange = (newContent: string) => {
        setNoticiaContent(newContent);
    };

    const criarOuEditarNoticia = async (
        acao: 'criar' | 'editar',
        noticiaDados: Partial<NoticiaCriacao | NoticiaEdicao>
    ) => {
        setIsLoading(true);

        const data = {
            titulo: noticia?.titulo!,
            subtitulo: noticia?.subtitulo!,
            imagemLink: noticia?.imagemLink!,
            idCultura: noticia?.idCultura!,
            idAutor: 3,
            corpo: content,
            descricao: noticia?.descricao!,
            ...noticiaDados,
        };

        if (acao === 'criar') {
            await criarNoticia(data as NoticiaCriacao);
        } else if (acao === 'editar') {
            await editarNoticia(data as NoticiaEdicao);
        }

        setIsLoading(false);
    };

    const criarNovaNoticia = async () => {
        await criarOuEditarNoticia('criar', {});
    };

    const editarNoticiaCriada = async () => {
        await criarOuEditarNoticia('editar', {notId: noticiaCriada?.notId!});
    };
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
                    noticiaCriada != null ? await editarNoticiaCriada() : await criarNovaNoticia();
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
            currentScreen =
                <CriarNoticiaInformacoesBasicas
                    noticia={noticia} setArticle={setNoticia}
                    ref={childRef}
                    culturas={culturas}
                    setScreenIndex={setScreenIndex}
                />
            break;
        case 1:
            currentScreen =
                <CriarNoticiaConteudo
                    content={content}
                    handleChange={handleNoticiaContentChange}
                />;
            break;
        case 2:
            currentScreen =
                <CriarNoticiaVizualizarPublicar
                    noticiaCompleta={generateMarkdown(noticia?.titulo!, noticia?.subtitulo!, noticia?.imagemLink!, content)}
                />
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
