'use client';

import React from 'react';
import Link from 'next/link';
import {HiHome} from "react-icons/hi";
import {FaTractor} from "react-icons/fa";
import {BsArrowLeft} from "react-icons/bs";
import paths from "@/paths";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-6">
            <div className="text-center max-w-2xl mx-auto">
                <div className="mb-8 flex justify-center mt-24">
                    <div className="relative">
                        <FaTractor size={120} className="text-green-700" />
                        <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center">
                            <span className="text-2xl font-bold">?</span>
                        </div>
                    </div>
                </div>

                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Página não encontrada</h2>

                <p className="text-gray-600 mb-8 text-lg">
                    Parece que você se perdeu em meio à plantação.
                    Esta área não foi cultivada ainda ou pode ter sido colhida.
                </p>

                <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center">
                    <Link href={paths.landingPage()}>
                        <button className="inline-flex items-center px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors w-full md:w-auto justify-center">
                            <HiHome size={20} className="mr-2" />
                            Voltar ao Início
                        </button>
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center px-6 py-3 border-2 border-green-700 text-green-700 hover:bg-green-50 font-semibold rounded-lg transition-colors w-full md:w-auto justify-center"
                    >
                        <BsArrowLeft size={20} className="mr-2" />
                        Voltar
                    </button>
                </div>

                <div className="mt-12 p-6 bg-green-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Precisa de ajuda?</h3>
                    <p className="text-gray-600 mb-4">
                        Você pode tentar uma das seguintes opções:
                    </p>
                    <ul className="text-left text-gray-600 space-y-2">
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-700 rounded-full mr-2"></span>
                            Verificar se o URL está correto
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-700 rounded-full mr-2"></span>
                            Navegar pelo menu principal
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NotFound;