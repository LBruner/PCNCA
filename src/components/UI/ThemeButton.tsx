'use client';

import React from "react";
import {WiDaySunny} from "react-icons/wi";
import {useTheme} from "next-themes";
import {MdOutlineDarkMode} from "react-icons/md";

const ThemeButton: React.FC = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    const toggleTheme = () => {
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div>
            {currentTheme === 'light' && (
                <WiDaySunny
                    onClick={toggleTheme}
                    className={'hover:cursor-pointer'}
                    color={'black'}
                    size={30}
                />
            )}
            {currentTheme === 'dark' && (
                <MdOutlineDarkMode
                    onClick={toggleTheme}
                    className={'hover:cursor-pointer'}
                    color={'white'}
                    size={30}
                />
            )}
        </div>
    );
};

export default ThemeButton;