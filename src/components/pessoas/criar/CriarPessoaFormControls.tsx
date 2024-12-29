import React from "react";
import Link from "next/link";

interface CriaPessoaFormControlsProps {
    submitForm: () => void;
    currentScreenIndex: number;
    setScreenIndex: (index: number) => void;
}

const CriarPessoaFormControls: React.FC<CriaPessoaFormControlsProps> = ({submitForm,currentScreenIndex, setScreenIndex,}) => {
    return (
        <div className={'flex justify-between my-6 w-full items-center'}>
            <p className={'text-gray-500 font-medium'}>
                * Campo de preenchimento obrigatório
            </p>
            <div className={'flex gap-12 items-center'}>
                {currentScreenIndex > 0 && <Link href={''} onClick={() => {setScreenIndex(currentScreenIndex - 1)}}>
                    <p className={'text-red-400 hover:text-red-500'}>
                        Etapa Anterior
                    </p>
                </Link>}
                <button type={'button'} onClick={submitForm}
                        className={'hover:bg-blue-100 text-blue-500 border-blue-500 border-2 rounded-lg p-3'}
                >
                    <p>
                        {currentScreenIndex != 2 ? 'Próxima Etapa' : 'Concluir'}
                    </p>
                </button>
            </div>
        </div>
    )
}

export default CriarPessoaFormControls;