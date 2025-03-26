'use client';

import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';

const TradingViewWidgetSoja = () => {
    const { theme } = useTheme(); // Get the current theme

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
        script.async = true;

        // Set the colorTheme based on the resolved theme
        script.innerHTML = JSON.stringify({
            "symbol": "SOY1!",
            "width": "100%",
            "isTransparent": true,
            // "colorTheme": theme === 'dark' ? 'dark' : 'light',
            "locale": "br"
        });

        const widgetContainer = document.getElementById('tradingview-widget-container-acucar');
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
    className={`tradingview-widget-container  pointer-events-none rounded-lg shadow-lg overflow-hidden  dark:invert hover:bg-gray-100 w-full`}
    id="tradingview-widget-container-acucar"
    >
    <div className="tradingview-widget-container__widget"></div>
        </div>
);
};

export default TradingViewWidgetSoja;