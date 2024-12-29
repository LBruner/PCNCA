import React, {ChangeEvent} from 'react';
import RegisterFormInput from "@/components/UI/form/register-form-input";
import {formatCPF} from "@/helpers";

interface CPFInputProps {
    onChange: (value: string) => void;
    hasError?: boolean;
    errorMessage?: string;
    cpf: string,
    setCPF: (value: string) => void;
}

const CPFInput: React.FC<CPFInputProps> = (props) => {

    const handleCPFChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        const formattedCPF = formatCPF(value);
        props.setCPF(formattedCPF);
        props.onChange(formattedCPF);
    };

    return (
        <RegisterFormInput
            title={'CPF'}
            errorMessage={props.errorMessage}
            isInvalid={props.hasError}
            name={'cpf'}
            type="text"
            value={props.cpf}
            onChange={handleCPFChange}
            placeholder="CPF (somente números)"
            maxLength={14}
        />
    );
};

export default CPFInput;
