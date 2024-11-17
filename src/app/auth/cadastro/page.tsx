'use client';

import React, {useState} from 'react';
import {Button, Checkbox, Spinner} from "@nextui-org/react";
import {IoPersonOutline} from "react-icons/io5";
import {MdOutlineMailOutline, MdPassword, MdWorkOutline} from "react-icons/md";
import Image from "next/image";
import CpfInput from "@/components/UI/form/cpf-input";
import {useFormState} from 'react-dom';
import * as actions from '@/actions';
import {CreateUserProps} from "@/actions/cadastro";
import {signIn} from "next-auth/react";
import FormErrorText from "@/components/UI/form/form-error-text";
import RegisterFormInput from "@/components/UI/form/register-form-input";
import Link from "next/link";
import paths from "@/paths";

function CadastroPage() {
    const [name, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const registerUser = async (formState: CreateUserProps, formData: FormData): Promise<CreateUserProps> => {
        setIsLoading(true);

        const validatedForm = await actions.validarCadastro(formState, formData);
        const hasErrors = Object.values(validatedForm.errors).some(value => value && value.length > 0)

        if (hasErrors) {
            setIsLoading(false);
            return validatedForm;
        } else {
            try {
                await signIn('credentials', {email, password, redirect: false});
            } catch (err: unknown) {
                if (err instanceof Error) {

                    return {
                        ...validatedForm,
                        errors: {
                            _form: [err.message],
                        }
                    }
                }
            }
        }
        window.location.href = '/noticias';

        return {errors: {}}
    }

    const [formState, action] = useFormState(registerUser, {
        errors: {},
    })


    return (
        <div className="flex h-screen">
            <div className="w-3/5 bg-customGray p-10 flex items-center flex-col relative drop-shadow-2xl">
                <div className="container drop-shadow-md items-center w-4/5 mt-24">
                    <h1 className="text-5xl font-bold mb-2">Cadastro</h1>
                    <p className="text-xl font-semibold text-gray-800 mb-8">
                        Junte-se a nós e tenha acesso a uma plataforma completa para a compra e venda de commodities
                        agrícolas de alta qualidade.
                    </p>
                    <form action={action} className="space-y-4">
                        <div className="flex space-x-4">
                            <RegisterFormInput
                                name={'nome'}
                                title={'Nome Completo'}
                                value={name}
                                required={true}
                                errorMessage={formState.errors.nome?.join(', ')}
                                isInvalid={!!formState.errors.nome}
                                onChange={(e) => setFirstName(e.target.value)}
                                endContent={<IoPersonOutline size={18}/>}
                            />
                            <CpfInput cpf={cpf} setCPF={setCpf} hasError={!!formState.errors.cpf}
                                      errorMessage={formState.errors.cpf?.join(', ')}
                                      onChange={() => {
                                      }}/>
                        </div>
                        <RegisterFormInput
                            name={'empresa'}
                            title={'Empresa'}
                            value={company}
                            errorMessage={formState.errors.empresa?.join(', ')}
                            isInvalid={!!formState.errors.empresa}
                            required={true}
                            onChange={(e) => setCompany(e.target.value)}
                            endContent={<MdWorkOutline size={18}/>}
                        />
                        <div className="flex space-x-4">
                            <RegisterFormInput
                                name={'email'}
                                title={'Email'}
                                value={email}
                                errorMessage={formState.errors.email?.join(', ')}
                                isInvalid={!!formState.errors.email}
                                required={true}
                                onChange={(e) => setEmail(e.target.value)}
                                endContent={<MdOutlineMailOutline size={18}/>}
                            />
                            <RegisterFormInput
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

                        <Checkbox
                            name="termos"
                        >
                            <span className="text-sm">
                                Eu li e aceito os Termos de Uso e a Política de Privacidade. Ao continuar, concordo em cumprir esses termos e estou ciente das práticas de coleta, uso e compartilhamento de dados descritas.
                            </span>
                        </Checkbox>
                        {formState.errors.termos && formState.errors.termos.length > 0 ? (
                            <FormErrorText errors={formState.errors.termos}/>
                        ) : null}
                        {formState.errors._form && formState.errors._form.length > 0 ? (
                            <FormErrorText errors={formState.errors._form}/>
                        ) : null}
                        <div className="w-1/3">
                            {isLoading ? <Spinner/> : <Button
                                color={'warning'}
                                type="submit"
                                className="w-full bg-customDarkBrown rounded-lg text-white text-md bold mt-4"
                            >
                                Cadastrar
                            </Button>}
                        </div>
                    </form>
                </div>
                <div>
                    <p className={'mt-14'}>Já possui uma conta? <Link className={'text-orange-400 font-semibold'}
                                                                       href={paths.login()}>Entrar</Link></p>
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

export default CadastroPage;
