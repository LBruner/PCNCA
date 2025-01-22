import React from "react";
import {BsArrowLeft} from "react-icons/bs";

interface VoltarBtnProps {
    className?: string
}

const VoltarBtn: React.FC<VoltarBtnProps> = ({className}) => {
    return (
        <button
            onClick={() => window.history.back()}
            className={`${className ?? 'border-green-700 text-green-700 hover:bg-green-50'} inline-flex items-center px-6 py-3 border-2  font-semibold rounded-lg transition-colors w-full md:w-auto justify-center `}
        >
            <BsArrowLeft size={20} className="mr-2"/>
            Voltar
        </button>
    )
}

export default VoltarBtn;