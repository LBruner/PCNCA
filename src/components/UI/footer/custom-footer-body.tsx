'use client';

import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube} from "react-icons/fa";
import Link from "next/link";
import paths from "@/paths";
import {Category} from "@prisma/client";

interface CustomFooterProps{
    categories: Category[],
}
const CustomFooterBody: React.FC<CustomFooterProps> = ({categories,}) => {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    if (pathname.startsWith('/adm') || pathname.startsWith('/auth')){
        return null;
    }
    return (
        <footer className="shadow mt-14 bg-green-900 text-white py-10 px-5">
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
                            <a href="#terms" className="hover:underline">Termos de uso</a> |
                            <a href="#privacy" className="hover:underline"> Privacidade</a>
                        </div>
                        <p>2024, Todos os direitos reservados</p>
                    </div>
                </div>
                {/* Culturas Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Culturas</h2>
                    <ul className="space-y-2">
                        {categories.map((category) => (
                            <li key={category.id}>
                                <Link href={paths.getCultura(category.id)}>{category.name}</Link>
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