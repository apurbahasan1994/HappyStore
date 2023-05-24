import Product from '../../Models/Product';
import ProductRepository from '../../Repositories/Product/ProductRepository';

export interface IProductService {
  getAllProducts(): Promise<Product[]>;
  getAllProductsWithCategories(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | null>;
  getProductByCategory(id: number): Promise<Product | null>;
  getFeaturedProducts(limit: number): Promise<Product[] | null>;
  createProduct(productData: Partial<Product>): Promise<Product>;
  setProductCategories(product: Product, categoryId: number): Promise<void>;
  updateProduct(id: number, productData: Partial<Product>): Promise<Product | null>;
  deleteProduct(id: number): Promise<boolean>;
}

class ProductService implements IProductService {
  public async getAllProducts(): Promise<Product[]> {
    try {
      const products = await ProductRepository.getAllProducts();
      return products;
    } catch (error) {
      throw error;
    }
  }
  public async getAllProductsWithCategories(): Promise<Product[]> {
    try {
      const products = await ProductRepository.getAllProductsWithCategories();
      return products;
    } catch (error) {
      throw error;
    }
  }

  public async getProductById(id: number): Promise<Product | null> {
    try {
      const product = await ProductRepository.getProductById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  public async getProductByCategory(id: number): Promise<Product | null> {
    try {
      const product = await ProductRepository.getProductByCategory(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  public async getFeaturedProducts(limit: number): Promise<Product[] | null> {
    try {
      const products = await ProductRepository.getFeaturedProducts(limit);
      return products;
    } catch (error) {
      throw error;
    }
  }

  public async createProduct(productData: Partial<Product>): Promise<Product> {
    try {
      const createdProduct = await ProductRepository.createProduct(productData);
      return createdProduct;
    } catch (error) {
      throw error;
    }
  }

  public async setProductCategories(product: Product, categoryId: number): Promise<void> {

    try {
      const productWithCategory = await ProductRepository.setProductCategories(product, categoryId);
      return productWithCategory;
    } catch (error) {
      throw error;
    }

  }

  public async updateProduct(id: number, productData: Partial<Product>): Promise<Product | null> {
    try {
      const product = await ProductRepository.updateProduct(id, productData);
      return product;
    } catch (error) {
      throw error;
    }
  }

  public async deleteProduct(id: number): Promise<boolean> {
    try {
      const isDeleted = await ProductRepository.deleteProduct(id);
      return isDeleted;
    } catch (error) {
      throw new error;
    }
  }
}

export default ProductService;
