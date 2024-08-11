'use client';

import React, {memo, useEffect, useRef} from 'react';

interface TradingViewSingleQuoteProps {
    symbol?: string;
    width?: number | string;
    isTransparent?: boolean;
    colorTheme?: string;
    locale?: string;
    fontSize?: string;
}

const TradingViewSingleQuote: React.FC<TradingViewSingleQuoteProps> = memo((
    {
        symbol = 'FX_IDC:USDBRL',
        width = '100%',
        isTransparent = false,
        colorTheme = 'light',
        locale = 'pt',
        fontSize = '14px',
    }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = JSON.stringify({
            symbol,
            width,
            isTransparent,
            colorTheme,
            locale,
        });

        if (containerRef.current) {
            containerRef.current.appendChild(script);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.removeChild(script);
            }
        };
    }, [symbol, width, isTransparent, colorTheme, locale]);

    return (
        <div className="tradingview-widget-container" ref={containerRef}>
            <div className="tradingview-widget-container__widget" style={{fontSize}}/>
        </div>
    );
});

export default TradingViewSingleQuote;