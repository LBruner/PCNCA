export interface NoticiaBasica {
    titulo: string;
    subtitulo: string;
    imagemLink: string | null;
    idCultura: number;
    descricao?: string;
}