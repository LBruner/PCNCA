import {pegaTodosProdutos} from "@/actions/produto";
import ProdutosLista from "@/components/ecommerce/produtos/lista/ecommerceProdutosLista";
import {mainList} from "@/constants";
import React from "react";
import ProdutosSlider from "@/components/ecommerce/produtos/lista/ecommercerProdutosSlider";

const EcommercePage: React.FC = async _ => {
    const todosProdutos = await pegaTodosProdutos();
    const seedsProducts = todosProdutos.filter((produto) => produto.categoriaculturaId === 5000);

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex flex-col gap-8 items-center justify-center py-12 bg-slate-100 dark:bg-slate-900">
                <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                    Seeds for Sale & Gardening Supplies at Park Seed
                </p>
                <p className="text-5xl font-bold text-slate-900 dark:text-white">
                    Let`&apos;`s Grow Something Good!
                </p>

                <div className={'w-9/12 flex gap-6 justify-center'}>
                    <ProdutosLista productList={mainList}/>
                </div>
            </div>

            <div className="w-full flex flex-col gap-8 items-center justify-center py-8 bg-white dark:bg-slate-800">
                <p className="text-4xl font-bold text-slate-900 dark:text-white">
                    Shop Flower Seeds
                </p>
                <div className="w-8/12 grid grid-cols-6 grid-rows-2 gap-4">
                    <ProdutosLista productList={seedsProducts}/>
                </div>
            </div>

            <div className="w-full flex flex-col gap-4 justify-center items-center py-14 bg-green-900 dark:bg-green-950">
                <p className="text-white text-xl text-center font-bold">
                    Discover Joy in Every Petal
                </p>
                <p className="w-9/12 text-white text-center">
                    Renew your garden, reimagine your outdoor space, and reconnect with nature this season with vibrant
                    blooms and premium flower seeds from Park Seed, creating a sanctuary that inspires all season long.
                    Let every seed you plant become a celebration of beauty, growth, and the joy of a new season.
                </p>
            </div>

            <ProdutosSlider productList={seedsProducts.slice(0, 8)}/>

            <div className="w-full flex flex-col gap-8 items-center justify-center py-8 bg-slate-100 dark:bg-slate-900">
                <p className="text-4xl font-bold text-slate-900 dark:text-white">
                    Shop Fuits Seeds
                </p>
                <div className="w-8/12 grid grid-cols-6 grid-rows-2 gap-4">
                    <ProdutosLista productList={seedsProducts}/>
                </div>
            </div>

            <div className="w-full flex flex-col gap-4 justify-center items-center py-14 bg-green-900 dark:bg-green-950 mb-12">
                <p className="text-white text-xl text-center font-bold">
                    Grow a Garden Full of Goodness
                </p>
                <p className="w-9/12 text-white text-center">
                    Experience unbeatable flavor, quality, and value with Park Seed`&apos;`s new & exclusive vegetable varieties! Our germination guarantee ensures your plants thrive, giving you fresh-picked flavor straight from your garden, patio, or windowsill. Plant with confidence and enjoy homegrown goodness this season!
                </p>
            </div>
            <ProdutosSlider productList={seedsProducts.slice(0, 8)}/>

        </div>
    )
}

export default EcommercePage;