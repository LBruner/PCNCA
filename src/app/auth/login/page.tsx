'use client';

import React, {useState} from 'react';
import {Button, Spinner} from "@nextui-org/react";
import {MdOutlineMailOutline, MdPassword} from "react-icons/md";
import Image from "next/image";
import {useFormState} from "react-dom";
import {LoginProps, validarLogin} from "@/actions/login";
import {signIn} from "next-auth/react";
import FormErrorText from "@/components/UI/form/form-error-text";
import FormInput from "@/components/UI/form/form-input";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loginUser = async (formState: LoginProps, formData: FormData): Promise<LoginProps> => {
        setIsLoading(true);

        const validatedForm = await validarLogin(formState, formData);
        const hasErrors = Object.values(validatedForm.errors).some(value => value && value.length > 0)

        if(hasErrors){
            console.log(validatedForm.errors)
            setIsLoading(false);
            return {
                errors: validatedForm.errors
            }
        }

        const loginResponse = await signIn('credentials', {
            redirect: false,
            email: formData.get('email'),
            password: formData.get('senha'),
        });

        if (loginResponse && loginResponse.ok) {
            window.location.href = '/home';

            return {
                errors: {}
            }
        } else {
            setIsLoading(false)
            return {
                errors: {
                    _form: ['Usuário incorreto']
                }
            };
        }
    }


    const [formState, action] = useFormState(loginUser, {
        errors: {}
    });


    return (
        <div className="flex h-screen">
            <div className="w-3/5 bg-customGray p-10 flex items-center flex-col relative drop-shadow-2xl">
                <div className="container drop-shadow-md items-center w-4/5 mt-24">
                    <h1 className="text-5xl font-bold mb-2">Login</h1>
                    <form action={action} className="space-y-4">
                        <div className="flex flex-col gap-4">
                            <FormInput
                                name={'email'}
                                title={'Email'}
                                value={email}
                                errorMessage={formState.errors.email?.join(', ')}
                                isInvalid={!!formState.errors.email}
                                required={true}
                                onChange={(e) => setEmail(e.target.value)}
                                endContent={<MdOutlineMailOutline size={18}/>}
                            />
                            <FormInput
                                name={'senha'}
                                title={'Senha'}
                                type={'password'}
                                value={password}
                                required={true}
                                errorMessage={formState.errors.senha?.join(', ')}
                                isInvalid={!!formState.errors.senha}
                                onChange={(e) => setPassword(e.target.value)}
                                endContent={<MdPassword size={18}/>}
                            />
                        </div>
                        {formState.errors._form && formState.errors._form.length > 0 ? (
                            <FormErrorText errors={formState.errors._form}/>
                        ) : null}
                        {isLoading ? <Spinner/> : <div className="w-1/3">
                            <Button
                                color={'warning'}
                                type="submit"
                                className="w-full bg-customDarkBrown rounded-lg text-white text-md bold mt-4"
                            >
                                Logar
                            </Button>
                        </div>}

                    </form>
                </div>
            </div>
            <div className="w-2/5 relative">
                <div className="absolute inset-0" style={{backgroundImage: `url('/images/login_background.jpg')`}}>
                    <Image src={'/images/login_background.jpg'} objectFit="cover" fill={true} alt={'field plantation'}/>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
