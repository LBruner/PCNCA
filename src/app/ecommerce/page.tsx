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
                    Sementes Premium & Suprimentos para Jardinagem
                </p>
                <p className="text-5xl font-bold text-slate-900 dark:text-white">
                    Transforme Seu Jardim em Paraíso Verde!
                </p>

                <div className={'w-9/12 flex gap-6 justify-center'}>
                    <ProdutosLista productList={mainList}/>
                </div>
            </div>

            <div className="w-full flex flex-col gap-8 items-center justify-center py-8 bg-white dark:bg-slate-800">
                <p className="text-4xl font-bold text-slate-900 dark:text-white">
                    Sementes de Flores Exclusivas
                </p>
                <div className="w-8/12 grid grid-cols-6 grid-rows-2 gap-4">
                    <ProdutosLista productList={seedsProducts}/>
                </div>
            </div>

            <div className="w-full flex flex-col gap-4 justify-center items-center py-14 bg-green-900 dark:bg-green-950">
                <p className="text-white text-xl text-center font-bold">
                    Flores Vibrantes que Encantam o Ano Todo
                </p>
                <p className="w-9/12 text-white text-center">
                    Dê vida ao seu jardim com nossas sementes de flores premium, selecionadas para garantir 
                    floradas abundantes e duradouras. Cores intensas, perfumes irresistíveis e plantas robustas 
                    que transformam qualquer espaço em um refúgio natural. Cada semente é uma promessa de beleza 
                    e renovação para seu lar!
                </p>
            </div>

            <ProdutosSlider productList={seedsProducts.slice(0, 8)}/>

            <div className="w-full flex flex-col gap-8 items-center justify-center py-8 bg-slate-100 dark:bg-slate-900">
                <p className="text-4xl font-bold text-slate-900 dark:text-white">
                    Sementes de Frutas Selecionadas
                </p>
                <div className="w-8/12 grid grid-cols-6 grid-rows-2 gap-4">
                    <ProdutosLista productList={seedsProducts}/>
                </div>
            </div>

            <div className="w-full flex flex-col gap-4 justify-center items-center py-14 bg-green-900 dark:bg-green-950">
                <p className="text-white text-xl text-center font-bold">
                    Colha Frutas Frescas Direto do Seu Quintal
                </p>
                <p className="w-9/12 text-white text-center">
                    Sabor incomparável, qualidade garantida e economia na sua mesa! Nossas sementes de frutas 
                    são certificadas com alta taxa de germinação, perfeitas para hortas caseiras, varandas ou 
                    pequenos espaços. Cultive morangos suculentos, tomates doces e muito mais. Experimente a 
                    satisfação de colher e saborear frutas 100% naturais cultivadas por você!
                </p>
            </div>
            <ProdutosSlider productList={seedsProducts.slice(0, 8)}/>
        </div>
    )
}

export default EcommercePage;