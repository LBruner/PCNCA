'use client';
import React, {useRef, useState} from "react";
import CriarNoticiaInformacoesBasicasInputField
    from "@/components/noticias/criacao/criar-noticia-informacoes-basicas-input-field";
import CriarNoticiaInformacoesBasicasSelectField
    from "@/components/noticias/criacao/criar-noticia-informacoes-basicas-select-field";
import {formatCEP, formatCNPJ, formatCPF, formatInscricaoEstadual, formatRG} from "@/helpers";
import CriarPessoaFormControls from "@/components/pessoas/criar/CriarPessoaFormControls";
import {Pessoa, TipoPessoa} from "@prisma/client";
import {PiBuildingLight, PiCity, PiTrademark} from "react-icons/pi";
import {CiLocationOn, CiMap} from "react-icons/ci";
import {AiOutlineIdcard} from "react-icons/ai";


interface PessoaFormProps {
    pessoaBasica: Pessoa;
    pessoaCompleta: any;
    setPessoaPessoaCompleta: React.Dispatch<any>;
    currentScreenIndex: number;
    setScreenIndex: React.Dispatch<React.SetStateAction<number>>;
    tiposPessoa: TipoPessoa[];
}

const CriarPessoaDetalhes: React.FC<PessoaFormProps> = (props) => {
    const {
        tiposPessoa,
        currentScreenIndex,
        setScreenIndex,
        setPessoaPessoaCompleta,
        pessoaBasica,
        pessoaCompleta
    } = props;

    const [cep, setCep] = useState(pessoaCompleta?.cep ?? '');
    const [endereco, setEndereco] = useState(pessoaCompleta?.endereco ?? '');
    const [cidade, setCidade] = useState(pessoaCompleta?.cidade ?? '');
    const [estado, setEstado] = useState(pessoaCompleta?.estado ?? '');
    const [cnpj, setCnpj] = useState(pessoaCompleta?.cnpj ?? '')
    const [inscricaoEstadual, setInscricaoEstadual] = useState(pessoaCompleta?.inscricaoEstadual ?? '')
    const [nomeFantasia, setNomeFantasia] = useState(pessoaCompleta?.nomeFantasia ?? '')
    const [rg, setRg] = useState(pessoaCompleta?.rg ?? '')
    const [tipoPessoa, setTipoPessoa] = useState(pessoaCompleta?.tipo ?? '')
    const [cpf, setCpf] = useState(pessoaCompleta?.cpf ?? null)

    const formRef = useRef<HTMLFormElement>(null);

    const submitForm = () => {

        if (!formRef.current!.reportValidity()) {
            formRef.current!.reportValidity();
            return;
        }

        setPessoaPessoaCompleta({
            nome: pessoaBasica.nome,
            email: pessoaBasica.email,
            contato: pessoaBasica.contato,
            tipo: tipoPessoa,
            cpf: cpf,
            rg: rg,
            cep: cep,
            endereco: endereco,
            cidade: cidade,
            estado: estado,
            dataNascimento: pessoaBasica.dataNascimento,
            imagem: pessoaBasica.imagem,
            categoria: pessoaBasica.categoria,
            razaoSocial: pessoaBasica.razaoSocial,
            cnpj: cnpj,
            inscricaoEstadual: inscricaoEstadual,
            nomeFantasia: nomeFantasia,
        });
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
                subtitulo={''} value={cep}
                type={'text'}
                onChange={(newValue) => {
                    handleCepChange(newValue);
                }}
                icon={<CiLocationOn size={22}/>}
            />
            <CriarNoticiaInformacoesBasicasInputField
                titulo={'Endereço *'}
                subtitulo={''} value={endereco}
                type={'text'}
                onChange={(newValue) => {
                    setEndereco(newValue)
                }}
                icon={<CiMap size={22}/>}
            />
        </InputWrapper>
        <InputWrapper>
            <CriarNoticiaInformacoesBasicasInputField
                titulo={'Cidade *'}
                subtitulo={''} value={cidade}
                onChange={(newValue) => {
                    setCidade(newValue)
                }}
                icon={<PiCity size={22}/>}
            />
            <CriarNoticiaInformacoesBasicasSelectField
                titulo={'Estado *'} valor={estado}
                placeholder={''}
                subtitulo={''}
                collection={[
                    "Acre",
                    "Alagoas",
                    "Amapá",
                    "Amazonas",
                    "Bahia",
                    "Ceará",
                    "Distrito Federal",
                    "Espírito Santo",
                    "Goiás",
                    "Maranhão",
                    "Mato Grosso",
                    "Mato Grosso do Sul",
                    "Minas Gerais",
                    "Pará",
                    "Paraíba",
                    "Paraná",
                    "Pernambuco",
                    "Piauí",
                    "Rio de Janeiro",
                    "Rio Grande do Norte",
                    "Rio Grande do Sul",
                    "Rondônia",
                    "Roraima",
                    "Santa Catarina",
                    "São Paulo",
                    "Sergipe",
                    "Tocantins"
                ]}
                onChange={(novoEstado) => {
                    setEstado(novoEstado)
                }}
            />
        </InputWrapper>
    </>

    const pessoaJuridicaFields = <>
        <InputWrapper>
            <CriarNoticiaInformacoesBasicasInputField
                titulo={'CNPJ *'}
                subtitulo={''}
                value={cnpj}
                type={'text'}
                onChange={(newValue) => {
                    handleCnpjChange(newValue)
                }}
                icon={<AiOutlineIdcard size={22}/>}
            />
            <CriarNoticiaInformacoesBasicasSelectField
                titulo={'Tipo'} valor={tipoPessoa}
                placeholder={''}
                subtitulo={``}
                collection={tiposPessoa.map(item => item.nome)}
                onChange={(novoTipoPessoa) => {
                    setTipoPessoa(novoTipoPessoa)
                }}
            />
        </InputWrapper>
        <InputWrapper>
            <CriarNoticiaInformacoesBasicasInputField
                titulo={'Inscrição Estadual *'}
                subtitulo={''}
                type={'text'}
                value={inscricaoEstadual}
                onChange={(newValue) => {
                    handleInscricaoEstadualChange(newValue)
                }}
                icon={<PiTrademark size={22}/>}
            />
            <CriarNoticiaInformacoesBasicasInputField
                titulo={'Nome Fantasia'}
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
                type={'text'}
                value={cpf}
                onChange={(newValue) => {
                    handleCpfChange(newValue)
                }}
                icon={<AiOutlineIdcard size={22}/>}
            />
            <CriarNoticiaInformacoesBasicasInputField
                titulo={'RG'}
                subtitulo={''}
                value={rg}
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
            className={'flex flex-col items-center pt-8 h-auto overflow-hidden mb-5'}>
            <div
                className={'w-full mx-36 border rounded-lg py-10 px-12 flex flex-col gap-8'}>
                {enderecoFields}
                {pessoaBasica.categoria === 'Física' ? pessoaFisicaFields : pessoaJuridicaFields}
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
