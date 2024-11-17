import React, {ReactElement} from "react";
import {Button} from "@nextui-org/react";
import Image from "next/image";
import {IoAnalyticsOutline, IoCalendarOutline, IoNewspaperOutline} from "react-icons/io5";
import {MdOutlineAnalytics} from "react-icons/md";
import Link from "next/link";
import paths from "@/paths";


const HomePage: React.FC = () => {
    return (
        <div>
            <div>
                <div className="w-full">
                    <div className="h-auto flex px-8 md:px-24 lg:px-56">
                        <div className="flex flex-col lg:flex-row py-16 gap-8 items-center">
                            <div>
                                <p className="text-3xl md:text-5xl">
                                    Gerencie suas commodities agrícolas com facilidade e precisão
                                </p>
                                <p className="text-lg md:text-xl my-6">
                                    Nossa plataforma integrada oferece um gerenciamento avançado e em tempo real de seus
                                    produtos,
                                    desde o monitoramento de preços até a otimização de estoque. Tome decisões
                                    estratégicas com dados confiáveis.
                                </p>
                                <div className="flex gap-2">
                                    <LandingPageBtn text="Acessar" href={paths.noticias()}/>
                                    <LandingPageBtn text="Saiba Mais" href={'#sobre'}/>
                                </div>
                            </div>
                            <div className="w-full h-auto lg:w-1/2">
                                <Image
                                    className="border rounded object-cover shadow-xl"
                                    alt="PCNCA"
                                    src="/images/landing-page-image.jpg"
                                    width={900}
                                    height={600}
                                />
                            </div>
                        </div>
                    </div>
                    <div id={'sobre'} className={'mb-32 flex flex-col px-8 md:px-24 lg:px-56 gap-12'}>
                        <p  className={'mt-8 text-3xl md:text-5xl'}>
                            Acompanhe Preços e Cotações em Tempo Real
                        </p>
                        <div className={'flex'}>
                            <div>
                                <p className={'text-2xl'}>
                                    Monitoramento de Preços
                                </p>
                                <p className={'text-lg pr-32'}>
                                    Nossa plataforma fornece atualizações em tempo real dos preços de commodities
                                    agrícolas, permitindo que você tome decisões informadas e antecipe as tendências do
                                    mercado.
                                </p>
                            </div>
                            <div>
                                <p className={'text-2xl'}>
                                    Cotação de moedas
                                </p>
                                <p className={'text-lg pr-32'}>
                                    Acompanhe a flutuação da taxa de câmbio com gráficos interativos, mantendo seus
                                    negócios protegidos contra as oscilações do mercado cambial.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={'w-full border py-32 bg-green-800 flex flex-col items-center gap-8 justify-center shadow-xl'}>
                <div className={'flex px-12 py-12 h-[40%] flex-col w-[55%] bg-white border rounded-lg shadow-xl'}>
                    <div>
                        <p className={'text-3xl font-semibold'}>Mantenha-se Atualizado com Notícias do Setor
                        </p>
                    </div>
                    <div className={'flex justify-around gap-4'}>
                        <LadingPageHightlightItem
                            icon={<IoNewspaperOutline size={40} className={'mt-6 text-green-700'}/>
                            }
                            description={'Acesse as últimas notícias sobre tendências, políticas e eventos relevantes no mercado'}
                            title={'Notícias'}/>
                        <LadingPageHightlightItem
                            icon={<IoAnalyticsOutline size={40} className={'mt-6 text-green-700'}/>
                            }
                            description={'Acesse estudos e relatórios detalhados sobre a indústria agrícola no mercado'}
                            title={'Relatórios'}/>
                        <LadingPageHightlightItem
                            icon={<IoCalendarOutline size={40} className={'mt-6 text-green-700'}/>
                            }
                            description={'Fique por dentro das principais conferências, feiras e seminários do setor.'}
                            title={'Eventos'}/> <LadingPageHightlightItem
                        icon={<MdOutlineAnalytics size={40} className={'mt-6 text-green-700'}/>
                        }
                        description={'Leia artigos de especialistas com insights aprofundados sobre o mercado.'}
                        title={'Análises'}/>
                    </div>
                </div>
            </div>
            <div className={'md:px-24 lg:px-56 mt-24 flex gap-2 items-center'}>
                <div>
                    <p className={'text-5xl w-80 font-semibold text-blue-900'}>Gerencie seu estoque com eficiência</p>
                    <div className={'flex my-4 mt-8 gap-4 w-[80%]'}>
                        <div className={'flex gap-2 flex-col border rounded p-5 w-[50%]'}>
                            <p className={'text-2xl font-semibold text-blue-900'}>
                                Categorização de Produtos
                            </p>
                            <p className={'text-lg'}>
                                Nossa plataforma permite que você organize seus produtos em categorias intuitivas,
                                facilitando o acompanhamento e a tomada de decisões sobre seu estoque.
                            </p>
                        </div>
                        <div className={'flex gap-2 flex-col border rounded p-5 w-[50%]'}>
                            <p className={'text-2xl font-semibold text-blue-900'}>
                                Relatórios Personalizados
                            </p>
                            <p className={'text-lg'}>
                                Gere relatórios exportáveis customizados, adaptados às necessidades específicas do seu
                                negócio, para obter insights valiosos sobre sua operação.
                            </p>
                        </div>
                    </div>
                    <div className={'p-5 w-[80%] border'}>
                        <p className={'text-2xl font-semibold text-blue-900'}>
                            Visão Global
                        </p>
                        <p className={'text-lg'}>
                            Visualize a produção agrícola em mapas interativos, obtendo uma perspectiva abrangente do
                            mercado e identificando oportunidades
                        </p>
                    </div>
                </div>
                <div className="w-full h-auto">
                    <Image
                        className="border rounded object-cover shadow-xl"
                        alt="PCNCA"
                        src="/images/landing-page-inventory.jpg"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
            <div
                className={'w-full mt-32 border py-24 bg-blue-950 flex flex-col items-center gap-8 shadow-xl'}>
                <div className={'flex px-12 py-6 flex-col h-full w-[55%] rounded-lg shadow-xl'}>
                    <div className={'mb-8'}>
                        <p className={'text-white text-3xl font-bold'}>Visualize a Produção Global
                        </p>
                    </div>
                    <div className={'flex justify-around gap-4'}>
                        <div className={'w-[50%] flex flex-col justify-center items-center'}>
                            <p className={'text-white text-xl font-medium'}>
                                Acompanhamento em Tempo Real
                            </p>
                            <p className={'text-white text-lg text-center'}>
                                Monitore preços, cotações e estoque em tempo real, tomando decisões informadas e ágeis.
                            </p>
                        </div>
                        <div className={'w-[50%] flex flex-col justify-center items-center'}>
                            <p className={'text-white text-xl font-medium'}>
                                Insights Valiosos
                            </p>
                            <p className={'text-white text-lg text-center'}>
                                Visualize a produção agrícola, acompanhe notícias e tendências, e obtenha insights de
                                especialistas.
                            </p>
                        </div>
                    </div>
                    <div className={'w-full relative my-2'}>
                        <Image src="/images/custom-list-vector.svg" alt="Ícone" fill={false} width={10000} height={100}/>
                    </div>
                    <div className={'flex flex-col justify-center items-center'}>
                        <div className={'w-[50%] flex flex-col justify-center items-center'}>
                            <p className={'text-white text-xl font-medium'}>
                                Gerenciamento Eficiente
                            </p>
                            <p className={'text-white text-lg text-center'}>
                                Gerencie seu estoque, categorize produtos e gere relatórios personalizados para otimizar
                                suas operações.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'md:px-24 lg:px-56 mt-24 flex gap-2 flex-col'}>
                <p className={'text-5xl my-6'}>Junte-se a Nós</p>
                <div className={' w-full flex-col flex items-center justify-around gap-16 py-8'}>
                    <div className={'flex justify-around w-full'}>
                        <div className={'flex flex-col justify-center items-center'}>
                            <p className={'text-3xl font-semibold'}>10K+</p>
                            <p className={'text-3xl'}>Clientes Satisfeitos</p>
                        </div>
                        <div className={'flex flex-col justify-center items-center'}>
                            <p className={'text-3xl font-semibold'}>88%</p>
                            <p className={'text-3xl'}>Taxa de Retenção</p>
                        </div>
                    </div>
                    <div className={'flex justify-around w-full'}>
                        <div className={'flex flex-col justify-center items-center'}>
                            <p className={'text-3xl font-semibold'}>+5</p>
                            <p className={'text-3xl'}>Anos de experiência</p>
                        </div>
                        <div className={'flex flex-col justify-center items-center'}>
                            <p className={'text-3xl font-semibold'}>99.9%</p>
                            <p className={'text-3xl'}>Disponibilidade</p>
                        </div>
                    </div>
                </div>
                <p className={'text-xl mt-12 text-center'}>
                    Transforme seu negócio agrícola com nossa plataforma líder de mercado. Entre em contato agora para
                    obter uma demonstração gratuita.
                </p>

            </div>
            <div className={'flex justify-center gap-2 m-12 mb-20'}>
                <LandingPageBtn text="Acessar" href={paths.noticias()}/>
                <LandingPageBtn text="Fazer Login" href={paths.cadastro()}/>
                <LandingPageBtn text="Cadastre-se" href={paths.cadastro()}/>
            </div>
        </div>
    )
}

const LandingPageBtn: React.FC<{ text: string, href: string, color?: string }> = ({text, href,color}) => {
    return (
        <Link href={href}>
            <Button
                radius={'sm'}
                className={`text-lg text-white p-6 ${color ?? 'bg-green-700'}`}>{text}</Button>
        </Link>
    )
}

const LadingPageHightlightItem: React.FC<{ title: string, icon: ReactElement, description: string }> = (
    {
        icon,
        title,
        description
    }) => {
    return <Link href={''} className={'w-[25%] flex flex-col gap-2'}>
        {icon}
        <p className={'text-2xl'}>
            {title}
        </p>
        <p className={'text-lg'}>
            {description}
        </p>
    </Link>
}

export default HomePage;