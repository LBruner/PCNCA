import React from "react";
import {Image, Input} from "@heroui/react";
import {formatToBrazilianCurrency} from "@/helpers";
import {LuTrash2} from "react-icons/lu";
import {ProdutosSelecionados} from "@/app/vendas/criar/page";

interface CriarVendaItemProduto {
    estoque: ProdutosSelecionados;
    changeProductQuantity: (productId: number, newQuantity: number) => void;
    removeProduct: (productId: number) => void;
}

const CriarVendaItemProduto: React.FC<CriarVendaItemProduto> = (props) => {
    const {estoque, removeProduct,changeProductQuantity} = props;
    return (
        <div key={estoque.id} className={'flex justify-between items-center'}>
            <div className={'flex gap-4'}>
                <div className={'h-auto w-24'}>
                    <Image isZoomed={true} src={estoque.imagemLink!} alt={estoque.produto}/>
                </div>
                <div>
                    <p className={'text-md dark:text-gray-300  text-gray-700 font-light'}>{estoque.categoriaId?.nome ?? "Sem categoria"}</p>
                    <p className={'text-2xl font-semibold'}>{estoque.produto}</p>
                    <p className={'text-sm text-gray-700 dark:text-gray-300 font-light'}>Disponíveis: {estoque.quantidade}</p>
                </div>
            </div>
            <div className={'flex gap-8 items-center'}>
                <div className="flex justify-around items-center w-52 border rounded-xl px-3 py-2">
                    <Input
                        size={'sm'}
                        variant={'flat'}
                        type="number"
                        onChange={event => {
                            changeProductQuantity(estoque.id, parseInt(event.target.value));
                        }}
                        value={estoque.quantity.toString()}
                        className="w-16"
                        min="1"
                        errorMessage={'Quantidade Inválida'}
                        max={estoque.quantidade}
                    />
                    <p>x</p>
                    <span className=""> {formatToBrazilianCurrency(estoque.preco)}</span>
                </div>
                <div className={'w-20'}>
                    <p>{!estoque.quantity ? 'R$ 0' : formatToBrazilianCurrency(estoque.preco * estoque.quantity)}</p>
                </div>
                <div>
                    <LuTrash2 onClick={() => removeProduct(estoque.id)} className={`cursor-pointer hover:text-red-500`} size={22}/>
                </div>
            </div>
        </div>
    )
}

export default CriarVendaItemProduto;