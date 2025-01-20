import React from "react";
import {Select, SelectItem} from "@nextui-org/react";
import ReactCountryFlag from "react-country-flag";
import {Moed} from "@prisma/client";

interface CurrencySelectProps {
    value: Moed;
    collection: Moed[];
    onChange: (value: Moed) => void;
    label: string;
}


const CurrencySelect: React.FC<CurrencySelectProps> = ({value, onChange, label, collection}) => {
    return (
        <div className={'w-2/5'}>
            <CustomSelect onChange={onChange} code={value.codigoBandeira} name={'categoria'} label={label}
                          collection={collection}/>
        </div>
    );
};

interface CustomInput {
    name: string,
    label: string,
    onChange: (value: Moed) => void,
    errorMessage?: string,
    type?: string,
    code: string,
    startContent?: React.ReactNode
    endContent?: React.ReactNode
}

const CustomSelect: React.FC<CustomInput & { collection: Moed[] }> = (
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
        multiple={false}
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
            onChange(collection.find((item) => item.codigoBandeira === e.currentKey) as Moed);
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
            } key={item.codigoBandeira} value={item.codigoBandeira}>
                {item.nome}
            </SelectItem>
        ))}
    </Select>
};
export default CurrencySelect;