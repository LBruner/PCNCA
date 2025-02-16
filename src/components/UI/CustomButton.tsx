import React from "react";
import Link from "next/link";

interface ButtonProps {
    url: string;
    className?: string;
    icon?: React.ReactNode;
    title: string;
    onClick?: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({className, icon, onClick, url, title,}) => {
    return (
        <Link href={url}>
            <button
                onClick={onClick}
                className={`border-2 inline-flex items-center px-6 py-3  font-semibold rounded-lg transition-colors w-full md:w-auto justify-center ${className}`}>
                {icon}
                {title}
            </button>
        </Link>
    )
}

export default CustomButton;