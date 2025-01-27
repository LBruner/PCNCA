import React from 'react';
import CustomNavbarBody from "@/components/UI/navbar/custom-navbar-body";
import {pegaUsuario} from "@/actions/usuarios";

const CustomNavbar: React.FC = async () => {
    const user = await pegaUsuario()

    return (
        <>
            <CustomNavbarBody user={user ?? undefined}/>
        </>
    )
};

export default CustomNavbar;
