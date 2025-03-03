export function capitalizeFirstLetter(str: string) {
    const lowerCaseStr = str.toLowerCase();

    return lowerCaseStr.charAt(0).toUpperCase() + lowerCaseStr.slice(1);
}

export const formatToBrazilianCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

export function formatarData(data: Date) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

export const formatPhoneNumber = (value: string): string => {
    const cleanedValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cleanedValue.length <= 2) {
        return `(${cleanedValue}`;
    } else if (cleanedValue.length <= 6) {
        return `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2)}`;
    } else if (cleanedValue.length <= 10) {
        return `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2, 6)}-${cleanedValue.slice(6)}`;
    } else {
        return `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2, 7)}-${cleanedValue.slice(7, 11)}`;
    }
};


export const formatCPF = (value: string): string => {
    const cleanedValue = value.replace(/\D/g, '');

    if (cleanedValue.length <= 3) {
        return cleanedValue;
    } else if (cleanedValue.length <= 6) {
        return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3)}`;
    } else if (cleanedValue.length <= 9) {
        return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3, 6)}.${cleanedValue.slice(6)}`;
    } else {
        return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3, 6)}.${cleanedValue.slice(6, 9)}-${cleanedValue.slice(9, 11)}`;
    }
};

export const formatRG = (value: string): string => {
    const cleanedValue = value.replace(/\D/g, '');

    if (cleanedValue.length <= 2) {
        return cleanedValue;
    } else if (cleanedValue.length <= 5) {
        return `${cleanedValue.slice(0, 2)}.${cleanedValue.slice(2)}`;
    } else if (cleanedValue.length <= 8) {
        return `${cleanedValue.slice(0, 2)}.${cleanedValue.slice(2, 5)}.${cleanedValue.slice(5)}`;
    } else {
        return `${cleanedValue.slice(0, 2)}.${cleanedValue.slice(2, 5)}.${cleanedValue.slice(5, 8)}-${cleanedValue.slice(8, 9)}`;
    }
};

export const formatCEP = (value: string): string => {
    const cleanedValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos.

    if (cleanedValue.length <= 5) {
        return cleanedValue; // Exibe diretamente se tiver até 5 dígitos.
    } else {
        return `${cleanedValue.slice(0, 5)}-${cleanedValue.slice(5, 8)}`; // Formata como XXXXX-XXX.
    }
};

export const formatCNPJ = (value: string): string => {
    const cleanedValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos.

    if (cleanedValue.length <= 2) {
        return cleanedValue; // Exibe diretamente se tiver até 2 dígitos.
    } else if (cleanedValue.length <= 5) {
        return `${cleanedValue.slice(0, 2)}.${cleanedValue.slice(2)}`; // Formata como XX.XXX.
    } else if (cleanedValue.length <= 8) {
        return `${cleanedValue.slice(0, 2)}.${cleanedValue.slice(2, 5)}.${cleanedValue.slice(5)}`; // Formata como XX.XXX.XXX.
    } else if (cleanedValue.length <= 12) {
        return `${cleanedValue.slice(0, 2)}.${cleanedValue.slice(2, 5)}.${cleanedValue.slice(5, 8)}/${cleanedValue.slice(8)}`; // Formata como XX.XXX.XXX/XXXX.
    } else {
        return `${cleanedValue.slice(0, 2)}.${cleanedValue.slice(2, 5)}.${cleanedValue.slice(5, 8)}/${cleanedValue.slice(8, 12)}-${cleanedValue.slice(12, 14)}`; // Formata como XX.XXX.XXX/XXXX-XX.
    }
};

export const formatInscricaoEstadual = (value: string): string => {
    const cleanedValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos.

    const limitedValue = cleanedValue.slice(0, 12);

    if (limitedValue.length <= 3) {
        return limitedValue; // Exibe diretamente se tiver até 3 dígitos.
    } else if (limitedValue.length <= 6) {
        return `${limitedValue.slice(0, 3)}.${limitedValue.slice(3)}`; // Formata como XXX.XXX.
    } else if (limitedValue.length <= 9) {
        return `${limitedValue.slice(0, 3)}.${limitedValue.slice(3, 6)}.${limitedValue.slice(6)}`; // Formata como XXX.XXX.XXX.
    } else {
        return `${limitedValue.slice(0, 3)}.${limitedValue.slice(3, 6)}.${limitedValue.slice(6, 9)}.${limitedValue.slice(9, 12)}`; // Formata como XXX.XXX.XXX-XX.
    }
};


export const formatNumber = (number: number) => {
    if (isNaN(number))
        number = 0;
    return number.toLocaleString('pt-BR', {minimumFractionDigits: 2});
};

export const parseStringToFloat = (str: string) => {
    return parseFloat(str.replace(',', '.'));
};
