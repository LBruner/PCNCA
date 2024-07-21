'use client';

import React, {useState} from "react";
import {Card, CardBody, Skeleton} from "@nextui-org/react";
import type {Product} from '@prisma/client';
import Image from "next/image";

interface CotacoesItemProps {
    product: Product;
    setSelectedKey: (key: string) => void;
    selectedKey: string;
}

const CotacoesItem: React.FC<CotacoesItemProps> = ({product, selectedKey, setSelectedKey}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <div className={'h-40 w-32 '}>
            <Card
                className={`${selectedKey == product.id.toString() ? ' border-orange-300 rounded-xl border-2 drop-shadow-lg' : ''}`}
                shadow="sm" key={product.id} isPressable onPress={() => {
                setSelectedKey(product.id.toString());
            }}>
                <Skeleton isLoaded={imageLoaded}>
                    <CardBody className="overflow-visible p-0 w-28 h-44 ">
                        <Image
                            fill={true}
                            alt={product.name}
                            onLoad={() => setImageLoaded(true)}
                            src={product.imageUrl || ''}
                            // src={'https://placehold.co/800x800/png?text=Imagem'}
                        />
                    </CardBody>
                </Skeleton>
            </Card>
        </div>
    )
}

export default CotacoesItem;