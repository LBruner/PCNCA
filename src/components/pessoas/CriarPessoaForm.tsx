'use client';
import React, {useState} from "react";
import CriarPessoaInformacoesBasicas from "@/components/pessoas/criar/CriarPessoaInformacoesBasicas";
import CriarPessoaInputWrapper from "@/components/pessoas/criar/CriarPessoaInputWrapper";
import {Pessoa} from "@prisma/client";
import CriarPessoaDetalhes from "@/components/pessoas/criar/CriarPessoaDetalhes";
import CriarPessoaConfirmacao from "@/components/pessoas/criar/CriarPessoaConfirmacao";

export interface PessoaBasica {
    nome: string;
    email: string;
    contato: string;
    imagemUrl: string;
    dataNascimento: Date;
    categoria: string;
}

const CriarPessoaForm: React.FC = _ => {
    const [screenIndex, setScreenIndex] = useState(0);
    const [pessoaCompleta, setPessoaPessoaCompleta] = useState<Pessoa | null>(null);
    const [pessoaBasica, setPessoaBasica] = useState<PessoaBasica | null>(null);

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
                <CriarPessoaConfirmacao pessoa={pessoaCompleta!} currentScreenIndex={screenIndex}
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
        <div className={'flex justify-center items-center h-auto w-11/12'}>
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