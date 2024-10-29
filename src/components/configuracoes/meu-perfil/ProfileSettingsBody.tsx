import React from "react";
import {Avatar} from "@nextui-org/avatar";
import {EditIcon} from "@nextui-org/shared-icons";
import {Button, Input} from "@nextui-org/react";
import {User} from "@prisma/client";
import {fallbackImgUrl} from "@/constants/messages/images";

interface ProfileSettingsBodyProps {
    user: User;
}

const InformationDisplay: React.FC<{ title: string, value?: string }> = ({title, value}) => {
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
            <p className={'text-2xl font-semibold'}>Meu Perfil</p>
            <div className={'my-6 border rounded-lg p-6 flex gap-4 justify-between items-center'}>
                <div className={'flex gap-8 items-center'}>
                    <Avatar
                        src={user.image ?? fallbackImgUrl}
                        className="w-24 h-24 text-large"/>
                    <div className={'flex flex-col gap-1'}>
                        <p className={'font-semibold text-2xl'}>{user.name}</p>
                        <p className={'text-gray-600 text-lg'}>AgroTech Corp</p>
                        <p className={'text-gray-600'}>São Paulo, Brasil</p>
                    </div>
                </div>
            </div>
            <div className={'my-6 flex-col border rounded-lg p-6 flex gap-4 justify-between'}>
                <div className={'flex justify-between w-full items-center'}>
                    <p className={'text-2xl font-semibold'}>Informações Pessoais</p>
                </div>
                <div className={'my-5 w-1/2 flex gap-12'}>
                    <InformationDisplay title={'Email'} value={user.email ?? undefined}/>
                    <InformationDisplay title={'Celular'} value='14532583272387'/>
                </div>
                <div className={'flex justify-between w-full items-center'}>
                    <p className={'text-2xl font-semibold'}>Endereço</p>
                </div>
                <div className={'my-5 w-1/2 flex gap-12'}>
                    <div className={'flex flex-col gap-4 w-1/2'}>
                        <InformationDisplay title={'País'} value={user.email ?? undefined}/>
                        <InformationDisplay title={'CEP'} value={user.email ?? undefined}/>
                    </div>
                    <div className={'flex flex-col gap-4 w-1/2'}>
                        <InformationDisplay title={'Estado'} value={user.email ?? undefined}/>
                        <InformationDisplay title={'Cidade'} value={user.email ?? undefined}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSettingsBody;