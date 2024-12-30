'use client';
import React, {useState} from "react";
import CriarPessoaInformacoesBasicas from "@/components/pessoas/criar/CriarPessoaInformacoesBasicas";
import CriarPessoaInputWrapper from "@/components/pessoas/criar/CriarPessoaInputWrapper";
import {Pessoa} from "@prisma/client";
import CriarPessoaDetalhes from "@/components/pessoas/criar/CriarPessoaDetalhes";
import CriarPessoaConfirmacao from "@/components/pessoas/criar/CriarPessoaConfirmacao";

export interface CriarPessoaFormProps {
    pessoaCriada?: Pessoa
}

const CriarPessoaForm: React.FC<CriarPessoaFormProps> = ({pessoaCriada}) => {
    const [screenIndex, setScreenIndex] = useState(0);
    const [pessoaCompleta, setPessoaPessoaCompleta] = useState<Pessoa | null>(pessoaCriada ?? null);
    const [pessoaBasica, setPessoaBasica] = useState<Pessoa | null>(pessoaCriada ?? null);

    let currentScreen;

    switch (screenIndex) {
        case 0:
            currentScreen =
                <CriarPessoaInformacoesBasicas
                    pessoa={pessoaBasica}
                    setPessoa={setPessoaBasica}
                    currentScreenIndex={screenIndex}
                    setScreenIndex={setScreenIndex}
                />
            break;
        case 1:
            currentScreen = <CriarPessoaDetalhes
                pessoaBasica={pessoaBasica!}
                pessoaCompleta={pessoaCompleta}
                setPessoaPessoaCompleta={setPessoaPessoaCompleta}
                currentScreenIndex={screenIndex}
                setScreenIndex={setScreenIndex}
            />
            break;
        case 2:
            currentScreen =
            // @ts-ignore
                <CriarPessoaConfirmacao shouldCreatePessoa={!pessoaCriada} pessoa={pessoaCriada ?  {...pessoaCompleta, id: pessoaCriada.id} : pessoaCompleta} currentScreenIndex={screenIndex}
                 setScreenIndex={setScreenIndex}/>
            break;
    }

    const header = <div className={'flex flex-col px-4 items-center justify-between'}>
        <div className={'flex flex-col items-center gap-4 justify-center'}>
            <p className={'text-4xl font-semibold'}>Cadastro de Nova Pessoa</p>
            <p className={'text-lg text-gray-600'}>{screenIndex != 2 ? 'Preencha as informações abaixo' : 'Revise o perfil e conclua a crição'}</p>
        </div>
    </div>

    return (
        <div className={'flex justify-center items-center h-auto w-full mt-36'}>
            <div className={'w-full h-full'}>
                {header}
                {<CriarPessoaInputWrapper screenIndex={screenIndex} setScreenIndex={setScreenIndex}>
                    {currentScreen}
                </CriarPessoaInputWrapper>}
            </div>
        </div>
    )
}

export default CriarPessoaForm;