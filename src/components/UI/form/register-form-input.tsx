import React from "react";
import {Input, InputProps} from "@nextui-org/react";

const RegisterFormInput: React.FC<InputProps> = (props) => {
    return (
        <div className={'h-full w-full'}>
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

export default RegisterFormInput;