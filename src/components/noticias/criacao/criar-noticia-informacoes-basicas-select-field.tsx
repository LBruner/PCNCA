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

const CriarNoticiaInformacoesBasicasSelectField: React.FC<ConfigurarNoticiaFormFieldProps> = ({
                                                                                                  valor,
                                                                                                  titulo,
                                                                                                  subtitulo,
                                                                                                  collection,
                                                                                                  onChange,
                                                                                                  placeholder
                                                                                              }) => {
    const selectedKeys = valor == null ? [] : [valor];
    return (
        <div className={'flex w-full'}>
            <div className={'flex flex-col'}>
                <p className={'text-lg w-48 font-semibold'}>{titulo}</p>
                <p className={'text-md w-48 text-gray-500 dark:text-gray-200'}>{subtitulo}</p>
            </div>
            <Select
                aria-label={' '}
                label={undefined}
                onChange={event => onChange(event.target.value)}
                value={valor}
                selectedKeys={selectedKeys}
                name={'name'}
                classNames={{
                    base: "font-medium font-2xl",
                }}
                size={'lg'}
                labelPlacement={'outside-left'}
                placeholder={placeholder}
            >
                {collection.map((item) => (
                    <SelectItem aria-label={''} key={item.uid}>
                        {item.name}
                    </SelectItem>
                ))}
            </Select>
        </div>
    )
}


export default CriarNoticiaInformacoesBasicasSelectField;