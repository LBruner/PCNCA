import React, { useEffect } from 'react';

const TradingViewWidget = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
        script.async = true;

        script.innerHTML = JSON.stringify({
            "symbol": "FX_IDC:USDBRL",
            "width": "100%",
            "isTransparent": true,
            "colorTheme": "light",
            "locale": "br"
        });

        const widgetContainer = document.getElementById('tradingview-widget-container');
        if (widgetContainer) {
            widgetContainer.appendChild(script);
        }

        return () => {
            if (widgetContainer) {
                widgetContainer.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="tradingview-widget-container" id="tradingview-widget-container">
            <div className="tradingview-widget-container__widget">
            </div>
        </div>
    );
};

export default TradingViewWidget;
