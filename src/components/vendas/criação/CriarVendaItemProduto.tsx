import React from "react";
import {Image, Input} from "@nextui-org/react";
import {formatToBrazilianCurrency} from "@/helpers";
import {LuTrash2} from "react-icons/lu";
import {ProductSale} from "@/app/vendas/criar/page";

interface CriarVendaItemProduto {
    produto: ProductSale;
    changeProductQuantity: (productId: number, newQuantity: number) => void;
    removeProduct: (productId: number) => void;
}

const CriarVendaItemProduto: React.FC<CriarVendaItemProduto> = (props) => {
    const {produto, removeProduct,changeProductQuantity} = props;
    return (
        <div key={produto.id} className={'flex justify-between items-center'}>
            <div className={'flex gap-4'}>
                <div className={'h-auto w-24'}>
                    <Image isZoomed={true} src={produto.imageUrl!} alt={produto.name}/>
                </div>
                <div>
                    <p className={'text-sm  text-gray-700 font-light'}>{produto.category}</p>
                    <p className={'text-xl font-semibold'}>{produto.name}</p>
                    <p className={'text-sm text-gray-700 font-light'}>Commodity {produto.tipoCommoditie}</p>
                </div>
            </div>
            <div className={'flex gap-8 items-center'}>
                <div className="flex justify-around items-center w-52 border rounded-xl px-3 py-2">
                    <Input
                        size={'sm'}
                        variant={'flat'}
                        type="number"
                        onChange={event => {
                            console.log(event.target.value)
                            changeProductQuantity(produto.id, parseInt(event.target.value));
                        }}
                        value={produto.quantity.toString()}
                        className="w-16"
                        min="1"
                    />
                    <p>x</p>
                    <span className=""> {formatToBrazilianCurrency(produto.price)}</span>
                </div>
                <div className={'w-20'}>
                    <p>{formatToBrazilianCurrency(produto.price * produto.quantity)}</p>
                </div>
                <div>
                    <LuTrash2 onClick={() => removeProduct(produto.id)} className={`cursor-pointer hover:text-red-500`} size={22}/>
                </div>
            </div>
        </div>
    )
}

export default CriarVendaItemProduto;