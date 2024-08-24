'use client';

import {NextUIProvider} from "@nextui-org/react";
import React from "react";
import {SessionProvider} from "next-auth/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({children}: ProvidersProps) {
    return (
        <SessionProvider>
            <NextUIProvider className={'bg-slate-50 h-screen'}>
                {/*<NextThemesProvider attribute="class" defaultTheme="light">*/}
                {children}
                {/*</NextThemesProvider>*/}
            </NextUIProvider>
        </SessionProvider>
    );
}