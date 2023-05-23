export interface ProdutCreateResDto{
    id: number;
    name: string;
    price: number;
    description?: string;
    richDescription?: string;
    image?: string;
    images?: string[];
    brand?: string;
    countInStock?: number;
    rating?: number;
    isFeatured?: boolean;
}