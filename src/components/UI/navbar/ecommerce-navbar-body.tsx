'use client';

import React from "react";
import { usePathname } from "next/navigation";
import paths from "@/paths";
import { Input, Navbar, NavbarContent, NavbarItem } from "@heroui/react";
import Link from "next/link";
import NavLink from "@/components/UI/navbar/NavLink";
import CustomUserCard from "@/components/UI/navbar/custom-user-card";
import { UsuarioComEmpresa } from "@/actions/usuarios";
import { ShoppingCart } from "lucide-react";

interface EcommerceNavbarProps {
    user?: UsuarioComEmpresa;
}

const EcommerceNavbarBody: React.FC<EcommerceNavbarProps> = ({ user }) => {
    const pathName = usePathname();

    try {
        if (localStorage != null) {
            localStorage.removeItem('activePath');
        }
    } catch (e) {

    }

    if (!pathName.startsWith('/ecommerce')) {
        return null;
    }

    const isCompany = user?.empresaId != null;

    return (
        <>
            <Navbar maxWidth={'full'} shouldHideOnScroll={true}
                className={'fixed shadow-sm dark:bg-customDarkBg dark:bg-opacity-40 bg-gray-100  bg-opacity-70 flex top-0 left-0 items-start py-5'}>
                <NavbarItem className={'w-full h-full flex flex-col'}>
                    <NavbarContent className="hidden sm:flex gap-4 w-full" justify="center">
                        <div className="flex items-center">
                            <Link className="text-5xl text-orange-400" href={paths.ecommerce()}>PCNCA</Link>
                            <Input className="rounded-none w-full" />
                            <div>
                                <CustomUserCard displayDetails={false} user={user} />
                                <ShoppingCart />
                            </div>
                        </div>
                        <NavLink path={paths.noticias()} text={'Notícias'} />
                        {!isCompany && <NavLink path={paths.ecommerce()} text={'E-commerce'} />}
                        <NavLink path={paths.cotacoesCommodities()} text={'Cotações'} />
                        {user && isCompany && <NavLink path={paths.pessoas()} text={'Pessoas'} />}
                        {user && isCompany && <NavLink path={paths.vendas()} text={'Vendas'} />}
                        {user && isCompany && <NavLink path={paths.estoque()} text={'Estoque'} />}
                        <NavLink path={paths.prodInternacional()} text={'Produção Internacional'} />
                    </NavbarContent>
                </NavbarItem>
            </Navbar>
            <div className={' bg-slate-50 dark:bg-customDarkBg'} />
        </>
    );
}

export default EcommerceNavbarBody;