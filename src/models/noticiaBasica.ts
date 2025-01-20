export interface NoticiaBasica {
    titulo: string;
    subtitulo: string;
    imagemLink: string | null;
    idCultura: number;
    idAutor?: number;
    descricao?: string;
}