'use client';
import React from "react";
import CustomUserCardBody from "@/components/UI/navbar/custom-user-card-body";
import {UsuarioComEmpresa} from "@/actions/usuarios";

interface CustomUserCardProps {
    user?: UsuarioComEmpresa;
    displayDetails?: boolean;
}

const CustomUserCard: React.FC<CustomUserCardProps> = ({user, displayDetails = true}) => {
    return (
        <CustomUserCardBody displayDetails={displayDetails} user={user}/>
    )
}

export default CustomUserCard;
