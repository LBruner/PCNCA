'use client';

import React from "react";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
    NavbarContent,
    NavbarItem,
    Spinner
} from "@nextui-org/react";
import {Avatar} from "@nextui-org/avatar";
import {signOut, useSession} from "next-auth/react";
import paths from "@/paths";

const CustomAvatar: React.FC = () => {
    const session = useSession();

    let authContent: React.ReactNode;

    if (session.status === 'loading') {
        authContent = <Spinner className={'w-36'}></Spinner>
    } else if (session?.data?.user) {
        const user = session.data.user;
        authContent = <NavbarContent className={'w-36'}>
            <Dropdown disableAnimation={true} placement="bottom-end">
                <DropdownTrigger>
                    <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        color="default"
                        size="md"
                        src={'https://i.pravatar.cc/150?u=a042581f4e29026704d' ?? null}
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="perfil" className="h-14 gap-2">
                        <p className="font-semibold">Logado como</p>
                        <p className="font-semibold">{user.email}</p>
                    </DropdownItem>
                    <DropdownItem key="meu_perfil">Meu Perfil</DropdownItem>
                    <DropdownItem key="configuracoes">Configurações</DropdownItem>
                    <DropdownItem key="ajuda_e_feedback">Ajuda & Feedback</DropdownItem>
                    <DropdownItem onClick={() => {
                        signOut()
                    }} key="logout" color="danger">
                        Sair
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <div className={'w-20'}>
                <p className={'text-sm text-orange-400 font-semibold'}>EliteTech Corp</p>
                <p className={'text-sm font-medium'}>{user.name}</p>
            </div>
        </NavbarContent>
    } else {
        authContent =
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href={paths.login()}>Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href={paths.cadastro()} variant="flat">
                        Cadastro
                    </Button>
                </NavbarItem>
            </NavbarContent>
    }

    return authContent;
}

export default React.memo(CustomAvatar);