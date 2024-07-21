export const formatNumber = (number: number) => {
    if (isNaN(number))
        number = 0;
    return number.toLocaleString('pt-BR', {minimumFractionDigits: 2});
};

export const parseStringToFloat = (str: string) => {
    return parseFloat(str.replace(',', '.'));
};
