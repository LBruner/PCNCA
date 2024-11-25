'use client';

import React, {useEffect, useState} from "react";
import {Accordion, AccordionItem, Button, Navbar, NavbarContent, NavbarItem} from "@nextui-org/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import paths from "@/paths";
import {BiCategory, BiNews} from "react-icons/bi";

const AdmNavbar: React.FC = () => {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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
                    <Accordion defaultExpandedKeys={["1"]} className="w-full">
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
                                <Link href={paths.admCategorias()}>
                                    <Button className="text-right w-full justify-start"
                                            color={pathname === paths.admCategorias() ? "primary" : "default"}
                                            startContent={<BiCategory/>}>
                                        Categorias
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