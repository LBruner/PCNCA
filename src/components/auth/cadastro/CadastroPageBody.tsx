'use client';

import React, {useState} from "react";
import {Button, Checkbox, Spinner, useDisclosure} from "@nextui-org/react";
import {CreateUserProps} from "@/actions/cadastro";
import * as actions from "@/actions";
import {signIn} from "next-auth/react";
import {useFormState} from "react-dom";
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

    const {isOpen, onOpen, onClose} = useDisclosure();

    const cadastrarUsuario = async (formState: CreateUserProps, formData: FormData): Promise<CreateUserProps> => {
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

    const [formState, action] = useFormState(cadastrarUsuario, {
        errors: {},
    })

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
                        <RegisterFormSelect
                            selectProps={
                                {
                                    classNames:{
                                        label: 'text-gray-500',
                                        value: 'text-black',
                                    },
                                    className: 'text-gray-500',
                                    collection: empresas.map((empresa) => ({
                                        uid: empresa.id.toString(),
                                        name: capitalizeFirstLetter(empresa.nome)
                                    })),
                                    name: 'empresa',
                                    children:[],
                                    value: company.toString(),
                                    onChange: (value: any) => {
                                        setCompany(parseInt(value.target.value));
                                    },
                                    placeholder: 'Selecione uma empresa',
                                    label: 'Empresa',
                                    errorMessage: formState.errors.empresa?.join(', '),
                                    isInvalid: !!formState.errors.empresa,
                                }
                            }
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
                                Eu li e aceito os <span onClick={onOpen}
                                                        className={'hover:cursor-pointer text-warning'}>Termos de Uso e a Política de Privacidade</span>. Ao continuar, concordo em cumprir esses termos e estou ciente das práticas de coleta, uso e compartilhamento de dados descritas.
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

export default CadastroPageBody;