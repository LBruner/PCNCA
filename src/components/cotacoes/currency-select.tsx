import React from "react";
import {Select, SelectItem} from "@nextui-org/react";
import {currencies, Currency} from "@/helpers/moedas";
import ReactCountryFlag from "react-country-flag";

interface CurrencySelectProps {
    value: Currency;
    onChange: (value: Currency) => void;
}


const CurrencySelect: React.FC<CurrencySelectProps> = ({value, onChange}) => {
    return (
        <div className={'w-2/5'}>
            <CustomSelect onChange={onChange} code={value.code} name={'categoria'} label={'Categoria'}
                          collection={currencies}/>
        </div>
    );
};

interface CustomInput {
    name: string,
    label: string,
    onChange: (value: Currency) => void,
    errorMessage?: string,
    type?: string,
    code: string,
    startContent?: React.ReactNode
    endContent?: React.ReactNode
}

const CustomSelect: React.FC<CustomInput & { collection: Currency[] }> = (
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
            onChange(collection.find((item) => item.code === e.currentKey) as Currency);
        }}
        size={'lg'}
        labelPlacement={'outside'}
        label={label}
    >
        {collection.map((item) => (
            <SelectItem startContent={
                <div className="flex items-center">
                    <ReactCountryFlag
                        countryCode={item.code}
                        svg
                        style={{fontSize: '2em', lineHeight: '2em'}}
                    />
                </div>
            } key={item.code} value={item.code}>
                {item.label}
            </SelectItem>
        ))}
    </Select>
};
export default CurrencySelect;