'use client';
import React, {ReactNode} from 'react';
import {FaRegFolderOpen} from "react-icons/fa";
import paths from "@/paths";
import {HiHome, HiRefresh} from "react-icons/hi";
import {BsArrowLeft} from "react-icons/bs";
import CustomButton from "@/components/UI/CustomButton";

interface EmptyStateProps {
    description: string;
    children?: ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = (
    {
        children,
        description,
    }) => {

    return (
        <div
            className="flex flex-col dark:bg-customDarkFooter items-center justify-center min-h-[400px] h-[650px] mx-5 p-8 text-center bg-gray-50 border-2 dark:border-none border-dashed border-gray-200 rounded-lg">
            <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-gray-100 dark:bg-gray-950">
                <FaRegFolderOpen className={'dark:text-white'} size={36}/>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                <p className={'text-2xl'}>Não tem nada por aqui</p>
            </h3>

            <p className="max-w-sm mb-6 text-lg text-gray-500  dark:text-gray-200">
                {description}
            </p>
            <div className="flex gap-3">
                {children}
                <CustomButton
                    title={'Atualizar Página'}
                    url={'#'}
                    icon={<HiRefresh size={20} className="mr-2"/>}
                    className={'border-transparent bg-blue-700 hover:bg-blue-800 text-white'}
                    onClick={() => window.location.reload()}
                />
                <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center">
                    <CustomButton
                        title={'Voltar ao Início'}
                        url={paths.landingPage()}
                        icon={<HiHome size={20} className="mr-2"/>}
                        className={'border-transparent bg-green-700 hover:bg-green-800 text-white'}
                    />
                    <CustomButton
                        title={'Voltar'}
                        url={paths.landingPage()}
                        icon={<BsArrowLeft size={20} className="mr-2"/>}
                        className={'border-green-700 dark:hover:bg-green-800 dark:hover:text-white text-green-700 hover:bg-green-50 text'}
                        onClick={() => window.history.back()}
                    />
                </div>
            </div>
        </div>
    );
};

export default EmptyState;