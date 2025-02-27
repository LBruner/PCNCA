import React from "react";
import {Select, SelectItem} from "@heroui/react";
import {FilterCollection} from "@/models/shared/FilterCollection";

interface ConfigurarNoticiaFormFieldProps {
    titulo: string;
    subtitulo: string;
    collection: FilterCollection[];
    valor?: string;
    onChange: (value: string) => void;
    placeholder: string;
}

const CriarNoticiaInformacoesBasicasSelectField: React.FC<ConfigurarNoticiaFormFieldProps> = ({valor, titulo, subtitulo, collection, onChange, placeholder}) => {
        const selectedKeys = valor == null ? [] : [valor];
    return (
        <div className={'flex w-full items-start'}>
            <div className={'flex flex-col'}>
                <p className={'text-lg w-48 font-semibold'}>{titulo}</p>
                <p className={'text-md w-48 text-gray-500'}>{subtitulo}</p>
            </div>
            <Select
                onChange={event => onChange(event.target.value)}
                value={valor}
                selectedKeys={selectedKeys}
                name={'name'}
                isRequired={true}
                classNames={{
                    label: "font-medium font-lg",
                }}
                size={'lg'}
                labelPlacement={'outside'}
                placeholder={placeholder}
            >
                {collection.map((item) => (
                    <SelectItem key={item.uid}>
                        {item.name}
                    </SelectItem>
                ))}
            </Select>
        </div>
    )
}


export default CriarNoticiaInformacoesBasicasSelectField;