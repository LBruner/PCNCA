import React from "react";

interface FormaPagamentoButtonProps {
    title: string;
    isSelected: boolean;
    icon: React.ReactNode;
}

const FormaPagamentoButton: React.FC<FormaPagamentoButtonProps> = ({title, icon, isSelected}) => {
    return (
        <div
            className={`${isSelected ? 'border-blue-500' : 'shadow'} px-4 py-6 gap-1 flex flex-col border rounded-lg hover:bg-gray-100`}>
            <div>
                {icon}
            </div>
            <div>
                <p className={'text-lg'}>{title}</p>
            </div>
        </div>
    )
}

export default FormaPagamentoButton;