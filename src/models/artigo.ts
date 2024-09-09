export interface Artigo {
    title: string;
    subtitle: string;
    imageUrl: string | null;
    categoryId: number;
    categoryNome: string;
    authorId?: number;
    status: string;
    thumbnailSubtitle?: string;
}