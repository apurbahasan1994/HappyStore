import Product from '../../Models/Product';
import ProductRepository from '../../Repositories/Product/ProductRepository';

class ProductService {
  public static async getAllProducts(): Promise<Product[]> {
    try {
      const products = await ProductRepository.getAllProducts();
      return products;
    } catch (error) {
      throw error;
    }
  }
  public static async getAllProductsWithCategories(): Promise<Product[]> {
    try {
      const products = await ProductRepository.getAllProductsWithCategories();
      return products;
    } catch (error) {
      throw error;
    }
  }

  public static async getProductById(id: number): Promise<Product | null> {
    try {
      const product = await ProductRepository.getProductById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  public static async getProductByCategory(id: number): Promise<Product | null> {
    try {
      const product = await ProductRepository.getProductByCategory(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  public static async getFeaturedProducts(limit: number): Promise<Product[] | null> {
    try {
      const products = await ProductRepository.getFeaturedProducts(limit);
      return products;
    } catch (error) {
      throw error;
    }
  }

  public static async createProduct(productData: Partial<Product>): Promise<Product> {
    try {
      const createdProduct = await ProductRepository.createProduct(productData);
      return createdProduct;
    } catch (error) {
      throw error;
    }
  }

  public static async setProductCategories(product:Product,categoryId:number){

    try {
      const productWithCategory = await ProductRepository.setProductCategories(product,categoryId);
      return productWithCategory;
    } catch (error) {
      throw error;
    }

  }

  public static async updateProduct(id: number, productData: Partial<Product>): Promise<Product | null> {
    try {
      const product = await ProductRepository.updateProduct(id, productData);
      return product;
    } catch (error) {
      throw error;
    }
  }

  public static async deleteProduct(id: number): Promise<boolean> {
    try {
      const isDeleted = await ProductRepository.deleteProduct(id);
      return isDeleted;
    } catch (error) {
      throw new error;
    }
  }
}

export default ProductService;
