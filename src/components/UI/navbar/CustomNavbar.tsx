import React from 'react';
import {Navbar, NavbarBrand, NavbarContent} from '@nextui-org/react';
import Image from 'next/image';
import paths from '@/paths';
import CustomAvatar from '@/components/UI/navbar/CustomAvatar';
import Link from "next/link";
import NavLink from "@/components/UI/navbar/NavLink";

const CustomNavbar: React.FC = React.memo(() => {

    return (
        <Navbar shouldHideOnScroll>
            <NavbarBrand>
                <Image
                    className="mr-2"
                    src="/icons/favicon.png"
                    width={30}
                    height={50}
                    priority={true}
                    alt="A plate with food"
                />
                <Link className="font-bold text-inherit" href={paths.home()}>
                    PCNCA
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavLink path={paths.home()} text={'Home'}/>
                <NavLink path={paths.noticias()} text={'Notícias'}/>
                <NavLink path={paths.vendas()} text={'Vendas'}/>
                <NavLink path={paths.cotacoes()} text={'Cotações'}/>
                <NavLink path={paths.estoque()} text={'Estoque'}/>
                <NavLink path={paths.clima()} text={'Clima'}/>
                <NavLink path={paths.configuracoes()} text={'Configurações'}/>
            </NavbarContent>
            <CustomAvatar/>
        </Navbar>
    );
});

export default CustomNavbar;
