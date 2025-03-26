'use client';

import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';

const TradingViewWidgetBoiGordo = () => {
    const { theme } = useTheme(); // Get the current theme

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
        script.async = true;

        // Set the colorTheme based on the resolved theme
        script.innerHTML = JSON.stringify({
            "symbol": "BGI1!",
            "width": "100%",
            "isTransparent": true,
            // "colorTheme": theme === 'dark' ? 'dark' : 'light',
            "locale": "br"
        });

        const widgetContainer = document.getElementById('tradingview-widget-container-boi');
        if (widgetContainer) {
            // Clear any existing script
            widgetContainer.innerHTML = '';
            // Append the new script
            widgetContainer.appendChild(script);
        }

        // Cleanup function to remove the script when the component unmounts
        return () => {
            if (widgetContainer && widgetContainer.contains(script)) {
                widgetContainer.removeChild(script);
            }
        };
    }, [theme]);

    return (
        <div
            key={theme}
            className={`pointer-events-none w-full tradingview-widget-container rounded-lg shadow-lg overflow-hidden dark:invert`}
            id="tradingview-widget-container-boi"
        >
            <div className="tradingview-widget-container__widget w-full"></div>
        </div>
    );
};

export default TradingViewWidgetBoiGordo;