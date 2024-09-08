import React from "react";
import {Input} from "@nextui-org/react";

interface ConfigurarNoticiaFormFieldProps {
    titulo: string;
    subtitulo: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const CriarNoticiaInformacoesBasicasInputField: React.FC<ConfigurarNoticiaFormFieldProps> = (
    {
        titulo,
        subtitulo,
        value,
        onChange,
        placeholder
    }
) => {
    return (
        <div className={'flex gap-12 w-full justify-around'}>
            <div className={'flex w-96 flex-col'}>
                <p className={'text-lg w-64 font-semibold'}>{titulo}</p>
                <p className={'text-md w-80 text-gray-500'}>{subtitulo}</p>
            </div>
            <CustomInputButton
                value={value} defaultValue={'' ?? undefined} name={'nome'} label={''}
                placeholder={placeholder || ''}
                isInvalid={false}
                errorMessage={''}
                onChange={onChange}
            />
        </div>
    )
}

interface CustomInput {
    defaultValue?: string,
    value?: string,
    name: string,
    onChange: (value: string) => void;
    label: string,
    placeholder: string,
    isInvalid: boolean,
    errorMessage?: string,
    type?: string,
    startContent?: React.ReactNode
    endContent?: React.ReactNode
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
        isInvalid,
        type,
        startContent,
        endContent,
    }
) => {
    return <Input
        value={value} onChange={event => onChange(event.target.value)} defaultValue={defaultValue} name={name}
        isRequired={true}
        required={true}
        className={'font-medium'} size={'lg'}
        type={type} label={label}
        labelPlacement={'outside'}
        placeholder={placeholder} isInvalid={isInvalid} errorMessage={errorMessage}
        startContent={startContent} endContent={endContent}
    />
};


export default CriarNoticiaInformacoesBasicasInputField;