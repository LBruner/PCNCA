import React from "react";
import ProfileSettingsBody from "@/components/configuracoes/meu-perfil/ProfileSettingsBody";
import {User} from "@prisma/client";

interface ProfileSettingsPageProps {
    user: User
}

const ProfileSettingsPage: React.FC<ProfileSettingsPageProps> = ({user}) => {
    return (
        <div className={'w-full flex justify-center items-center'}>
            <ProfileSettingsBody user={user}/>
        </div>
    )
}

export default ProfileSettingsPage;