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

interface CustomUserCardBodyProps {
    user?: UsuarioComEmpresa;
}

const CustomUserCardBody: React.FC<CustomUserCardBodyProps> = ({user}) => {
    let authContent: React.ReactNode;

    if (user) {
        authContent = <>
            <NavbarContent className={'h-36 pb-1 flex items-center'}>
                <Dropdown className={'h-auto'} size="lg" disableAnimation={false} placement="bottom-end">
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
                        <DropdownItem key="perfil" className="h-14 gap-2">
                            <p className="font-medium">Logado como</p>
                            <p className="font-semibold">{user.email}</p>
                        </DropdownItem>
                        {user.admin ? (
                            <DropdownItem key={user.id} color={'default'} href={paths.admNoticias()}>
                                ADM
                            </DropdownItem>
                        ) : null as any}
                        <DropdownItem onPress={() => {
                            console.log()
                        }} key="logout" color="default">
                            <p className={'text-medium'}>Configurações</p>
                        </DropdownItem>
                        <DropdownItem onPress={() => {
                            signOut().then(_ => console.log())
                        }} key="logout" color="danger">
                            <p className={'text-medium'}>Sair</p>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <div className={'flex flex-col ml-2 max-w-[200px]'}>
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