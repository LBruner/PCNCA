import { pegaTodosProdutos } from "@/actions/produto";
import ProdutosLista from "@/components/ecommerce/produtos/lista/ecommerceProdutosLista";
import { mainList } from "@/constants";
import React from "react";
import ProdutosSlider from "@/components/ecommerce/produtos/lista/ecommercerProdutosSlider";
import Link from "next/link";
import Image from "next/image";

const EcommercePage: React.FC = async _ => {
    const todosProdutos = await pegaTodosProdutos();
    const sementesHorta = todosProdutos.filter((produto) => produto.categoriaculturaId === 5000 && produto.tipo === 'Horta').slice(0,12);
    const sementesFlores = todosProdutos.filter((produto) => produto.categoriaculturaId === 5000 && produto.tipo === 'Flor').slice(0,12);
    const sementesFrutiferas = todosProdutos.filter((produto) => produto.categoriaculturaId === 5000 && produto.tipo === 'Frutifera').slice(0,12);

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
                {
                    mainList.map((produto) => <Link key={produto.produto} href={produto.url} className="flex flex-col gap-2">
                        <Image className={`max-h-[20.4rem]`} width={300} height={50} alt={produto.produto} src={produto.imagemLink!} />
                        <p className="text-center text-lg font-semibold dark:text-green-600 text-green-800">{produto.produto}</p>
                    </Link>)
                }  
                </div>
            </div>

            {/* SEÇÃO HORTA */}
            <div className="w-full flex flex-col gap-8 items-center justify-center py-8 bg-white dark:bg-customDarkBg">
                <p className="text-4xl font-bold text-slate-900 dark:text-white">
                    Sementes de Horta Selecionadas
                </p>
                <div className="w-8/12 grid grid-cols-6 grid-rows-2 gap-4">
                    <ProdutosLista productList={sementesHorta} />
                </div>
            </div>

            <div className="w-full flex flex-col gap-4 justify-center items-center py-14 bg-green-900 dark:bg-green-950">
                <p className="text-white text-xl text-center font-bold">
                    Cultive Alimentos Frescos e Saudáveis em Casa
                </p>
                <p className="w-9/12 text-white text-center">
                    Monte sua horta caseira com nossas sementes de alta qualidade e germinação garantida. 
                    Alfaces crocantes, tomates suculentos, temperos aromáticos e muito mais! Economize no 
                    supermercado enquanto garante alimentos 100% orgânicos e livres de agrotóxicos para sua 
                    família. Cultivar nunca foi tão fácil e recompensador!
                </p>
            </div>

            <ProdutosSlider productList={sementesHorta.slice(0, 8)} />

            {/* SEÇÃO FLORES */}
            <div className="w-full flex flex-col gap-8 items-center justify-center py-8 bg-slate-100 dark:bg-customDarkBg">
                <p className="text-4xl font-bold text-slate-900 dark:text-white">
                    Sementes de Flores Exclusivas
                </p>
                <div className="w-8/12 grid grid-cols-6 grid-rows-2 gap-4">
                    <ProdutosLista productList={sementesFlores} />
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
            <ProdutosSlider productList={sementesFlores.slice(0, 8)} />

            {/* SEÇÃO FRUTÍFERAS */}
            <div className="w-full flex flex-col gap-8 items-center justify-center py-8 bg-slate-100 dark:bg-customDarkBg">
                <p className="text-4xl font-bold text-slate-900 dark:text-white">
                    Sementes de Frutíferas Selecionadas
                </p>
                <div className="w-8/12 grid grid-cols-6 grid-rows-2 gap-4">
                    <ProdutosLista productList={sementesFrutiferas} />
                </div>
            </div>

            <div className="w-full flex flex-col gap-4 justify-center items-center py-14 bg-green-900 dark:bg-green-950">
                <p className="text-white text-xl text-center font-bold">
                    Colha Frutas Frescas Direto do Seu Quintal
                </p>
                <p className="w-9/12 text-white text-center">
                    Sabor incomparável, qualidade garantida e economia na sua mesa! Nossas sementes de frutíferas
                    são certificadas com alta taxa de germinação, perfeitas para pomares caseiros e jardins
                    produtivos. Cultive árvores frutíferas saudáveis e colha frutas deliciosas por anos a fio.
                    Experimente a satisfação de saborear frutas 100% naturais cultivadas por você!
                </p>
            </div>
            <ProdutosSlider productList={sementesFrutiferas.slice(0, 8)} />
        </div>
    )
}
export default EcommercePage;