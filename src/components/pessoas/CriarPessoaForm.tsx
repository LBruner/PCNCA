'use client';
import React, {useState} from "react";
import CriarPessoaInformacoesBasicas from "@/components/pessoas/criar/CriarPessoaInformacoesBasicas";
import CriarPessoaInputWrapper from "@/components/pessoas/criar/CriarPessoaInputWrapper";
import {CategoriaPessoa} from "@prisma/client";
import CriarPessoaDetalhes from "@/components/pessoas/criar/CriarPessoaDetalhes";
import CriarPessoaConfirmacao from "@/components/pessoas/criar/CriarPessoaConfirmacao";
import {PessoaCriacao, PessoaFisJurEnd} from "@/actions/pessoas";
import {getFlatPessoa} from "@/helpers/pessoas";
import {FilterCollection} from "@/models/shared/FilterCollection";
import VoltarBtn from "@/components/UI/VoltarBtn";

export interface CriarPessoaFormProps {
    pessoaCriada?: PessoaFisJurEnd;
    tiposPessoas: CategoriaPessoa[];
}

const CriarPessoaForm: React.FC<CriarPessoaFormProps> = ({pessoaCriada, tiposPessoas}) => {
    const [screenIndex, setScreenIndex] = useState(0);
    const [pessoaPraCriar, setPessoaPraCriar] = useState<PessoaCriacao>(pessoaCriada != null ? getFlatPessoa(pessoaCriada) : getFlatPessoa());
    let currentScreen;

    const tiposPessoaColletion: FilterCollection[] = tiposPessoas.map((tipo: CategoriaPessoa) => ({
        name: tipo.descricao,
        uid: tipo.id.toString()
    }));

    switch (screenIndex) {
        case 0:
            currentScreen =
                <CriarPessoaInformacoesBasicas
                    pessoa={pessoaPraCriar}
                    setPessoa={setPessoaPraCriar}
                    currentScreenIndex={screenIndex}
                    setScreenIndex={setScreenIndex}
                />
            break;
        case 1:
            currentScreen = <CriarPessoaDetalhes
                pessoa={pessoaPraCriar!}
                setPessoaPessoaCompleta={setPessoaPraCriar}
                currentScreenIndex={screenIndex}
                setScreenIndex={setScreenIndex}
                tiposPessoa={tiposPessoaColletion}
            />
            break;
        case 2:
            currentScreen =
                <CriarPessoaConfirmacao
                    shouldCreatePessoa={!pessoaCriada} pessoa={pessoaPraCriar} currentScreenIndex={screenIndex}
                    setScreenIndex={setScreenIndex}
                />
            break;
    }

    const header = <div className={'flex flex-col px-4 items-center justify-between'}>
        <div className={'flex px-12 justify-start w-full'}>
            <VoltarBtn className={'border-2 border-blue-500 text-blue-500 hover:bg-blue-50'}/>
        </div>
        <div className={'flex flex-col items-center gap-4 justify-center'}>
            <p className={'text-4xl font-semibold'}>{pessoaCriada ? 'Edição de Pessoa' : 'Criação de Pessoa'}</p>
            <p className={'text-lg text-gray-600 dark:text-white'}>{screenIndex != 2 ? 'Preencha as informações abaixo' : 'Revise o perfil e conclua a criação'}</p>
        </div>
    </div>

    return (
        <div className={'flex justify-center items-center h-fit w-full rounded-lg'}>
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