'use client';

import React, {useRef, useState} from "react";
import {Button, Checkbox, Spinner, useDisclosure} from "@heroui/react";
import * as actions from "@/actions";
import {signIn} from "next-auth/react";
import TermosCondicoesModal from "@/components/auth/cadastro/TermosCondicoesModal";
import RegisterFormInput from "@/components/UI/form/register-form-input";
import {IoPersonOutline} from "react-icons/io5";
import CpfInput from "@/components/UI/form/cpf-input";
import {MdOutlineMailOutline, MdPassword} from "react-icons/md";
import FormErrorText from "@/components/UI/form/form-error-text";
import Link from "next/link";
import paths from "@/paths";
import Image from "next/image";
import {Empresa} from "@prisma/client";
import RegisterFormSelect from "@/components/UI/form/register-form-select";
import {capitalizeFirstLetter} from "@/helpers";

interface CadastroPageBodyProps {
    empresas: Empresa[];
}

const CadastroPageBody: React.FC<CadastroPageBodyProps> = ({empresas}) => {
    const [name, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState<number>(0);
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{[key: string]: string[]}>({});

    const formRef = useRef<HTMLFormElement>(null);
    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        // Create FormData from the form
        const formData = new FormData(event.currentTarget);

        try {
            const result = await actions.validarCadastro({ errors: {} }, formData);

            // Check if there are any validation errors
            const hasErrors = Object.keys(result.errors).length > 0;

            if (hasErrors) {
                setErrors(result.errors);
                setIsLoading(false);
                return;
            }

            // If validation passes, try to sign in
            try {
                await signIn('credentials', {
                    email,
                    password,
                    redirect: false
                });

                // Redirect on success
                window.location.href = '/noticias';
            } catch (error) {
                if (error instanceof Error) {
                    setErrors({
                        _form: [error.message]
                    });
                } else {
                    setErrors({
                        _form: ['Ocorreu um erro durante o login']
                    });
                }
                setIsLoading(false);
            }
        } catch (error) {
            setErrors({
                _form: ['Ocorreu um erro durante o cadastro']
            });
            setIsLoading(false);
        }
    };

    // Clear specific field error when the field value changes
    const clearFieldError = (fieldName: string) => {
        if (errors[fieldName]) {
            const newErrors = {...errors};
            delete newErrors[fieldName];
            setErrors(newErrors);
        }
    };

    return (
        <div className="flex h-screen">
            <TermosCondicoesModal isOpen={isOpen} onClose={onClose}/>
            <div className="w-3/5 bg-customGray p-10 flex items-center flex-col relative drop-shadow-2xl">
                <div className="container drop-shadow-md items-center w-4/5 mt-24">
                    <h1 className="text-5xl font-bold mb-2">Cadastro</h1>
                    <p className="text-xl font-semibold text-gray-800 mb-8">
                        Junte-se a nós e tenha acesso a uma plataforma completa para a compra e venda de commodities
                        agrícolas de alta qualidade.
                    </p>
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex space-x-4">
                            <RegisterFormInput
                                name={'nome'}
                                title={'Nome Completo'}
                                value={name}
                                required={true}
                                errorMessage={errors.nome?.join(', ')}
                                isInvalid={!!errors.nome}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                    clearFieldError('nome');
                                }}
                                endContent={<IoPersonOutline size={18}/>}
                            />
                            <CpfInput
                                cpf={cpf}
                                setCPF={(value) => {
                                    setCpf(value);
                                    clearFieldError('cpf');
                                }}
                                hasError={!!errors.cpf}
                                errorMessage={errors.cpf?.join(', ')}
                                onChange={() => clearFieldError('cpf')}
                            />
                        </div>
                        <RegisterFormSelect
                            selectProps={
                                {
                                    classNames: {
                                        label: 'text-gray-500',
                                        value: 'text-black',
                                    },
                                    className: 'text-gray-500',
                                    collection: empresas.map((empresa) => ({
                                        uid: empresa.id.toString(),
                                        name: capitalizeFirstLetter(empresa.nome)
                                    })),
                                    name: 'empresa',
                                    children: [],
                                    value: company.toString(),
                                    onChange: (value: any) => {
                                        setCompany(parseInt(value.target.value));
                                        clearFieldError('empresa');
                                    },
                                    placeholder: 'Selecione uma empresa',
                                    label: 'Empresa',
                                    errorMessage: errors.empresa?.join(', '),
                                    isInvalid: !!errors.empresa,
                                }
                            }
                        />
                        <div className="flex space-x-4">
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
                                endContent={<MdOutlineMailOutline size={18}/>}
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
                                endContent={<MdPassword size={18}/>}
                            />
                        </div>

                        <Checkbox
                            color={'primary'}
                            name="termos"
                            onChange={() => clearFieldError('termos')}
                        >
                        </Checkbox>
                        <span className="text-md font-light">
                                Eu li e aceito os <span onClick={onOpen}
                                                        className={'hover:cursor-pointer text-warning'}>Termos de Uso e a Política de Privacidade</span>. Ao continuar, concordo em cumprir esses termos e estou ciente das práticas de coleta, uso e compartilhamento de dados descritas.
                            </span>
                        {errors.termos && errors.termos.length > 0 ? (
                            <FormErrorText errors={errors.termos}/>
                        ) : null}
                        {errors._form && errors._form.length > 0 ? (
                            <FormErrorText errors={errors._form}/>
                        ) : null}
                        <div className="w-1/3">
                            <Button
                                color={'warning'}
                                type="submit"
                                className="w-full bg-customDarkBrown rounded-lg text-white text-md bold mt-4"
                                disabled={isLoading}
                            >
                                {isLoading ? <Spinner color={'default'}/> : 'Cadastrar'}
                            </Button>
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

export default CadastroPageBody;