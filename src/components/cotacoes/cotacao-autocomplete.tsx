import React, {useState} from "react";
import {Autocomplete, AutocompleteItem, Card, Skeleton} from "@nextui-org/react";
import Image from "next/image";
import type {Product} from '@prisma/client';

interface CotacoesProps {
    cotacoes: Product[];
    selectedKey: string;
    setSelectedKey: (key: string) => void;
}

const CotacaoAutoComplete: React.FC<CotacoesProps> = ({cotacoes, selectedKey, setSelectedKey}) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="flex w-full flex-col md:flex-nowrap gap-4 mt-6">
            <Autocomplete
                value={selectedKey}
                selectedKey={selectedKey}
                size={'lg'}
                listboxProps={{
                    emptyContent: 'Nenhum produtos encontrado'
                }}
                labelPlacement={'outside'}
                label={`${!selectedKey ? 'Nenhum produtos' : ''} `}
                className="w-80"
                onSelectionChange={(value) => {
                    setSelectedKey(value?.toString() ?? '');
                    setImageLoaded(false);
                }}
            >
                {cotacoes.map((produto) => (
                    <AutocompleteItem key={produto.id} textValue={produto.name} >
                        <div className="flex gap-2 items-center ">
                            <div className="flex flex-col">
                                <span className="text-lg">{produto.name}</span>
                            </div>
                        </div>
                    </AutocompleteItem>
                ))}
            </Autocomplete>

            {selectedKey && (
                <Card className="w-auto h-auto border-gray-300 rounded-xl border-2 drop-shadow-lg" shadow="sm"
                      key={selectedKey}>
                    <Skeleton isLoaded={imageLoaded}>
                        <div className="w-48 h-48">
                            <Image
                                loading="lazy"
                                fill={true}
                                alt={cotacoes.find(produto => produto.id.toString() === selectedKey)?.name || ''}
                                src={cotacoes.find(produto => produto.id.toString() === selectedKey)?.imageUrl || ''}
                                onLoadingComplete={() => {
                                    setImageLoaded(true)
                                }}
                            />
                        </div>
                    </Skeleton>
                </Card>
            )}
        </div>
    );
};

export default CotacaoAutoComplete;
