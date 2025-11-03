'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes'; // Import useTheme

interface TradingViewWidgetProps {
    symbols?: string[][];
    chartOnly?: boolean;
    locale?: string;
    colorTheme?: string;
    autosize?: boolean;
    showVolume?: boolean;
    width?: string | number;
    height?: string | number;
    timezone?: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = (
    {
        symbols = [
            ['BMFBOVESPA:RAIZ4|1D'],
            ['BMFBOVESPA:BEEF3|1D'],
            ['BMFBOVESPA:SMTO3|1D'],
            ['BMFBOVESPA:SLCE3|1D'],
            ['BMFBOVESPA:TTEN3|1D'],
            ['BMFBOVESPA:KEPL3|1D'],
            ['BMFBOVESPA:SOJA3|1D'],
            ['BMFBOVESPA:CAML3|1D'],
        ],
        chartOnly = false,
        locale = 'br',
        colorTheme = 'light', // Default color theme
        timezone = 'America/Sao_Paulo',
        autosize = true,
        showVolume = false,
        width = '100%',
        height = '100%',
    }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme(); // Get the current theme

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.innerHTML = ''; // Clear the container

            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
            script.type = 'text/javascript';
            script.async = true;

            // Set the colorTheme based on the resolved theme
            const currentColorTheme = resolvedTheme === 'dark' ? 'dark' : 'light';

            script.innerHTML = JSON.stringify({
                symbols,
                chartOnly,
                locale,
                colorTheme: currentColorTheme, // Use dynamic color theme
                autosize,
                showVolume,
                width,
                timezone,
                height,
                scalePosition: 'right',
                fontFamily: '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif',
                fontSize: '10',
                lineWidth: 2,
            });

            containerRef.current.appendChild(script);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = ''; // Cleanup on unmount
            }
        };
    }, [symbols, chartOnly, locale, autosize, showVolume, width, height, resolvedTheme, timezone]); // Add resolvedTheme as a dependency

    return (
        <div className="tradingview-widget-container" ref={containerRef} style={{ height: '100%', width: '100%' }}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
};

export default TradingViewWidget;