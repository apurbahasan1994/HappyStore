import Product from "../Models/Product";
import { ICreateProduct, ICreateProductWithCategory } from "../RequstDto/ProductDto";
import ProductService, { IProductService } from "../Services/Product/ProductService";

export class ProductRequestHandler {
    private readonly productService :IProductService;

    constructor() { 
        this.productService = new ProductService();
    }

    async createProduct(payload: ICreateProduct): Promise<Product> {
        try {
            const product = await this.productService.createProduct(payload);
            return product;
        }
        catch (e) {
            throw e;
        }
    }
    async createProductWithCategories(payload: ICreateProductWithCategory) {
        const { categoryId, ...rest } = payload;

        try {
            const product = await this.productService.createProduct(rest);
            const productWithCategory = this.productService.setProductCategories(product, categoryId);
            return productWithCategory;
        }
        catch (e) {
            throw e;
        }

    }
    async getProductByCategory(id: number): Promise<Product | null> {
        try {
            const product = await this.productService.getProductByCategory(id);
            return product;
        }
        catch (e) {
            throw e;
        }

    }
    async updateProduct(id: number, payload: ICreateProduct): Promise<Product> {
        try {
            const product = await this.productService.updateProduct(id, payload);
            return product;
        }
        catch (e) {
            throw e;
        }
    }
    async deleteProduct(id: number) {
        await this.productService.deleteProduct(id);
    }
    async getAllProducts(): Promise<Product[]> {
        try {
            const products = await this.productService.getAllProducts();
            return products;
        }
        catch (e) {
            throw e;
        }
    }
    async getAllProductsWithCategories(): Promise<Product[]> {
        try {
            const products = await this.productService.getAllProductsWithCategories();
            return products;
        }
        catch (e) {
            throw e;
        }
    }
    async getFeaturedProducts(limit: number): Promise<Product[]> {
        try {
            const products = await this.productService.getFeaturedProducts(limit);
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
            const product = await this.productService.getProductById(id);
            return product;
        }
        catch (e) {
            throw e;
        }
    }

}