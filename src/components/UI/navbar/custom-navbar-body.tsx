'use client';

import React from "react";
import {usePathname} from "next/navigation";
import paths from "@/paths";
import {Navbar, NavbarContent, NavbarItem} from "@heroui/react";
import MoedasCard from "@/components/cotacoes/dolar-card/moedas-card";
import Link from "next/link";
import NavLink from "@/components/UI/navbar/NavLink";
import CustomUserCard from "@/components/UI/navbar/custom-user-card";
import {UsuarioComEmpresa} from "@/actions/usuarios";

interface CustomNavbarBodyProps {
    user?: UsuarioComEmpresa;
}

const CustomNavbarBody: React.FC<CustomNavbarBodyProps> = ({user}) => {
    const pathName = usePathname();

    try{
        if(localStorage != null){
            localStorage.removeItem('activePath');
        }
    }
    catch (e){

    }

    if (pathName.startsWith('/auth') || pathName == '/' || pathName == paths.cadastro() || pathName.startsWith('/adm') || pathName.startsWith('/configuracoes')) {
        return null;
    }

    return (
        <>
            <Navbar maxWidth={'full'} shouldHideOnScroll={true}
                    className={'fixed shadow-sm bg-gray-100 bg-opacity-70 flex top-0 left-0 h-28 items-start py-5'}>
                <div>
                    <MoedasCard/>
                    <div className='w-40'/>
                </div>
                <NavbarItem className={'w-60 pl-10 flex flex-col'}>
                    <div className={'flex items-center justify-center mb-2'}>
                        <Link href={paths.noticias()}>
                            <p className={'text-4xl text-orange-400 font-bold'}>
                                PCNCA
                            </p>
                        </Link>
                    </div>
                    <NavbarContent className="hidden sm:flex gap-4" justify="center">
                        <NavLink path={paths.noticias()} text={'Notícias'}/>
                        <NavLink path={paths.cotacoesCommodities()} text={'Cotações'}/>
                        {user && <NavLink path={paths.pessoas()} text={'Pessoas'}/>}
                        {user && <NavLink path={paths.vendas()} text={'Vendas'}/>}
                        {user && <NavLink path={paths.estoque()} text={'Estoque'}/>}
                        <NavLink path={paths.prodInternacional()} text={'Produção Internacional'}/>
                    </NavbarContent>
                </NavbarItem>
                <NavbarItem>
                    <CustomUserCard user={user}/>
                </NavbarItem>
            </Navbar>
            <div className={'mb-36'}/>
        </>
    );
}

export default CustomNavbarBody;