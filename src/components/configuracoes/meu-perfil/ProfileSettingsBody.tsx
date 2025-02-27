import React from "react";
import {Avatar} from "@heroui/avatar";
import {fallbackImgUrl} from "@/constants/messages/images";
import {formatarData, formatCEP, formatCNPJ, formatCPF, formatPhoneNumber} from "@/helpers";
import {PessoaCriacao} from "@/actions/pessoas";

interface ProfileSettingsBodyProps {
    user: PessoaCriacao;
}

export const InformationDisplay: React.FC<{ title: string, value?: string }> = ({title, value}) => {
    return (
        <div className={'flex flex-col gap-4 w-1/2'}>
            <div className={'flex flex-col gap-4 w-1/2'}>
                <p className={'font-semibold'}>{title}</p>
                <p>{value ?? 'Indisponível'}</p>
            </div>
        </div>
    )
}

const ProfileSettingsBody: React.FC<ProfileSettingsBodyProps> = ({user}) => {
    const usuarioPessoaFisica = user.cnpj == null;

    return (
        <div className={'w-full'}>
            <div className={'my-2 border rounded-lg p-6 flex flex-col gap-4 justify-start items-start'}>
                <p className={'text-2xl font-semibold'}>Perfil</p>
                <div className={'flex gap-8 items-center'}>
                    <Avatar
                        src={user.imagemLink ?? fallbackImgUrl}
                        className="w-24 h-24 text-large"/>
                    <div className={'flex flex-col gap-1'}>
                        <p className={'font-semibold text-2xl'}>{user?.nome ?? 'Maria Clara'}</p>
                        <p className={'text-gray-600 text-lg'}>{user.email}</p>
                        <p className={'text-gray-600'}>{user.cidade != null ? `${user.cidade}, Brasil` : 'São Paulo, Brasil'}</p>
                    </div>
                </div>
            </div>
            <div className={'flex w-full h-auto'}>
            <div className={'h-auto my-2 w-full border rounded-lg p-6 flex gap-5'}>
                    <div className={'flex flex-col gap-4 w-1/2 justify-start'}>
                        <div className={'flex justify-between items-center'}>
                            <p className={'text-2xl font-semibold'}>Informações Pessoais</p>
                        </div>
                        <div className={' flex flex-col gap-2'}>
                            <div className={'flex gap-12'}>
                                <InformationDisplay title={'Data nascimento'} value={usuarioPessoaFisica ? formatarData(new Date(user?.dataNascimento!)) : 'Sem data de nascimento' }/>
                                <InformationDisplay title={'Celular'} value={formatPhoneNumber(user?.telefone!.toString()!) ?? 'Sem celular'}/>
                            </div>
                            <div className={'flex gap-12 items-start'}>
                                {!usuarioPessoaFisica && user?.razaoSocial &&
                                    <InformationDisplay title={'Razão Social'}
                                                        value={user?.razaoSocial ?? 'Sem Razão Social'}/>}
                                {!usuarioPessoaFisica && user?.inscricaoEstadual &&
                                    <InformationDisplay title={'Inscrição Estadual'}
                                                        value={user?.inscricaoEstadual.toString() ?? 'Sem Inscrição Estadual'}/>}
                            </div>
                            <div className={'flex gap-12'}>
                                {usuarioPessoaFisica && user?.nomeFantasia &&
                                    <InformationDisplay title={'Nome Fantasia'}
                                                        value={user?.cnpj!.toString() ?? 'Sem Nome Fantasia'}/>}
                                {usuarioPessoaFisica && user?.cnpj &&
                                    <InformationDisplay title={'CNPJ'} value={formatCNPJ(user?.cnpj.toString()) ?? 'Sem CNPJ'}/>}
                            </div>
                            <div className={'flex gap-12'}>
                                {usuarioPessoaFisica && user?.cpf &&
                                    <InformationDisplay title={'CPF'} value={formatCPF(user?.cpf.toString()) ?? 'Sem CPF'}/>}
                                {usuarioPessoaFisica && user?.rg &&
                                    <InformationDisplay title={'RG'} value={user?.rg.toString() ?? 'Sem RG'}/>}
                            </div>
                        </div>
                    </div>
                    <div className={'flex flex-col gap-4 w-1/2 h-64'}>
                        <div className={'flex justify-between w-full items-center'}>
                            <p className={'text-2xl font-semibold'}>Localização</p>
                        </div>
                        <div className={' flex flex-col gap-12'}>
                            <div className={'flex gap-12'}>
                                <InformationDisplay title={'Endereço'} value={user.cidade ?? 'Sem endereço'}/>
                                <InformationDisplay title={'CEP'} value={formatCEP(user.cep!.toString()!) ?? 'Sem CEP'}/>
                            </div>
                            <div className={'flex gap-12'}>
                                <InformationDisplay title={'Estado'} value={user.estado ?? 'Sem estado'}/>
                                <InformationDisplay title={'Cidade'} value={user.cidade ?? 'Sem cidade'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSettingsBody;