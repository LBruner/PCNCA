import React from 'react';
import CustomNavbarBody from "@/components/UI/navbar/custom-navbar-body";
import {getServerSession} from "next-auth";
import {getCurrentUser} from "@/actions/usuarios";
import {getPathname} from "next/dist/lib/url";
import {usePathname} from "next/navigation";

const CustomNavbar: React.FC = async() => {
    const user = await getCurrentUser()
    console.log(user)
    //TODO : fix this

    return (
        <CustomNavbarBody user={user ?? undefined}/>
    )
};

export default CustomNavbar;
