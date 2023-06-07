import { ICategry } from "./Category";

export interface IProduct {
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

