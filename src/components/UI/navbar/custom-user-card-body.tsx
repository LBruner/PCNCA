'use client';

import React from "react";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
    NavbarContent,
    NavbarItem
} from "@heroui/react";
import paths from "@/paths";
import {signOut} from "next-auth/react";
import {fallbackImgUrl} from "@/constants/messages/images";
import {UsuarioComEmpresa} from "@/actions/usuarios";
import {SlCamera} from "react-icons/sl";
import { useTheme } from "next-themes";

interface CustomUserCardBodyProps {
    user?: UsuarioComEmpresa;
}

const CustomUserCardBody: React.FC<CustomUserCardBodyProps> = ({user}) => {
    let authContent: React.ReactNode;
    const {theme, setTheme} = useTheme();

    if (user) {
        authContent = <>
            <NavbarContent className={'h-36 pb-1 flex items-center justify-end'}>
                <Dropdown shouldBlockScroll={false} size="lg" disableAnimation={false} placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            showFallback={true}
                            fallback={<SlCamera size={20}/>}
                            isBordered
                            name={user.nome}
                            as="button"
                            className="transition-transform"
                            color="warning"
                            size="md"
                            src={user.imagemLink ?? fallbackImgUrl}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem textValue={'User'} key="perfil" className="h-14 gap-2">
                            <p className="font-medium">Logado como</p>
                            <p className="font-semibold">{user.email}</p>
                        </DropdownItem>
                        {user.admin ? (
                            <DropdownItem textValue={'Adm'} key={user.id} color={'default'} href={paths.admNoticias()}>
                                ADM
                            </DropdownItem>
                        ) : null as any}
                        <DropdownItem textValue={'Tema'}
                                      onPress={() => theme == "dark" ? setTheme('light') : setTheme("dark")
                                      } key="configuracoes" color="default">
                            <p className={'text-medium'}>Tema</p>
                        </DropdownItem>
                        <DropdownItem textValue={'Configuracoes'} href={paths.configuracoes()
                        } key="configuracoes" color="default">
                            <p className={'text-medium'}>Configurações</p>
                        </DropdownItem>
                        <DropdownItem textValue={'Logout'} onPress={() => {
                            signOut().then(_ => console.log())
                        }} key="logout" color="danger">
                            <p className={'text-medium'}>Sair</p>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <div className={'flex flex-col max-w-[200px]'}>
                    <p className={'text-md font-medium text-lg whitespace-nowrap overflow-hidden text-ellipsis'}>
                        {user.nome}
                    </p>
                    <p className={'text-md text-orange-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis'}>
                        {user.empresa.nome}
                    </p>
                </div>
            </NavbarContent>
        </>
    } else {
        authContent =
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href={paths.login()}><p className={'text-warning'}>Login</p></Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="warning" href={paths.cadastro()} variant="flat">
                        Cadastro
                    </Button>
                </NavbarItem>
            </NavbarContent>
    }

    return authContent;
}

export default CustomUserCardBody;