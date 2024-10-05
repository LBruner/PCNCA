import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Currency } from "@/helpers/moedas";
import ReactCountryFlag from "react-country-flag";

interface CurrencySelectProps {
    value: Currency;
    collection: Currency[];
    onChange: (value: Currency) => void;
    label: string;
}


const CurrencySelect: React.FC<CurrencySelectProps> = ({ value, onChange, label, collection }) => {
    return (
        <div className={'w-2/5'}>
            <CustomSelect onChange={onChange} code={value.flagCode} name={'categoria'} label={label}
                collection={collection} />
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
                style={{ fontSize: '2em', lineHeight: '2em' }}
            />
        </div>}
        classNames={{
            label: "font-medium font-lg",
        }}
        onSelectionChange={(e: any) => {
            onChange(collection.find((item) => item.flagCode === e.currentKey) as Currency);
        }}
        size={'lg'}
        labelPlacement={'outside'}
        label={label}
    >
        {collection.map((item) => (
            <SelectItem startContent={
                <div className="flex items-center">
                    <ReactCountryFlag
                        countryCode={item.flagCode}
                        svg
                        style={{ fontSize: '2em', lineHeight: '2em' }}
                    />
                </div>
            } key={item.flagCode} value={item.flagCode}>
                {item.label}
            </SelectItem>
        ))}
    </Select>
};
export default CurrencySelect;