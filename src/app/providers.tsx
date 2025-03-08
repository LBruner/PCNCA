'use client';

import React from "react";
import {SessionProvider} from "next-auth/react";
import {HeroUIProvider} from "@heroui/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({children}: ProvidersProps) {
    return (
        <SessionProvider>
            <HeroUIProvider className={''}>
                <NextThemesProvider attribute="class" defaultTheme="dark">
                {children}
                </NextThemesProvider>
            </HeroUIProvider>
        </SessionProvider>
    );
}