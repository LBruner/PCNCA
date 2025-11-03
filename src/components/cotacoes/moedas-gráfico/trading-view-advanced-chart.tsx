'use client';
import React, {useEffect, useRef} from 'react';
import {useTheme} from "next-themes";

interface TradingViewChartWidgetProps {
    symbol: string;
    interval: string;
    timezone?: string;
    theme?: string;
    style?: string;
    locale?: string;
    withDateRanges?: boolean;
    allowSymbolChange?: boolean;
    calendar?: boolean;
    supportHost?: string;
    showSymbol?: boolean;
}

const TradingViewAdvancedChartWidget: React.FC<TradingViewChartWidgetProps> = (
    {
        symbol,
        interval,
        timezone = 'America/Sao_Paulo',
        style = '2',
        locale = 'br',
        withDateRanges = true,
        allowSymbolChange = false,
        calendar = false,
        showSymbol = false,
        supportHost = 'https://www.tradingview.com',
    }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const {theme} = useTheme(); // Get the current theme

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.innerHTML = '';

            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
            script.type = 'text/javascript';
            script.async = true;
            script.innerHTML = JSON.stringify({
                autosize: true,
                symbol,
                interval,
                timezone,
                theme: theme === 'dark' ? 'dark' : 'light',
                style,
                locale,
                withDateRanges,
                gridColor: "rgba(242, 242, 242, 0)",
                allowSymbolChange,
                calendar,
                supportHost,
                hide_top_toolbar: true,
                hide_volume: true,
                hide_legend: !showSymbol
            });

            containerRef.current.appendChild(script);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [
        symbol,
        showSymbol,
        interval,
        timezone,
        theme,
        style,
        locale,
        withDateRanges,
        allowSymbolChange,
        calendar,
        supportHost,
    ]);

    return (
        <div className="tradingview-widget-container" ref={containerRef} style={{height: '100%', width: '100%'}}>
            <div className="tradingview-widget-container__widget" style={{height: 'calc(100% - 32px)', width: '100%'}}/>
        </div>
    );
};

export default TradingViewAdvancedChartWidget;
