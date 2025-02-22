'use client';

import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem, Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import paths from "@/paths";
import { BiCategory, BiNews, BiUser } from "react-icons/bi";

const AdmNavbar: React.FC = () => {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

    useEffect(() => {
        // Restaurar o estado do Accordion e o item ativo do localStorage
        const savedExpandedKeys = localStorage.getItem('accordionExpandedKeys');
        const savedActivePath = localStorage.getItem('activePath');

        if (savedExpandedKeys) {
            setExpandedKeys(JSON.parse(savedExpandedKeys));
        }

        if (savedActivePath) {
            // Se o caminho ativo estiver salvo, você pode usá-lo para destacar o item ativo
            // O próprio componente Button já faz isso com a propriedade `color`
        }

        setMounted(true);
    }, []);

    useEffect(() => {
        // Salvar o estado do Accordion no localStorage sempre que ele mudar
        localStorage.setItem('accordionExpandedKeys', JSON.stringify(expandedKeys));
    }, [expandedKeys]);

    useEffect(() => {
        // Salvar o caminho ativo no localStorage sempre que ele mudar
        localStorage.setItem('activePath', pathname);

        // Expandir o Accordion correspondente ao pathname ativo
        if (pathname.startsWith(paths.admNoticias()) || pathname.startsWith(paths.admCulturas())) {
            setExpandedKeys(["1"]); // Abre o AccordionItem das "Notícias"
        } else if (pathname.startsWith(paths.admUsuarios())) {
            setExpandedKeys(["2"]); // Abre o AccordionItem do "Cadastro"
        }
    }, [pathname]);

    if (!mounted) {
        return null;
    }

    if (!pathname.startsWith('/adm')) {
        return null;
    }
    return (
        <Navbar className="h-screen fixed w-64 flex-col items-start justify-start p-4 bg-gray-100" position="static">
            <NavbarContent className="flex-col items-start gap-4">
                <NavbarItem>
                    <Link href={paths.noticias()} className="flex items-center gap-2 text-foreground">
                        <p className="font-bold text-xl">PCNCA</p>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Accordion
                        defaultExpandedKeys={['1','2']}
                        onExpandedChange={(keys) => setExpandedKeys(Array.from(keys) as string[])}
                        className="w-full"
                    >
                        <AccordionItem
                            key="1"
                            title="Notícias"
                            className="flex flex-col"
                        >
                            <div className="flex flex-col w-36 gap-2">
                                <Link href={paths.admNoticias()}>
                                    <Button className="text-right w-full justify-start"
                                            color={pathname === paths.admNoticias() ? "primary" : "default"}
                                            startContent={<BiNews/>}>
                                        Notícias
                                    </Button>
                                </Link>
                                <Link href={paths.admCulturas()}>
                                    <Button className="text-right w-full justify-start"
                                            color={pathname === paths.admCulturas() ? "primary" : "default"}
                                            startContent={<BiCategory/>}>
                                        Categorias
                                    </Button>
                                </Link>
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            key="2"
                            title="Cadastro"
                            className="flex flex-col"
                        >
                            <div className="flex flex-col w-36 gap-2">
                                <Link href={paths.admUsuarios()}>
                                    <Button className="text-right w-full justify-start"
                                            color={pathname === paths.admUsuarios() ? "primary" : "default"}
                                            startContent={<BiUser/>}>
                                        Usuários
                                    </Button>
                                </Link>
                            </div>
                        </AccordionItem>
                    </Accordion>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default AdmNavbar;