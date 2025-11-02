'use client';

import React, { useMemo } from "react";
import { SessionProvider } from "next-auth/react";
import { HeroUIProvider } from "@heroui/react";
import dynamic from "next/dynamic";
import { CartProvider } from "./context/CartContext";

interface ProvidersProps {
    children: React.ReactNode;
}

const ThemeProvider = dynamic(
    () => import("@/providers/ThemeProvider"),
    { ssr: false }
);

export default function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <HeroUIProvider className={''}>
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <CartProvider>
                        {children}
                    </CartProvider>
                </ThemeProvider>
            </HeroUIProvider>
        </SessionProvider>
    );
}