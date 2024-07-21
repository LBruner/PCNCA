'use client';

import React from 'react';
import {Navbar, NavbarContent, NavbarItem} from '@nextui-org/react';
import paths from '@/paths';
import CustomAvatar from '@/components/UI/navbar/CustomAvatar';
import Link from "next/link";
import NavLink from "@/components/UI/navbar/NavLink";
import {usePathname} from "next/navigation";

const CustomNavbar: React.FC = () => {
    const session = usePathname();
    console.log(session);

    if(session == paths.login() || session == paths.cadastro()){
        return null;
    }
    return (
        <Navbar maxWidth={'full'} shouldHideOnScroll
                className={'fixed  bg-slate-50  flex mt-2 top-0 left-0 h-28 items-start'}>
            <div>
                <h1>CARD DOLAR</h1>
            </div>
            <NavbarItem className={'w-60 flex flex-col'}>
                <div className={'flex items-center justify-center mt-10 mb-2'}>
                    <Link href={paths.home()}>
                        <h1 className={'text-5xl text-orange-400 font-bold'}>
                            PCNCA
                        </h1>
                    </Link>
                </div>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavLink path={paths.home()} text={'Home'}/>
                    <NavLink path={paths.noticias()} text={'Notícias'}/>
                    <NavLink path={paths.vendas()} text={'Vendas'}/>
                    <NavLink path={paths.cotacoes()} text={'Cotações'}/>
                    <NavLink path={paths.estoque()} text={'Estoque'}/>
                    <NavLink path={paths.clima()} text={'Clima'}/>
                    <NavLink path={paths.configuracoes()} text={'Configurações'}/>
                </NavbarContent>
            </NavbarItem>
            <NavbarItem>
                <CustomAvatar/>
            </NavbarItem>
        </Navbar>
    );
};

export default CustomNavbar;
