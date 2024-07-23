import React, {ChangeEvent} from 'react';
import RegisterFormInput from "@/components/UI/form/register-form-input";

interface CPFInputProps {
    onChange: (value: string) => void;
    hasError?: boolean;
    errorMessage?: string;
    cpf: string,
    setCPF: (value: string) => void;
}

const CPFInput: React.FC<CPFInputProps> = (props) => {


    const formatCPF = (value: string): string => {
        const cleanedValue = value.replace(/\D/g, '');

        if (cleanedValue.length <= 3) {
            return cleanedValue;
        } else if (cleanedValue.length <= 6) {
            return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3)}`;
        } else if (cleanedValue.length <= 9) {
            return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3, 6)}.${cleanedValue.slice(6)}`;
        } else {
            return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3, 6)}.${cleanedValue.slice(6, 9)}-${cleanedValue.slice(9, 11)}`;
        }
    };

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
