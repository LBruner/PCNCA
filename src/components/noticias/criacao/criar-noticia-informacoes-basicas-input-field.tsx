import React, {HTMLInputTypeAttribute} from "react";
import {Input} from "@heroui/react";

interface ConfigurarNoticiaFormFieldProps {
    titulo: string;
    subtitulo: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: HTMLInputTypeAttribute,
    required?: boolean,
    icon?: React.ReactNode
    errorMessage?: string
    isInvalid?: boolean;
    minLength?: number;
    maxLength?: number;
}

const formatBrazilianPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');

    const limitedDigits = digits.slice(0, 11);

    const match = limitedDigits.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (!match) return value;

    const [, areaCode, firstPart, secondPart] = match;
    if (secondPart) {
        return `(${areaCode}) ${firstPart}-${secondPart}`;
    } else if (firstPart) {
        return `(${areaCode}) ${firstPart}`;
    } else if (areaCode) {
        return `(${areaCode}`;
    }
    return '';
};

const CriarNoticiaInformacoesBasicasInputField: React.FC<ConfigurarNoticiaFormFieldProps> = (
    {
        titulo,
        subtitulo,
        value,
        onChange,
        placeholder,
        type,
        required,
        icon,
        errorMessage,
        isInvalid,
        minLength,
    }
) => {
    return (
        <div className={'flex w-full'}>
            <div className={'flex flex-col '}>
                <p className={'text-lg w-48 font-semibold'}>{titulo}</p>
                <p className={'text-md w-48 text-gray-500 dark:text-gray-200'}>{subtitulo}</p>
            </div>
            <CustomInputButton
                minLength={minLength}
                required={required}
                value={value} defaultValue={undefined} name={'nome'} label={''}
                placeholder={placeholder || ''}
                isInvalid={isInvalid ?? false}
                errorMessage={errorMessage ?? ''}
                onChange={onChange}
                type={type}
                endContent={icon}
            />
        </div>
    )
}

CriarNoticiaInformacoesBasicasInputField.displayName = "CriarNoticiaInformacoesBasicasInputField";

interface CustomInput {
    defaultValue?: string,
    value?: string,
    name: string,
    onChange: (value: string) => void;
    label: string,
    placeholder: string,
    isInvalid: boolean,
    errorMessage?: string,
    type?: HTMLInputTypeAttribute,
    startContent?: React.ReactNode
    endContent?: React.ReactNode
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}

const CustomInputButton: React.FC<CustomInput> = (
    {
        value,
        defaultValue,
        name,
        label,
        placeholder,
        onChange,
        errorMessage,
        type,
        startContent,
        endContent,
        required,
        minLength,
        maxLength
    }
) => {

    const handleInputChange = (inputValue: string) => {
        if (type === 'tel') {
            onChange(formatBrazilianPhoneNumber(inputValue));
        } else {
            onChange(inputValue);
        }
    };

    return <Input
        maxLength={maxLength}
        max={maxLength}
        minLength={minLength}
        value={value} onChange={(event) => handleInputChange(event.target.value)}
        defaultValue={defaultValue} name={name}
        isRequired={required ?? true}
        required={true}
        className={'font-medium w-full'} size={'lg'}
        type={type} label={label}
        labelPlacement={'outside'}
        placeholder={placeholder} errorMessage={errorMessage}
        startContent={startContent} endContent={endContent}
    />
};


export default CriarNoticiaInformacoesBasicasInputField;