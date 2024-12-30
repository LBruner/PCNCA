'use client';
import React, {forwardRef, useRef, useState} from "react";
import CriarNoticiaInformacoesBasicasInputField
    from "@/components/noticias/criacao/criar-noticia-informacoes-basicas-input-field";
import CriarNoticiaInformacoesBasicasSelectField
    from "@/components/noticias/criacao/criar-noticia-informacoes-basicas-select-field";
import {DateInput} from "@nextui-org/react";
import {I18nProvider} from "@react-aria/i18n";
import {parseDate} from "@internationalized/date";
import CriarPessoaFormControls from "@/components/pessoas/criar/CriarPessoaFormControls";
import {Pessoa} from "@prisma/client";
import {formatPhoneNumber} from "@/helpers";


interface PessoaFormProps {
    pessoa: Pessoa | null;
    setPessoa: React.Dispatch<React.SetStateAction<Pessoa | null>>;
    currentScreenIndex: number;
    setScreenIndex: React.Dispatch<React.SetStateAction<number>>;
}

const CriarPessoaInformacoesBasicas: React.FC<PessoaFormProps> = forwardRef((props) => {
    const {setScreenIndex, setPessoa,pessoa} = props;

    const [nome, setNome] = useState(pessoa?.nome ?? '');
    const [email, setEmail] = useState(pessoa?.email ?? '');
    const [contato, setContato] = useState(pessoa?.contato ?? '');
    const [dataNascimento, setDataNascimento] = useState(pessoa?.dataNascimento.toISOString().slice(0, 10) ?? new Date().toISOString().slice(0, 10));
    const [categoria, setCategoria] = useState(pessoa?.categoria ?? '');
    const [imagemUrl, setImagemUrl] = useState(pessoa?.imagem ?? '')

    const formRef = useRef<HTMLFormElement>(null);

    const submitForm = () => {

        if(!formRef.current!.reportValidity()){
            formRef.current!.reportValidity();
            return;
        }

        setPessoa({
            nome: nome,
            email: email,
            contato: contato,
            dataNascimento: new Date(dataNascimento),
            categoria: categoria,
            imagem: imagemUrl,
        } as any);
        setScreenIndex(prevState => prevState + 1);
    }

    const handleContatoChange = (newValue: string) => {
        const formattedNumber = formatPhoneNumber(newValue);
        setContato(formattedNumber);
    };

    return (
        <form ref={formRef}
              className={'flex flex-col items-center pt-8 h-auto overflow-hidden mb-5'}>
            <div
                className={'w-full mx-36 border rounded-lg py-10 px-12 flex flex-col gap-8 justify-start items-center'}>
                <InputWrapper>
                    <CriarNoticiaInformacoesBasicasInputField
                        titulo={'Nome *'}
                        subtitulo={'Nome completo'} value={nome}
                        onChange={(newValue) => {
                            setNome(newValue);
                        }}
                    />
                    <CriarNoticiaInformacoesBasicasInputField
                        titulo={'Email *'}
                        subtitulo={'Endereço eletrônico'} value={email}
                        type={'email'}
                        onChange={(newValue) => {
                            setEmail(newValue)
                        }}
                    />
                </InputWrapper>
                <InputWrapper>
                    <CriarNoticiaInformacoesBasicasInputField
                        titulo={'Imagem *'}
                        subtitulo={'Imagem de perfil'} value={imagemUrl}
                        onChange={(newValue) => {
                            setImagemUrl(newValue)
                        }}
                    />
                    <CriarNoticiaInformacoesBasicasInputField
                        titulo={'Contato *'}
                        subtitulo={'Número de celular'}
                        value={contato}
                        type={'tel'}
                        onChange={handleContatoChange}
                    />
                </InputWrapper>
                <InputWrapper>
                    <div className={'flex w-full justify-around'}>
                        <div className={'flex flex-col'}>
                            <p className={'text-lg w-48 font-semibold'}>{'Data de nascimento'}</p>
                            <p className={'text-md w-48 text-gray-500'}>{'Data válida'}</p>
                        </div>
                        <I18nProvider locale="pt-BR"
                        >
                            <DateInput className={'w-full'} isRequired={true} value={parseDate(dataNascimento)}
                                       errorMessage={'Data inválida'} onChange={(novoStatus) => {
                                setDataNascimento(novoStatus.toString())
                            }} size={'lg'}/>
                        </I18nProvider>
                    </div>
                    <CriarNoticiaInformacoesBasicasSelectField
                        titulo={'Categoria'} valor={categoria}
                        placeholder={''}
                        subtitulo={`Tipo de pessoa`}
                        collection={['Física', 'Jurídica']}
                        onChange={(novaCategoria) => {
                            setCategoria(prevState => novaCategoria)
                        }}
                    />
                </InputWrapper>
                <CriarPessoaFormControls submitForm={submitForm} currentScreenIndex={props.currentScreenIndex} setScreenIndex={setScreenIndex}/>
            </div>

        </form>
    )
})

const InputWrapper: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return <div className={'flex justify-between w-full gap-14'}>
        {children}
    </div>
}


export default CriarPessoaInformacoesBasicas;
