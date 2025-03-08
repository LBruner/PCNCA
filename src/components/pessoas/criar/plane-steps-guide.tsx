import React from "react";

interface StepsGuideProps {
    number: number;
    text: string;
    isEnabled: boolean,
}

const PlaneStepsGuide: React.FC<StepsGuideProps> = ({text,number,isEnabled}) => {
    return (
        <div className={'py-4 w-full px-2 flex flex-col items-start justify gap-3'}>
            <p className={`font-semibold dark:text-blue-400 text-blue-800 ${isEnabled ? '' : 'text-gray-300'}`}>{`${number}. ${text}` }</p>
            <div className={`h-2 w-full ${isEnabled ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-300'}`}/>
        </div>
    )
}

export default PlaneStepsGuide;