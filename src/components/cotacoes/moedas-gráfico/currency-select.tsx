'use client';
import React from "react";
import {Select, SelectItem} from "@heroui/react";
import ReactCountryFlag from "react-country-flag";
import {Moeda} from "@prisma/client";

interface CurrencySelectProps {
    value: Moeda;
    collection: Moeda[];
    onChange: (value: Moeda) => void;
    label: string;
}


const CurrencySelect: React.FC<CurrencySelectProps> = ({value, onChange, label, collection}) => {
    return (
        <div className={'w-2/5'}>
            <CustomSelect
                onChange={onChange}
                code={value.codigoBandeira}
                name={'categoria'} label={label}
                collection={collection}/>
        </div>
    );
};

interface CustomInput {
    name: string,
    label: string,
    onChange: (value: Moeda) => void,
    errorMessage?: string,
    type?: string,
    code: string,
    startContent?: React.ReactNode
    endContent?: React.ReactNode
}

const CustomSelect: React.FC<CustomInput & { collection: Moeda[] }> = (
    {
        name,
        label,
        collection,
        code,
        onChange
    }
) => {
    return <Select
        selectedKeys={[code]}
        name={name}
        startContent={<div className="flex items-center">
            <ReactCountryFlag
                countryCode={code}
                svg
                style={{fontSize: '2em', lineHeight: '2em'}}
            />
        </div>}
        classNames={{
            label: "font-medium font-lg",
        }}
        onSelectionChange={(e: any) => {
            onChange(collection.find((item) => item.codigoBandeira === e.currentKey) as Moeda);
        }}
        size={'lg'}
        labelPlacement={'outside'}
        label={label}
    >
        {collection.map((item) => (
            <SelectItem startContent={
                <div className="flex items-center">
                    <ReactCountryFlag
                        countryCode={item.codigoBandeira}
                        svg
                        style={{fontSize: '2em', lineHeight: '2em'}}
                    />
                </div>
            } key={item.codigoBandeira}>
                {item.nome}
            </SelectItem>
        ))}
    </Select>
};
export default CurrencySelect;