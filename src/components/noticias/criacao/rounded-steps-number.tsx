import React from "react";

interface StepsNumberProps {
    number: number;
    isEnabled: boolean
}
const RoundedStepsNumber: React.FC<StepsNumberProps> = ({number, isEnabled}) => {
    return (
        <div className={`w-8 h-8 bg-white border-2  rounded-full flex items-center justify-center ${isEnabled ? 'bg-blue-50 border-blue-500' : 'border-gray-200'}`}>
            <span className={`${isEnabled ? 'text-blue-500' : 'text-gray-300 dark:text-black'}`}>{number}</span>
        </div>
    )
}

export default RoundedStepsNumber;