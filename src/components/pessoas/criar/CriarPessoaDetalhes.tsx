'use client';
import React, {useRef, useState} from "react";
import CriarNoticiaInformacoesBasicasInputField
    from "@/components/noticias/criacao/criar-noticia-informacoes-basicas-input-field";
import CriarNoticiaInformacoesBasicasSelectField
    from "@/components/noticias/criacao/criar-noticia-informacoes-basicas-select-field";
import {formatCEP, formatCNPJ, formatCPF, formatInscricaoEstadual, formatRG} from "@/helpers";
import CriarPessoaFormControls from "@/components/pessoas/criar/CriarPessoaFormControls";
import {PiBuildingLight, PiCity, PiTrademark} from "react-icons/pi";
import {CiLocationOn} from "react-icons/ci";
import {AiOutlineIdcard} from "react-icons/ai";
import {PessoaCriacao} from "@/actions/pessoas";
import {estadosFilterCollection} from "@/constants/estados";
import {FilterCollection} from "@/models/shared/FilterCollection";
import {NumberInput} from "@heroui/react";

interface PessoaFormProps {
    pessoa: PessoaCriacao;
    setPessoaPessoaCompleta: React.Dispatch<React.SetStateAction<PessoaCriacao>>;
    currentScreenIndex: number;
    setScreenIndex: React.Dispatch<React.SetStateAction<number>>;
    tiposPessoa: FilterCollection[];
}

const CriarPessoaDetalhes: React.FC<PessoaFormProps> = (props) => {
    const {
        currentScreenIndex,
        setScreenIndex,
        setPessoaPessoaCompleta,
        pessoa,
        tiposPessoa,
    } = props;

    const [cep, setCep] = useState(pessoa?.cep ?? '');
    const [cidade, idade] = useState(pessoa?.cidade ?? '');
    const [estado, setEstado] = useState(pessoa?.estado ?? '');
    const [logradouro, setLogradouro] = useState(pessoa?.logradouro ?? '');
    const [bairro, setBairro] = useState(pessoa?.bairro ?? '');
    const [pais, setPais] = useState(pessoa?.pais ?? '');
    const [complemento, setComplemento] = useState(pessoa?.complemento ?? '');
    const [numero, setNumero] = useState(pessoa?.numero ?? 0);
    const [cnpj, setCnpj] = useState(pessoa?.cnpj ?? '')
    const [tipo, setTipo] = useState<number>(pessoa?.tipo ?? 0)
    const [inscricaoEstadual, setInscricaoEstadual] = useState(pessoa?.inscricaoEstadual ?? '')
    const [nomeFantasia, setNomeFantasia] = useState(pessoa?.nomeFantasia ?? '')
    const [rg, setRg] = useState(pessoa?.rg ?? '')
    const [cpf, setCpf] = useState(pessoa?.cpf ?? '')

    const formRef = useRef<HTMLFormElement>(null);

    const submitForm = () => {

        if (!formRef.current!.reportValidity()) {
            formRef.current!.reportValidity();
            return;
        }

        setPessoaPessoaCompleta(prevState => ({
            ...prevState,
            cep: cep,
            cidade,
            estado,
            cnpj,
            cpf,
            inscricaoEstadual,
            nomeFantasia,
            rg,
            pais,
            complemento,
            logradouro,
            bairro,
            numero,
            tipo: tipo,
        }));
        setScreenIndex(prevState => prevState + 1);
    }

    const handleCpfChange = (newValue: string) => {
        const formattedCPF = formatCPF(newValue);
        setCpf(formattedCPF);
    };

    const handleRgChange = (newValue: string) => {
        const formattedRg = formatRG(newValue);
        setRg(formattedRg);
    };

    const handleCepChange = (newValue: string) => {
        const formattedCep = formatCEP(newValue);
        setCep(formattedCep);
    };

    const handleCnpjChange = (newValue: string) => {
        const formattedCnpj = formatCNPJ(newValue);
        setCnpj(formattedCnpj);
    };

    const handleInscricaoEstadualChange = (newValue: string) => {
        const formattedInscricaoEstadual = formatInscricaoEstadual(newValue);
        setInscricaoEstadual(formattedInscricaoEstadual);
    };

    const enderecoFields = <>
        <InputWrapper>
            <CriarNoticiaInformacoesBasicasInputField
                titulo={'CEP *'}
                minLength={9}
                errorMessage={'CEP inválido'}
                subtitulo={''} value={cep.toString()}
                type={'text'}
                onChange={(newValue) => {
                    handleCepChange(newValue);
                }}
                icon={<CiLocationOn size={22}/>}
            />
            <CriarNoticiaInformacoesBasicasInputField
                titulo={'Cidade *'}
                minLength={3}
                errorMessage={'Cidade inválida'}
                subtitulo={''} value={cidade}
                onChange={(newValue) => {
                    idade(newValue)
                }}
                icon={<PiCity size={22}/>}
            />
        </InputWrapper>
        <InputWrapper>
            <CriarNoticiaInformacoesBasicasSelectField
                titulo={'Estado *'} valor={estado}
                placeholder={''}
                subtitulo={''}
                collection={estadosFilterCollection}
                onChange={(novoEstado) => {
                    setEstado(novoEstado)
                }}
            />
            <CriarNoticiaInformacoesBasicasInputField
                titulo={'Pais *'}
                subtitulo={''} value={pais}
                type={'text'}
                errorMessage={'Pais inválido'}
                minLength={3}
                onChange={(newValue) => {
                    setPais(newValue)
                }}
                icon={<PiCity size={22}/>}
            />
        </InputWrapper>
        <InputWrapper>
            <CriarNoticiaInformacoesBasicasInputField
                titulo={'Bairro *'}
                subtitulo={''} value={bairro}
                type={'text'}
                errorMessage={'Bairro inválido'}
                minLength={3}
                onChange={(newValue) => {
                    setBairro(newValue)
                }}
                icon={<PiCity size={22}/>}
            />
            <CriarNoticiaInformacoesBasicasInputField
                titulo={'Logradouro *'}
                minLength={3}
                errorMessage={'Logradouro inválido'}
                type={'text'}
                subtitulo={''} value={logradouro}
                onChange={(newValue) => {
                    setLogradouro(newValue)
                }}
                icon={<PiCity size={22}/>}
            />
        </InputWrapper>
        <InputWrapper>
            <div className={'w-full flex items-center'}>
                <div className={'flex flex-col '}>
                    <p className={'text-lg w-48 font-semibold'}>{'Número'}</p>
                </div>
                <NumberInput size={'sm'} isClearable={true} maxValue={9999}
                             label={''}
                             onChange={(newValue: any) => {
                                 setNumero(parseInt(newValue?.target?.value))
                             }}/>
            </div>
            <CriarNoticiaInformacoesBasicasInputField
                titulo={'Complemento *'}
                minLength={3}
                errorMessage={'Complemento inválido'}
                subtitulo={''} value={complemento}
                onChange={(newComplemento) => {
                    setComplemento(newComplemento)
                }}
                icon={<PiCity size={22}/>}
            />
        </InputWrapper>
    </>
    const pessoaJuridicaFields = <>
        <InputWrapper>
            <CriarNoticiaInformacoesBasicasInputField
                titulo={'CNPJ *'}
                errorMessage={'CNPJ inválido'}
                minLength={18}
                subtitulo={''}
                value={cnpj}
                type={'text'}
                onChange={(newValue) => {
                    handleCnpjChange(newValue)
                }}
                icon={<AiOutlineIdcard size={22}/>}
            />
            <CriarNoticiaInformacoesBasicasSelectField
                titulo={'Tipo'} valor={tipo.toString()}
                placeholder={''}
                subtitulo={``}
                collection={tiposPessoa}
                onChange={(novoTipoPessoa) => {
                    setTipo(parseInt(novoTipoPessoa));
                }}
            />
        </InputWrapper>
        <InputWrapper>
            <CriarNoticiaInformacoesBasicasInputField
                titulo={'Inscrição Estadual *'}
                minLength={12}
                errorMessage={'Inscrição Estadual inválida'}
                subtitulo={''}
                type={'text'}
                value={inscricaoEstadual.toString()}
                onChange={(newValue) => {
                    handleInscricaoEstadualChange(newValue)
                }}
                icon={<PiTrademark size={22}/>}
            />
            <CriarNoticiaInformacoesBasicasInputField
                titulo={'Nome Fantasia'}
                minLength={3}
                errorMessage={'Nome Fantasia inválido'}
                subtitulo={''}
                required={false}
                value={nomeFantasia}
                type={'text'}
                onChange={(newValue) => {
                    setNomeFantasia(newValue)
                }}
                icon={<PiBuildingLight size={22}/>}
            />
        </InputWrapper>
    </>

    const pessoaFisicaFields = <>
        <InputWrapper>
            <CriarNoticiaInformacoesBasicasInputField
                titulo={'CPF *'}
                subtitulo={''}
                minLength={14}
                errorMessage={'CPF inválido'}
                type={'text'}
                value={cpf != null ? cpf.toString() : ''}
                onChange={(newValue) => {
                    handleCpfChange(newValue)
                }}
                icon={<AiOutlineIdcard size={22}/>}
            />
            <CriarNoticiaInformacoesBasicasInputField
                titulo={'RG *'}
                subtitulo={''}
                minLength={12}
                errorMessage={'RG inválido'}
                value={rg != null ? rg.toString() : ''}
                type={'text'}
                onChange={(newValue) => {
                    handleRgChange(newValue)
                }}
                icon={<AiOutlineIdcard size={22}/>}
            />
        </InputWrapper>
    </>
    return (
        <form
            ref={formRef}
            className={'flex flex-col items-center h-auto overflow-hidden mb-5 rounded-b-lg'}>
            <div
                className={'w-full mx-36 dark:border-none dark:bg-customDarkFooter border  py-10 px-12 flex flex-col gap-8'}>
                {pessoa.categoria == 'Física' ? pessoaFisicaFields : pessoaJuridicaFields}
                {enderecoFields}
                <CriarPessoaFormControls currentScreenIndex={currentScreenIndex} submitForm={submitForm}
                                         setScreenIndex={setScreenIndex}/>
            </div>
        </form>)

};

const InputWrapper: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return <div className={'flex justify-between w-full gap-14'}>
        {children}
    </div>
}


export default CriarPessoaDetalhes;
