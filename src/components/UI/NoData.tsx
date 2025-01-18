'use client';
import React from 'react';
import {FaRegFolderOpen} from "react-icons/fa";
import Link from "next/link";
import paths from "@/paths";
import {HiHome, HiRefresh} from "react-icons/hi";
import {BsArrowLeft} from "react-icons/bs";

interface EmptyStateProps {
    description: string;
}

const EmptyState: React.FC<EmptyStateProps> = (
    {
        description,
    }) => {

    return (
        <div
            className="mt-36 flex flex-col items-center justify-center min-h-[400px] h-[650px] mx-5 p-8 text-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg">
            <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-gray-100">
                <FaRegFolderOpen size={36}/>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
                <p className={'text-2xl'}>Algo deu errado</p>
            </h3>

            <p className="max-w-sm mb-6 text-lg text-gray-500">
                {description}
            </p>

            <div className="flex gap-3">
                <Link href={paths.landingPage()}>
                    <button
                        className="inline-flex items-center px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors w-full md:w-auto justify-center">
                        <HiRefresh size={20} className="mr-2"/>
                        Atualizar Página
                    </button>
                </Link>
                <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center">
                    <Link href={paths.landingPage()}>
                        <button
                            className="inline-flex items-center px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors w-full md:w-auto justify-center">
                            <HiHome size={20} className="mr-2"/>
                            Voltar ao Início
                        </button>
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center px-6 py-3 border-2 border-green-700 text-green-700 hover:bg-green-50 font-semibold rounded-lg transition-colors w-full md:w-auto justify-center"
                    >
                        <BsArrowLeft size={20} className="mr-2"/>
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmptyState;