import React, {useEffect, useState} from "react";
import type {Product} from "@prisma/client";
import {Input} from "@nextui-org/react";
import {formatNumber, parseStringToFloat} from "@/helpers";

interface CotacoesValorProps {
    selectedCotacao: Product;
}

const CotacoesValorContainer: React.FC<CotacoesValorProps> = ({selectedCotacao}) => {
    const [quantity, setQuantity] = useState('1,00');

    useEffect(() => {
        setQuantity('1,00')
    }, [selectedCotacao])

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const formattedValue = value.replace(/[^\d,]/g, '');
        setQuantity(formattedValue);
    };

    return (
        <div className="flex flex-col items-center justify-center mt-5">
            <div className="m-4 text-2xl text-amber-500 font-bold">
                <h1>{selectedCotacao && selectedCotacao.name}</h1>
            </div>
            <div className="flex items-center justify-center border py-2 border-gray-400 rounded-xl">
                {!selectedCotacao ? <p className={'p-3'}>Por favor, selecione um produto</p> :
                    <div className="flex items-center min-w-72 px-2">
                        {selectedCotacao && <span className="flex-1">{selectedCotacao.name} (cx)</span>}
                        {selectedCotacao &&
                            <Input
                                size="sm"
                                inputMode="numeric"
                                value={quantity}
                                className="w-24 bg-transparent"
                                onChange={handleQuantityChange}
                            />
                        }
                    </div>}
            </div>
            <div className="text-sm m-4 text-amber-500">
                <h1>{selectedCotacao && `Valor da CX do (a) ${selectedCotacao.name}`}</h1>
            </div>
            {selectedCotacao &&
                <div className="flex items-center justify-between border py-[0.7rem] border-gray-400 rounded-xl">
                    <div className="flex items-center justify-evenly min-w-72 px-2">
                        {<span className="flex-1">Preço (R$)</span>}
                        {selectedCotacao &&
                            <div className={'bg-gray-100 w-24 px-2 py-[5px] border rounded-lg'}>
                                <p className={'text-sm'}>{formatNumber(parseStringToFloat(quantity) * selectedCotacao.price)}</p>
                            </div>
                        }
                    </div>
                </div>}
        </div>
    );
};

export default CotacoesValorContainer;
