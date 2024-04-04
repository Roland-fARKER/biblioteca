export interface LibroEntitie{
    idLibro: number;
    nombreLibro: string;
    autorLibro: string;
    editorialLibro?: string;
    idCategoria?: number;
    anioPublicacion?: number;
    nombreCategoria?: string;  
    ejemplaresDisponible: number;
}