'use client';

import {FormEvent, useState} from 'react';
import {BiKey} from "react-icons/bi";
import {IoIosEye, IoIosEyeOff} from "react-icons/io";
import {alterarSenha} from "@/actions/usuarios";
import {signOut} from "next-auth/react";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        setLoading(true);
        try {
            await alterarSenha(password);
            await signOut();

            window.location.href = '/auth/login';

        } catch (err) {
            setError('Ocorreu um erro ao redefinir a senha. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen dark:bg-customDarkBg bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="rounded-full bg-warning-100 p-4">
                        <BiKey className="h-12 w-12 text-warning-600"/>
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold dark:text-white text-gray-900">
                    Redefinir sua senha
                </h2>
                <p className="mt-2 text-center text-sm dark:text-gray-300 text-gray-600">
                    Digite sua nova senha abaixo
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-customDarkFooter py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="password" className="block dark:text-white text-sm font-medium text-gray-700">
                                Nova senha
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <IoIosEyeOff className="h-5 w-5 text-gray-400"/>
                                    ) : (
                                        <IoIosEye className="h-5 w-5 text-gray-400"/>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block dark:text-white text-sm font-medium text-gray-700">
                                Confirme a nova senha
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <IoIosEyeOff className="h-5 w-5 text-gray-400"/>
                                    ) : (
                                        <IoIosEye className="h-5 w-5 text-gray-400"/>
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-md bg-red-50 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">
                                            {error}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                    loading
                                        ? 'bg-warning-400 cursor-not-allowed'
                                        : 'bg-warning-600 hover:bg-warning-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-warning-500'
                                }`}
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <div
                                            className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                                        <span className="ml-2">Processando...</span>
                                    </div>
                                ) : (
                                    <p className={'dark:text-white text-white'}>Redefinir senha</p>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="relative flex justify-center text-sm">
    <span className="px-2 dark:text-gray-200 text-gray-500">
        Requisitos de senha
    </span>
                            </div>
                        </div>
                        <div className="mt-6 text-sm">
                            <ul className="list-disc space-y-2 pl-5 dark:text-white text-gray-500">
                                <li>Mínimo de 6 caracteres</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;