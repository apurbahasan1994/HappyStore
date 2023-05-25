
import Category from '../../Models/Category';
import Product from '../../Models/Product';

export interface IProductRepository {
  getAllProducts(): Promise<Product[]>;
  getAllProductsWithCategories(): Promise<Product[]>;
  getProductByCategory(id: number): Promise<Product | null>;
  getProductById(id: number): Promise<Product | null>;
  getFeaturedProducts(count: number): Promise<Product[] | null>;
  createProduct(productData: Partial<Product>): Promise<Product>;
  setProductCategories(product: Product, category: number): Promise<void>;
  updateProduct(id: number, productData: Partial<Product>): Promise<Product | null>;
  deleteProduct(id: number): Promise<boolean>;
}


class ProductRepository implements IProductRepository {
  public async getAllProducts(): Promise<Product[]> {
    try {
      const products = await Product.findAll();
      return products;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  }

  public async getAllProductsWithCategories(): Promise<Product[]> {
    try {
      const products = await Product.findAll({
        include: [Category]
      });
      return products;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  }

  public async getProductByCategory(id: number): Promise<Product | null> {
    try {
      const product = await Product.findOne({
        include: {
          model: Category,
          where: {
            id: id
          },
          through: { attributes: [] }
        }
      })
      return product;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  }

  public async getProductById(id: number): Promise<Product | null> {
    try {
      const product = await Product.findByPk(id);
      return product;
    } catch (error) {
      throw new Error(`Failed to fetch product with ID ${id}`);
    }
  }

  public async getFeaturedProducts(count: number = 5): Promise<Product[] | null> {
    try {
      const products = await Product.findAll({
        where: {
          isFeatured: true
        },
        limit: count
      });
      return products;
    } catch (error) {
      throw new Error(`Failed to fetch featured products`);
    }
  }

  public async createProduct(productData: Partial<Product>): Promise<Product> {
    try {
      const createdProduct = await Product.create(productData);
      return createdProduct;
    } catch (error) {
      throw new Error('Failed to create product');
    }
  }

  public async setProductCategories(product: Product, category: number): Promise<void> {
    try {
      const productWithCategory = product.setCategories([category]);
      return productWithCategory;
    } catch (error) {
      throw new Error('Failed to create category');
    }

  }

  public async updateProduct(id: number, productData: Partial<Product>): Promise<Product | null> {
    try {
      const product = await Product.findByPk(id);
      if (product) {
        await product.update(productData);
        return product;
      }
      return null;
    } catch (error) {
      throw new Error(`Failed to update product with ID ${id}`);
    }
  }

  public async deleteProduct(id: number): Promise<boolean> {
    try {
      const product = await Product.findByPk(id);
      if (product) {
        await product.destroy();
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Failed to delete product with ID ${id}`);
    }
  }
}

export default ProductRepository;
