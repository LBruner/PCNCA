import React from 'react';
import CustomNavbarBody from "@/components/UI/navbar/custom-navbar-body";
import {getCurrentUser} from "@/actions/usuarios";

const CustomNavbar: React.FC = async() => {
    const user = await getCurrentUser()
    console.log(user)
    //TODO : fix this

    return (
        <CustomNavbarBody user={user ?? undefined}/>
    )
};

export default CustomNavbar;
