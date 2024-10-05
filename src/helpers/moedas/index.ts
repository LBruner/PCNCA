export type Currency = {
    key: number;
    label: string;
    code: string;
}

export const currencies: Currency[] = [
    {key: 0, label: 'USD - Dólar Americano', code: 'us'},
    {key: 19, label: 'BRL - Real Brasileiro', code: 'br'},
    {key: 1, label: 'EUR - Euro', code: 'eu'},
    {key: 2, label: 'JPY - Iene Japonês', code: 'jp'},
    {key: 3, label: 'GBP - Libra Esterlina', code: 'gb'},
    {key: 4, label: 'AUD - Dólar Australiano', code: 'au'},
    {key: 5, label: 'CAD - Dólar Canadense', code: 'ca'},
    {key: 6, label: 'CHF - Franco Suíço', code: 'ch'},
    {key: 7, label: 'CNY - Yuan Chinês', code: 'cn'},
    {key: 8, label: 'HKD - Dólar de Hong Kong', code: 'hk'},
    {key: 9, label: 'NZD - Dólar Neozelandês', code: 'nz'},
    {key: 10, label: 'SEK - Coroa Sueca', code: 'se'},
    {key: 11, label: 'KRW - Won Sul-Coreano', code: 'kr'},
    {key: 12, label: 'SGD - Dólar de Singapura', code: 'sg'},
    {key: 13, label: 'NOK - Coroa Norueguesa', code: 'no'},
    {key: 14, label: 'MXN - Peso Mexicano', code: 'mx'},
    {key: 15, label: 'INR - Rupia Indiana', code: 'in'},
    {key: 16, label: 'RUB - Rublo Russo', code: 'ru'},
    {key: 17, label: 'ZAR - Rand Sul-Africano', code: 'za'},
    {key: 18, label: 'TRY - Lira Turca', code: 'tr'},
];