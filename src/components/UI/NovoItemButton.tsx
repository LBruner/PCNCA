import React from "react";
import {Button} from "@nextui-org/react";
import Link from "next/link";

interface NovoItemButtonProps {
    label: string;
    href: string;
    icon: React.ReactNode;
}

const NovoItemButton: React.FC<NovoItemButtonProps> = ({icon, href, label}) => {
    return (
        <Link href={href}>
            <Button size={'md'} className={'w-56'} variant={'flat'} color={'warning'}
                    startContent={icon}>
                <p className={'text-md font-bold text-warning-500'}>{label}</p>
            </Button>
        </Link>
    )
}

export default NovoItemButton;