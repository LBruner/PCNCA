'use client';

import React from "react";
import {SessionProvider} from "next-auth/react";
import {HeroUIProvider} from "@heroui/react";
import dynamic from "next/dynamic";

interface ProvidersProps {
    children: React.ReactNode;
}

const ThemeProvider = dynamic(
    () => import("@/providers/ThemeProvider"),
    { ssr: false }
);

export default function Providers({children}: ProvidersProps) {
    return (
        <SessionProvider>
            <HeroUIProvider className={''}>
                <ThemeProvider attribute="class" defaultTheme="dark">
                {children}
                </ThemeProvider>
            </HeroUIProvider>
        </SessionProvider>
    );
}