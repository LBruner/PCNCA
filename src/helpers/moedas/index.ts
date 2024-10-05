export type Currency = {
    key: number;
    label: string;
    flagCode: string;
    currencyCode: string;
}

export const currencies: Currency[] = [
    {key: 0, label: 'USD - Dólar Americano', flagCode: 'us', currencyCode: 'USD'},
    {key: 19, label: 'BRL - Real Brasileiro', flagCode: 'br', currencyCode: 'BRL'},
    {key: 1, label: 'EUR - Euro', flagCode: 'eu', currencyCode: 'EUR'},
    {key: 2, label: 'JPY - Iene Japonês', flagCode: 'jp', currencyCode: 'JPY'},
    {key: 3, label: 'GBP - Libra Esterlina', flagCode: 'gb', currencyCode: 'GBP'},
    {key: 4, label: 'AUD - Dólar Australiano', flagCode: 'au', currencyCode: 'AUD'},
    {key: 5, label: 'CAD - Dólar Canadense', flagCode: 'ca', currencyCode: 'CAD'},
    {key: 6, label: 'CHF - Franco Suíço', flagCode: 'ch', currencyCode: 'CHF'},
    {key: 7, label: 'CNY - Yuan Chinês', flagCode: 'cn', currencyCode: 'CNY'},
    {key: 8, label: 'HKD - Dólar de Hong Kong', flagCode: 'hk', currencyCode: 'HKD'},
    {key: 9, label: 'NZD - Dólar Neozelandês', flagCode: 'nz', currencyCode: 'NZD'},
    {key: 10, label: 'SEK - Coroa Sueca', flagCode: 'se', currencyCode: 'SEK'},
    {key: 11, label: 'KRW - Won Sul-Coreano', flagCode: 'kr', currencyCode: 'KRW'},
    {key: 12, label: 'SGD - Dólar de Singapura', flagCode: 'sg', currencyCode: 'SGD'},
    {key: 13, label: 'NOK - Coroa Norueguesa', flagCode: 'no', currencyCode: 'NOK'},
    {key: 14, label: 'MXN - Peso Mexicano', flagCode: 'mx', currencyCode: 'MXN'},
    {key: 15, label: 'INR - Rupia Indiana', flagCode: 'in', currencyCode: 'INR'},
    {key: 16, label: 'RUB - Rublo Russo', flagCode: 'ru', currencyCode: 'RUB'},
    {key: 17, label: 'ZAR - Rand Sul-Africano', flagCode: 'za', currencyCode: 'ZAR'},
    {key: 18, label: 'TRY - Lira Turca', flagCode: 'tr', currencyCode: 'TRY'},
];
