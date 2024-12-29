import React from "react";
import RoundedStepsNumber from "@/components/noticias/criacao/rounded-steps-number";

interface StepsGuideProps {
    number: number;
    text: string;
    isEnabled: boolean,
}
const RoundedStepsGuide: React.FC<StepsGuideProps> = ({text,number,isEnabled,}) => {
    return (
        <div className={'py-4 px-2 flex items-center justify gap-3'}>
            <RoundedStepsNumber isEnabled={isEnabled} number={number}/>
            <p className={`font-semibold ${isEnabled ? '' : 'text-gray-300'}`}>{text}</p>
        </div>
    )
}

export default RoundedStepsGuide;