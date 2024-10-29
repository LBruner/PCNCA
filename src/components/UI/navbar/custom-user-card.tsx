'use client';
import React from "react";
import {User} from "@prisma/client";
import CustomUserCardBody from "@/components/UI/navbar/custom-user-card-body";

interface CustomUserCardProps {
    user?: User;
}

const CustomUserCard: React.FC<CustomUserCardProps> = ({user}) => {
    return (
        <CustomUserCardBody user={user}/>
    )
}

export default CustomUserCard;
