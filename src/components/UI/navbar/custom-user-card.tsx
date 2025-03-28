'use client';
import React from "react";
import CustomUserCardBody from "@/components/UI/navbar/custom-user-card-body";
import {UsuarioComEmpresa} from "@/actions/usuarios";

interface CustomUserCardProps {
    user?: UsuarioComEmpresa;
}

const CustomUserCard: React.FC<CustomUserCardProps> = ({user}) => {
    return (
        <CustomUserCardBody user={user}/>
    )
}

export default CustomUserCard;
