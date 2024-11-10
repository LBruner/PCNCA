import React from "react";
import Link from "next/link";

interface ConfiguracoesNavbarItemProps {
    title: string;
    currentPathname: string;
    selectedPathname: string;
}

const ConfiguracoesNavbarItem: React.FC<ConfiguracoesNavbarItemProps> = ({currentPathname,selectedPathname, title}) => {
    return (
        <Link href={selectedPathname}
              className={`flex items-center  py-2 px-4 rounded-xl ${currentPathname === selectedPathname ? 'bg-blue-200 text-blue-600 font-semibold' : ''} w-full `}>
            {title}
        </Link>
    )
}

export default ConfiguracoesNavbarItem;