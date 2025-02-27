'use client';
import React, {useState} from "react";
import {ProductionProduct, productionProducts} from "@/models/producao-internacional/produtos";
import ProductionProductPicker from "@/components/producao-internacional/product-picker";


const ClimaPage: React.FC = _ => {
    const [selectedProduct, setSelectedProduct] = useState<ProductionProduct>(productionProducts[0]);

    return (
        <div className={'overflow-hidden px-20 flex gap-4 flex-col w-full h-full justify-center'}>
            <ProductionProductPicker selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>
            <div className={'h-[800px] w-full relative overflow-hidden  mb-[-105px]'}>
                <iframe
                    className="w-full h-[calc(100%+155px)] relative -top-[155px] overflow-hidden "
                    src={`https://ourworldindata.org/explorers/global-food?Food=${selectedProduct.name}&Metric=Production&Per+Capita=false&country=USA~DEU~FRA~GBR~BRA~ZAF&hideControls=true&tab=map`}
                    loading="lazy"
                    allow="web-share; clipboard-write"
                />
            </div>
        </div>
    )
}

export default ClimaPage;
