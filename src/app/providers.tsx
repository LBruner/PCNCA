'use client';

import React, { useMemo } from "react";
import { SessionProvider } from "next-auth/react";
import { HeroUIProvider } from "@heroui/react";
import dynamic from "next/dynamic";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";

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
                    {children}
                </ThemeProvider>
            </HeroUIProvider>
        </SessionProvider>
    );
}