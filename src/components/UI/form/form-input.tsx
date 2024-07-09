import React, {ChangeEventHandler, HTMLInputTypeAttribute} from "react";
import {Input} from "@nextui-org/react";

interface FormInputProps {
    name: string;
    errorMessage?: string;
    isInvalid?: boolean;
    title: string;
    value: string;
    label?: string;
    onChange: ChangeEventHandler<HTMLInputElement>
    placeholder?: string;
    required?: boolean;
    isClearable?: boolean;
    size?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg";
    inputMode?: "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
    fullWidth?: boolean;
    variant?: "bordered" | "faded" | "underlined" | "flat";
    endContent?: React.ReactNode;
    type?: HTMLInputTypeAttribute;
    maxLength?: number;
    minLength?: number;
}

const FormInput: React.FC<FormInputProps> = (props) => {
    return (
        <div className={' h-full w-full'}>
            <Input
                name={props.name}
                variant={'underlined'}
                color={'warning'}
                label={props.label}
                size={props.size || 'lg'}
                type={props.type}
                endContent={props.endContent}
                isClearable={props.isClearable}
                placeholder={props.title}
                inputMode={props.inputMode}
                required={props.required}
                radius={props.radius || 'none'}
                value={props.value}
                maxLength={props.maxLength}
                minLength={props.minLength}
                onChange={props.onChange}
                errorMessage={props.errorMessage}
                isInvalid={props.isInvalid}
            />
        </div>
    )
}

export default FormInput;