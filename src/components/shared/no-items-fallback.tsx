import React from 'react';
import {CardContent} from "@mui/material";
import {Button, Card} from "@heroui/react";
import {BiFolder} from "react-icons/bi";

interface NoItemsProps {
    onCreateClick: () => void;
    title: string;
    description: string;
    buttonText?: string;
    showButton: boolean;
}

const NoItemsFallback: React.FC<NoItemsProps> = ({title, buttonText, showButton, description, onCreateClick}) => {
    return (
        <Card className="w-full max-w-md mx-auto my-8">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-gray-100 p-4 mb-4">
                    <BiFolder className="w-8 h-8 text-gray-400"/>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {title}
                </h3>
                <p className="text-gray-500 mb-6 max-w-xs">
                    {description}
                </p>
                {showButton &&
                    <Button
                        onPress={onCreateClick}
                        className="flex items-center gap-2"
                    >
                        {buttonText}
                    </Button>
                }
            </CardContent>
        </Card>
    );
};

export default NoItemsFallback;