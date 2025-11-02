'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button, Spinner } from "@heroui/react";
import { MdOutlineMailOutline, MdPassword } from "react-icons/md";
import Image from "next/image";
import { validarLogin } from "@/actions/login";
import { signIn } from "next-auth/react";
import FormErrorText from "@/components/UI/form/form-error-text";
import RegisterFormInput from "@/components/UI/form/register-form-input";
import Link from "next/link";
import paths from "@/paths";
import { useCart } from '@/app/context/CartContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const { clearCart } = useCart();

    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => { clearCart() }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        // Create FormData from the form
        const formData = new FormData(event.currentTarget);

        try {
            // Validate form data
            const validatedForm = await validarLogin({ errors: {} }, formData);
            const hasErrors = Object.values(validatedForm.errors).some(value => value && value.length > 0);

            if (hasErrors) {
                setErrors(validatedForm.errors);
                setIsLoading(false);
                return;
            }

            // Attempt sign in
            const loginResponse = await signIn('credentials', {
                redirect: false,
                email: formData.get('email'),
                password: formData.get('senha'),
            });

            if (loginResponse && loginResponse.ok) {
                // Redirect on success
                window.location.href = '/noticias';
            } else {
                setErrors({
                    _form: ['Usuário ou senha incorretos']
                });
                setIsLoading(false);
            }
        } catch (error) {
            setErrors({
                _form: ['Ocorreu um erro durante o login']
            });
            setIsLoading(false);
        }
    };

    // Clear specific field error when the field value changes
    const clearFieldError = (fieldName: string) => {
        if (errors[fieldName]) {
            const newErrors = { ...errors };
            delete newErrors[fieldName];
            setErrors(newErrors);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-3/5 bg-customGray dark:bg-customDarkFooter p-10 flex items-center flex-col relative drop-shadow-2xl">
                <div className="container drop-shadow-md items-center w-4/5 mt-24">
                    <h1 className="text-5xl font-bold mb-2">Login</h1>
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col gap-4">
                            <RegisterFormInput
                                name={'email'}
                                title={'Email'}
                                value={email}
                                errorMessage={errors.email?.join(', ')}
                                isInvalid={!!errors.email}
                                required={true}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    clearFieldError('email');
                                }}
                                endContent={<MdOutlineMailOutline size={18} />}
                            />
                            <RegisterFormInput
                                name={'senha'}
                                title={'Senha'}
                                type={'password'}
                                value={password}
                                required={true}
                                errorMessage={errors.senha?.join(', ')}
                                isInvalid={!!errors.senha}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    clearFieldError('senha');
                                }}
                                endContent={<MdPassword size={18} />}
                            />
                        </div>
                        {errors._form && errors._form.length > 0 ? (
                            <FormErrorText errors={errors._form} />
                        ) : null}
                        <div className="w-1/3">
                            <Button
                                color={'warning'}
                                type="submit"
                                className="w-full dark:bg-orange-400 bg-customDarkBrown rounded-lg text-white text-md bold mt-4"
                                disabled={isLoading}
                            >
                                {isLoading ? <Spinner color={'default'} /> : 'Logar'}
                            </Button>
                        </div>
                    </form>
                </div>
                <div>
                    <p className={'mt-14'}>Não possui uma conta? <Link className={'text-orange-400 font-semibold'} href={paths.cadastro()}>Cadastre-se</Link></p>
                </div>
            </div>
            <div className="w-2/5 relative">
                <div className="absolute inset-0" style={{ backgroundImage: `url('/images/login_background.jpg')` }}>
                    <Image src={'/images/login_background.jpg'} objectFit="cover" fill={true} alt={'field plantation'} />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;