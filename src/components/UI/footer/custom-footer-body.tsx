'use client';

import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube} from "react-icons/fa";
import Link from "next/link";
import paths from "@/paths";
import {Cultura} from "@prisma/client";
import {shouldHideFooterPaths} from "@/constants";

interface CustomFooterProps{
    culturas: Cultura[],
}
const CustomFooterBody: React.FC<CustomFooterProps> = ({culturas,}) => {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    if(shouldHideFooterPaths.some((path) => pathname.includes(path))){
        return null;
    }

    return (
        <footer className="shadow py-14 bg-green-900 dark:bg-customDarkFooter text-white px-5">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Logo and Social Section */}
                <div className="space-y-4">
                    <h2 className=" text-4xl font-bold">PCNCA</h2>
                    <div>
                        <p className="text-lg font-semibold">Conecte-se conosco.</p>
                        <div className="flex space-x-4 my-2">
                            <FaFacebook className="hover:text-blue-500 cursor-pointer"/>
                            <FaInstagram className="hover:text-pink-500 cursor-pointer"/>
                            <FaLinkedin className="hover:text-blue-700 cursor-pointer"/>
                            <FaTwitter className="hover:text-blue-400 cursor-pointer"/>
                            <FaYoutube className="hover:text-red-600 cursor-pointer"/>
                            <FaEnvelope className="hover:text-gray-400 cursor-pointer"/>
                        </div>
                    </div>
                    <div className="text-sm space-y-2">
                        <div>
                            <a href="#" className="hover:underline text-white">Termos de uso</a> |
                            <a href="#" className="hover:underline text-white"> Privacidade</a>
                        </div>
                        <p>2024, Todos os direitos reservados</p>
                    </div>
                </div>
                {/* Culturas Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">Culturas</h2>
                    <ul className="space-y-2">
                        {culturas.map((cultura) => (
                            <li key={cultura.culturaId}>
                                <Link href={paths.getCultura(cultura.culturaId)}><p className="text-white">{cultura.nome}</p></Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Seções Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Seções</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link href={paths.noticias()}>Notícias</Link>
                        </li>
                        <li>
                            <Link href={paths.vendas()}>Vendas</Link>
                        </li>
                        <li>
                            <Link href={paths.cotacoesMoedas()}>Cotações</Link>
                        </li>
                        <li>
                            <Link href={paths.estoque()}>Estoque</Link>
                        </li>
                        <li>
                            <Link href={paths.prodInternacional()}>Prod. Internacional</Link>
                        </li>
                    </ul>
                </div>

                {/* Sobre Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Sobre nós</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link href={'https://github.com/LBruner/PCNCA'}>Repositório do projeto</Link>
                        </li>
                        <li>Alunos participantes</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default CustomFooterBody;