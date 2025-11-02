'use client';

import React from "react";
import { usePathname } from "next/navigation";
import paths from "@/paths";
import { Navbar, NavbarContent, NavbarItem } from "@heroui/react";
import MoedasCard from "@/components/cotacoes/dolar-card/moedas-card";
import Link from "next/link";
import NavLink from "@/components/UI/navbar/NavLink";
import CustomUserCard from "@/components/UI/navbar/custom-user-card";
import { UsuarioComEmpresa } from "@/actions/usuarios";
import ThemeButton from "@/components/UI/ThemeButton";
import CartButton from "@/app/ecommerce/CartButton";

interface CustomNavbarBodyProps {
    user?: UsuarioComEmpresa;
}

const CustomNavbarBody: React.FC<CustomNavbarBodyProps> = ({ user }) => {
    const pathName = usePathname();

    try {
        if (localStorage != null) {
            localStorage.removeItem('activePath');
        }
    } catch (e) {

    }

    if (pathName.startsWith('/auth') || pathName == '/' || pathName == paths.cadastro() || pathName.startsWith('/adm') || pathName.startsWith('/configuracoes')) {
        return null;
    }

    const isCompany = user?.empresaId != null;

    return (
        <>
            <Navbar maxWidth={'full'} shouldHideOnScroll={true}
                className={'fixed shadow-sm dark:bg-customDarkBg dark:bg-opacity-40 bg-gray-100  bg-opacity-70 flex top-0 left-0 h-28 items-start py-5'}>
                <div className={'w-96'}>
                    <MoedasCard />
                    <div className='w-40' />
                </div>
                <NavbarItem className={'w-full h-full flex flex-col'}>
                    <div className={'flex items-center justify-center mb-2'}>
                        <Link href={paths.noticias()}>
                            <p className={'text-4xl text-orange-400 font-bold'}>
                                PCNCA
                            </p>
                        </Link>
                    </div>
                    <NavbarContent className="hidden sm:flex gap-4" justify="center">
                        <NavLink path={paths.noticias()} text={'Notícias'} />
                        {!isCompany && <NavLink path={paths.ecommerce()} text={'E-commerce'} />}
                        <NavLink path={paths.cotacoesCommodities()} text={'Cotações'} />
                        {user && isCompany && <NavLink path={paths.pessoas()} text={'Pessoas'} />}
                        {user && isCompany && <NavLink path={paths.vendas()} text={'Vendas'} />}
                        {user && isCompany && <NavLink path={paths.estoque()} text={'Estoque'} />}
                        <NavLink path={paths.prodInternacional()} text={'Produção Internacional'} />
                    </NavbarContent>
                </NavbarItem>
                <NavbarItem>
                    <NavbarContent className={'flex justify-end w-full'}>
                        <div className={' justify-center flex items-center gap-5'}>
                            <ThemeButton />
                            <CartButton />
                            <div className="flex items-center gap-4">
                            </div>
                            <CustomUserCard user={user} />
                        </div>
                    </NavbarContent>
                </NavbarItem>

            </Navbar>
            <div className={'pb-40 bg-slate-50 dark:bg-customDarkBg'} />
        </>
    );
}

export default CustomNavbarBody;