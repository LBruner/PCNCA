'use client';

import React from 'react';
import Link from 'next/link';
import {HiHome} from "react-icons/hi";
import {FaTractor} from "react-icons/fa";
import paths from "@/paths";
import VoltarBtn from "@/components/UI/VoltarBtn";

const NotFound = () => {
    return (
        <div className="h-full dark:bg-customDarkBg bg-slate-50 flex items-center justify-center px-6">
            <div className="text-center max-w-2xl mx-auto">
                <div className="mb-8 flex justify-center mt-24">
                    <div className="relative">
                        <FaTractor size={120} className="text-green-700"/>
                        <div
                            className="absolute -top-4 -right-4 bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center">
                            <span className="text-2xl font-bold">?</span>
                        </div>
                    </div>
                </div>

                <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Página não encontrada</h2>

                <p className="text-gray-600 dark:text-gray-200 mb-8 text-lg">
                    Parece que você se perdeu em meio à plantação.
                    Esta área não foi cultivada ainda ou pode ter sido colhida.
                </p>

                <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center">
                    <Link href={paths.landingPage()}>
                        <button
                            className="inline-flex items-center px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors w-full md:w-auto justify-center">
                            <HiHome size={20} className="mr-2"/>
                            Voltar ao Início
                        </button>
                    </Link>

                    <VoltarBtn/>
                </div>

                <div className="mt-12 p-6 mb-12 bg-green-50 dark:bg-customDarkFooter rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 dark:text-gray-200">Precisa de ajuda?</h3>
                    <p className="text-gray-600 mb-4 dark:text-gray-200">
                        Você pode tentar uma das seguintes opções:
                    </p>
                    <ul className="text-left text-gray-600 space-y-2">
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-700 rounded-full mr-2 dark:text-gray-200"></span>
                            <p className={'dark:text-gray-200'}>Verificar se o URL está correto</p>
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-700 rounded-full mr-2 dark:text-gray-200"></span>
                            <p className={'dark:text-gray-200'}>Navegar pelo menu principal</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NotFound;