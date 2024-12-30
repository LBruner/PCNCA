import React, {useState} from "react";
import {Pessoa} from "@prisma/client";
import ProfileSettingsBody from "@/components/configuracoes/meu-perfil/ProfileSettingsBody";
import CriarPessoaFormControls from "@/components/pessoas/criar/CriarPessoaFormControls";
import {criarPessoa, editarPessoa} from "@/actions/pessoas";
import {Spinner} from "@nextui-org/react";

interface CriarPessoaConfirmacaoProps {
    pessoa: Pessoa;
    currentScreenIndex: number;
    setScreenIndex: (index: number) => void;
    shouldCreatePessoa: boolean;
}

const CriarPessoaConfirmacao: React.FC<CriarPessoaConfirmacaoProps> = ({pessoa,currentScreenIndex, setScreenIndex, shouldCreatePessoa}) => {
    const [isLoading, setIsLoading] = useState(false);
    console.log(pessoa);
    console.log(shouldCreatePessoa)
    const onCreatePessoa = async () => {
        setIsLoading(true);

        shouldCreatePessoa ? await criarPessoa(pessoa) : await editarPessoa(pessoa);

        setIsLoading(false);
    }

    return (

        <div className={'flex flex-col justify-center items-center h-full w-full'}>
            {isLoading && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-40">
                    <Spinner color={'warning'}/>
                </div>
            )}
            <>
                <ProfileSettingsBody user={pessoa}/>
                <CriarPessoaFormControls submitForm={onCreatePessoa} currentScreenIndex={currentScreenIndex} setScreenIndex={setScreenIndex}/>
            </>
        </div>
    )
}

export default CriarPessoaConfirmacao;