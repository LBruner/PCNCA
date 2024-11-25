import React from "react";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger, Link,
    NavbarContent,
    NavbarItem,
    useDisclosure
} from "@nextui-org/react";
import PerfilModal from "@/components/configuracoes/perfil-modal";
import {Avatar} from "@nextui-org/avatar";
import paths from "@/paths";
import {signOut} from "next-auth/react";
import {User} from "@prisma/client";
import {fallbackImgUrl} from "@/constants/messages/images";

interface CustomUserCardBodyProps {
    user?: User;
}
const CustomUserCardBody: React.FC<CustomUserCardBodyProps> = ({user}) => {
    let authContent: React.ReactNode;

    const {isOpen, onOpen, onClose} = useDisclosure();

    if (user) {
        authContent = <>
            <PerfilModal user={user} onClose={onClose} isOpen={isOpen}/>
            <NavbarContent className={'w-auto pr-7 pb-1'}>
                <Dropdown size="lg" disableAnimation={false} placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="default"
                            size="md"
                            src={user.image ?? fallbackImgUrl}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="perfil" className="h-14 gap-2">
                            <p className="font-semibold">Logado como</p>
                            <p className="font-semibold">{user.email}</p>
                        </DropdownItem>
                        <DropdownItem onClick={onOpen}>
                            Meu Perfil
                        </DropdownItem>
                         {/*<DropdownItem >Configurações </DropdownItem>*/}
                        <DropdownItem color={'warning'} href={paths.admNoticias()}>
                            ADM
                        </DropdownItem>
                        <DropdownItem onClick={() => {
                            signOut()
                        }} key="logout" color="danger">
                            <p className={'text-medium'}>Sair</p>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <div className={'w-20'}>
                    <p className={'text-md text-orange-400 font-semibold'}>AgroTech Corp</p>
                    <p className={'text-md font-medium'}>{user.name}</p>
                </div>
            </NavbarContent>
        </>
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

export default CustomUserCardBody;