import React from "react";
import PlaneStepsGuide from "@/components/pessoas/criar/plane-steps-guide";

interface CriarPessoaInputWrapperProps {
    children: React.ReactNode;
    screenIndex: number;
    setScreenIndex: React.Dispatch<React.SetStateAction<number>>;
}

const CriarPessoaInputWrapper: React.FC<CriarPessoaInputWrapperProps> = ({screenIndex, setScreenIndex, children,}) => {
    return (
        <div className={'px-36 flex-col items-center justify-center'}>
            <div className={'flex items-center mt-12 gap-2 '}>
                <PlaneStepsGuide isEnabled={screenIndex >= 0} number={1} text={'Informações Básicas'}/>
                <PlaneStepsGuide isEnabled={screenIndex > 0} number={2} text={'Detalhes e endereço'}/>
                <PlaneStepsGuide isEnabled={screenIndex > 1} number={3} text={'Finalizar criação'}/>
            </div>
            {children}
        </div>
    )
}

export default CriarPessoaInputWrapper;