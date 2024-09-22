export function getFullMonthName(monthAbbreviation:string) {
    switch (monthAbbreviation) {
        case 'Jan':
            return 'Janeiro';
        case 'Fev':
            return 'Fevereiro';
        case 'Mar':
            return 'Março';
        case 'Abr':
            return 'Abril';
        case 'Mai':
            return 'Maio';
        case 'Jun':
            return 'Junho';
        case 'Jul':
            return 'Julho';
        case 'Ago':
            return 'Agosto';
        case 'Set':
            return 'Setembro';
        case 'Out':
            return 'Outubro';
        case 'Nov':
            return 'Novembro';
        case 'Dez':
            return 'Dezembro';
        default:
            return 'Mês inválido'; // For invalid inputs
    }
}