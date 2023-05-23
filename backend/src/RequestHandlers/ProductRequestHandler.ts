import Product from "../Models/Product";
import { ICreateProduct, ICreateProductWithCategory } from "../RequstDto/ProductDto";
import ProductService from "../Services/Product/ProductService";

export class ProductRequestHandler {

    constructor() { }

    async createProduct(payload: ICreateProduct): Promise<Product> {
        try {
            const product = await ProductService.createProduct(payload);
            return product;
        }
        catch (e) {
            throw e;
        }
    }
    async createProductWithCategories(payload: ICreateProductWithCategory) {
        const { categoryId, ...rest } = payload;

        try {
            const product = await ProductService.createProduct(rest);
            const productWithCategory = ProductService.setProductCategories(product, categoryId);
            return productWithCategory;
        }
        catch (e) {
            throw e;
        }

    }
    async getProductByCategory(id: number): Promise<Product | null> {
        try {
            const product = await ProductService.getProductByCategory(id);
            return product;
        }
        catch (e) {
            throw e;
        }

    }
    async updateProduct(id: number, payload: ICreateProduct): Promise<Product> {
        try {
            const product = await ProductService.updateProduct(id, payload);
            return product;
        }
        catch (e) {
            throw e;
        }
    }
    async deleteProduct(id: number) {
        await ProductService.deleteProduct(id);
    }
    async getAllProducts(): Promise<Product[]> {
        try {
            const products = await ProductService.getAllProducts();
            return products;
        }
        catch (e) {
            throw e;
        }
    }
    async getAllProductsWithCategories(): Promise<Product[]> {
        try {
            const products = await ProductService.getAllProductsWithCategories();
            return products;
        }
        catch (e) {
            throw e;
        }
    }
    async getFeaturedProducts(limit: number): Promise<Product[]> {
        try {
            const products = await ProductService.getFeaturedProducts(limit);
            return products;
        }
        catch (e) {
            throw e;
        }
    }
    async deleteAllProduct() {
    }
    async getProductById(id: number): Promise<Product> {
        try {
            const product = await ProductService.getProductById(id);
            return product;
        }
        catch (e) {
            throw e;
        }
    }

}