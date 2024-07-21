'use client';

import React from "react";
import Link from "next/link";
import {NavbarItem} from "@nextui-org/react";
import {usePathname} from "next/navigation";

interface NavLinkProps {
    text: string,
    path: string,
}

const NavLink: React.FC<NavLinkProps> = ({path, text}) => {
    const pathName = usePathname();
    const isActive = pathName == path;
    return (
        <NavbarItem>
            <Link className={`font-medium drop-shadow-sm ${isActive ? 'text-orange-400' : 'text-gray-800'} text-lg`} href={path}>
                {text}
            </Link>
        </NavbarItem>
    )
}

export default NavLink;