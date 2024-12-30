import React from "react";
import {Avatar} from "@nextui-org/avatar";
import {Pessoa} from "@prisma/client";
import {fallbackImgUrl} from "@/constants/messages/images";
import {formatarData, formatCEP, formatCNPJ, formatCPF, formatPhoneNumber} from "@/helpers";

interface ProfileSettingsBodyProps {
    user: Pessoa;
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
    return (
        <div className={'w-full'}>
            <div className={'my-2 border rounded-lg p-6 flex flex-col gap-4 justify-start items-start'}>
                <p className={'text-2xl font-semibold'}>Perfil</p>
                <div className={'flex gap-8 items-center'}>
                    <Avatar
                        src={user.imagem ?? fallbackImgUrl}
                        className="w-24 h-24 text-large"/>
                    <div className={'flex flex-col gap-1'}>
                        <p className={'font-semibold text-2xl'}>{user.nome ?? 'Maria Clara'}</p>
                        <p className={'text-gray-600 text-lg'}>{formatarData(user.dataNascimento) ?? 'Sem data de nascimento'}</p>
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
                                <InformationDisplay title={'Email'} value={user.email ?? undefined}/>
                                <InformationDisplay title={'Celular'} value={formatPhoneNumber(user.contato) ?? 'Sem celular'}/>
                            </div>
                            <div className={'flex gap-12 items-start'}>
                                {user.categoria == 'Jurídica' && user.razaoSocial &&
                                    <InformationDisplay title={'Razão Social'}
                                                        value={user.razaoSocial ?? 'Sem Razão Social'}/>}
                                {user.categoria == 'Jurídica' && user.inscricaoEstadual &&
                                    <InformationDisplay title={'Inscrição Estadual'}
                                                        value={user.inscricaoEstadual ?? 'Sem Inscrição Estadual'}/>}
                            </div>
                            <div className={'flex gap-12'}>
                                {user.categoria == 'Jurídica' && user.nomeFantasia &&
                                    <InformationDisplay title={'Nome Fantasia'}
                                                        value={user.cnpj ?? 'Sem Nome Fantasia'}/>}
                                {user.categoria == 'Jurídica' && user.cnpj &&
                                    <InformationDisplay title={'CNPJ'} value={formatCNPJ(user.cnpj) ?? 'Sem CNPJ'}/>}
                            </div>
                            <div className={'flex gap-12'}>
                                {user.categoria == 'Física' && user.cpf &&
                                    <InformationDisplay title={'CPF'} value={formatCPF(user.cpf) ?? 'Sem CPF'}/>}
                                {user.categoria == 'Física' && user.rg &&
                                    <InformationDisplay title={'RG'} value={user.rg ?? 'Sem RG'}/>}
                            </div>
                        </div>
                    </div>
                    <div className={'flex flex-col gap-4 w-1/2 h-64'}>
                        <div className={'flex justify-between w-full items-center'}>
                            <p className={'text-2xl font-semibold'}>Localização</p>
                        </div>
                        <div className={' flex flex-col gap-12'}>
                            <div className={'flex gap-12'}>
                                <InformationDisplay title={'Endereço'} value={user.endereco ?? 'Sem endereço'}/>
                                <InformationDisplay title={'CEP'} value={formatCEP(user.cep) ?? 'Sem CEP'}/>
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