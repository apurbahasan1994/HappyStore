export interface ICreateProduct {
    name: string;
    price: number;
    description?: string;
    richDescription?: string;
    image?: string;
    images?: string[];
    brand?: string;
    countInStock?: number;
    rating?: number;
    isFeatured?: boolean
}

export interface ICreateProductWithCategory  extends ICreateProduct {
    categoryId:number;
}

