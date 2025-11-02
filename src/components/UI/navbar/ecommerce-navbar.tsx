import { pegaUsuario } from "@/actions/usuarios";
import React from 'react';
import EcommerceNavbarBody from './ecommerce-navbar-body';

const EcommerceNavbar: React.FC = async () => {
    const user = await pegaUsuario()

    return (
        <>
            <EcommerceNavbarBody user={user ?? undefined}/>
        </>
    )
};

export default EcommerceNavbar;
