import React from "react";
import {SelectProps, Select, SelectItem} from "@heroui/react";
import {FilterCollection} from "@/models/shared/FilterCollection";

interface RegisterFormSelectProps {
    value: string;
    collection: FilterCollection[];
    onChange: (value: string) => void;
}

const RegisterFormSelect: React.FC<{selectProps: SelectProps & RegisterFormSelectProps}> = (props) => {
    return (
        <div className={'h-full w-full'}>
            <Select
                classNames={props?.selectProps.classNames}
                className={props?.selectProps.className}
                selectedKeys={props.selectProps?.value ? [props.selectProps?.value] : undefined}
                multiple={false}
                name={props.selectProps?.name}
                variant={'underlined'}
                color={'warning'}
                label={props.selectProps?.label}
                size={props.selectProps?.size || 'lg'}
                endContent={props.selectProps?.endContent}
                placeholder={props.selectProps?.title}
                inputMode={props.selectProps?.inputMode}
                required={props.selectProps?.required}
                radius={props.selectProps?.radius || 'none'}
                value={props.selectProps?.value}
                onChange={props.selectProps?.onChange}
                errorMessage={props.selectProps?.errorMessage}
                isInvalid={props.selectProps?.isInvalid}
            >
                {props.selectProps.collection.map((item) => (
                    <SelectItem key={item.uid}>
                        {item.name}
                    </SelectItem>
                ))}
            </Select>
        </div>
    )
}

export default RegisterFormSelect;