'use client';
import React, {useRef, useState} from "react";
import CriarNoticiaInformacoesBasicasInputField
    from "@/components/noticias/criacao/criar-noticia-informacoes-basicas-input-field";
import CriarNoticiaInformacoesBasicasSelectField
    from "@/components/noticias/criacao/criar-noticia-informacoes-basicas-select-field";
import {DatePicker} from "@heroui/react";
import {I18nProvider} from "@react-aria/i18n";
import CriarPessoaFormControls from "@/components/pessoas/criar/CriarPessoaFormControls";
import {formatPhoneNumber} from "@/helpers";
import {MdOutlineAlternateEmail, MdOutlineLocalPhone} from "react-icons/md";
import {BsPerson} from "react-icons/bs";
import {IoMdImages} from "react-icons/io";
import {PessoaCriacao} from "@/actions/pessoas";
import {parseDate} from "@internationalized/date";

interface PessoaFormProps {
    pessoa: PessoaCriacao;
    setPessoa: React.Dispatch<React.SetStateAction<PessoaCriacao>>;
    currentScreenIndex: number;
    setScreenIndex: React.Dispatch<React.SetStateAction<number>>;
}

const CriarPessoaInformacoesBasicas: React.FC<PessoaFormProps> = (props) => {
    const {setScreenIndex, setPessoa, pessoa} = props;

    const [nome, setNome] = useState(pessoa?.nome ?? '');
    const [email, setEmail] = useState(pessoa?.email ?? '');
    const [telefone, setTelefone] = useState(pessoa?.telefone ?? '');
    const [dataNascimento, setDataNascimento] = useState(pessoa?.dataNascimento ?? new Date('2020-02-29').toISOString().slice(0, 10));
    const [categoria, setCategoria] = useState(pessoa.categoria ?? 'Física');
    const [imagemUrl, setImagemUrl] = useState(pessoa?.imagemLink ?? '')
    const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);

    const submitForm = () => {

        if (!formRef.current!.reportValidity()) {
            formRef.current!.reportValidity();
            return;
        }

        setPessoa(prevState => ({
            ...prevState,
            nome: nome,
            razaoSocial: nome,
            email: email,
            telefone: formatPhoneNumber(telefone),
            dataNascimento: dataNascimento,
            imagemLink: imagemUrl,
            categoria,
        }));

        setScreenIndex(prevState => prevState + 1);
    }

    const handleContatoChange = (newValue: string) => {
        const formattedNumber = formatPhoneNumber(newValue);
        setTelefone(formattedNumber);

        const digits = newValue.replace(/\D/g, '');
        setIsPhoneInvalid(digits.length < 11);
    };

    return (
        <form ref={formRef}
              className={'flex flex-col items-center pt-8 h-auto overflow-hidden mb-5 dark:bg-customDarkFooter rounded-b-lg'}>
            <div
                className={'w-full mx-36 border dark:border-none rounded-xl py-10 px-12 flex flex-col gap-8 justify-start items-center'}>
                <InputWrapper>
                    <CriarNoticiaInformacoesBasicasSelectField
                        titulo={'Categoria *'} valor={categoria}
                        placeholder={''}
                        subtitulo={`Tipo de pessoa`}
                        collection={[{name: 'Física', uid: 'Física',}, {uid: 'Jurídica', name: 'Jurídica',}]}
                        onChange={(novaCategoria) => {
                            setCategoria(novaCategoria)
                        }}
                    />
                    <CriarNoticiaInformacoesBasicasInputField
                        titulo={`${categoria == 'Jurídica' ? 'Razão Social *' : 'Nome *'}`}
                        subtitulo={`${categoria == 'Jurídica' ? 'Nome da empresa' : 'Nome completo'}`} value={nome}
                        onChange={(newValue) => {
                            setNome(newValue);
                        }}
                        errorMessage={'Nome Inválido'}
                        icon={<BsPerson size={22}/>}
                    />

                </InputWrapper>
                <InputWrapper>
                    <CriarNoticiaInformacoesBasicasInputField
                        titulo={'Email *'}
                        subtitulo={'Endereço eletrônico'} value={email}
                        type={'email'}
                        onChange={(newValue) => {
                            setEmail(newValue)
                        }}
                        errorMessage={'Email Inválido'}
                        icon={<MdOutlineAlternateEmail/>}
                    />
                    <CriarNoticiaInformacoesBasicasInputField
                        titulo={'Imagem *'}
                        subtitulo={'URL da imagem'} value={imagemUrl}
                        onChange={(newValue) => {
                            setImagemUrl(newValue)
                        }}
                        errorMessage={'URL Inválida'}
                        icon={<IoMdImages size={22}/>}
                    />

                </InputWrapper>
                <InputWrapper>
                    <div className={'flex w-full justify-around'}>
                        <div className={'flex flex-col'}>
                            <p className={'text-lg w-48 font-semibold'}>{`${categoria == 'Jurídica' ? 'Data de Fundação *' : 'Data de Nascimento *'}`}</p>
                            <p className={'text-md w-48 text-gray-500 dark:text-white'}>{'Data válida'}</p>
                        </div>
                        <I18nProvider locale="pt-BR"
                        >
                            <DatePicker maxValue={parseDate(new Date().toISOString().slice(0, 10))} labelPlacement={'outside'} value={parseDate(dataNascimento)} aria-label={' '} className={'w-full'} isRequired={true}
                                       errorMessage={'Data inválida'} onChange={(novaData) => {
                                setDataNascimento(novaData!.toString())
                            }} size={'lg'}/>
                        </I18nProvider>
                    </div>
                    <CriarNoticiaInformacoesBasicasInputField
                        titulo={'Contato *'}
                        subtitulo={'Número de celular'}
                        value={telefone.toString()}
                        type={'text'}
                        minLength={15}
                        isInvalid={isPhoneInvalid}
                        onChange={handleContatoChange}
                        errorMessage={'Número inválido'}
                        icon={<MdOutlineLocalPhone/>}
                    />
                </InputWrapper>
                <CriarPessoaFormControls submitForm={submitForm} currentScreenIndex={props.currentScreenIndex}
                                         setScreenIndex={setScreenIndex}/>
            </div>

        </form>
    )
};

const InputWrapper: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return <div className={'flex justify-between w-full gap-14'}>
        {children}
    </div>
}


export default CriarPessoaInformacoesBasicas;
