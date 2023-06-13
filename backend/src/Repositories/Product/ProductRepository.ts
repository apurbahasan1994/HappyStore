
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

  /**
 * Get all products.
 *
 * @returns {Promise<Product[]>} - A promise that resolves to an array of all products.
 * @throws {Error} - If an error occurs while fetching the products.
 */
  public async getAllProducts(): Promise<Product[]> {
    try {
      const products = await Product.findAll();
      return products;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  }

  /**
   * Get all products with categories.
   *
   * @returns {Promise<Product[]>} - A promise that resolves to an array of all products with their associated categories.
   * @throws {Error} - If an error occurs while fetching the products.
   */
  public async getAllProductsWithCategories(): Promise<Product[]> {
    try {
      const products = await Product.findAll({
        include: [Category],
      });
      return products;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  }

  /**
   * Get a product by category ID.
   *
   * @param {number} id - The ID of the category.
   * @returns {Promise<Product | null>} - A promise that resolves to the product associated with the specified category ID, or null if not found.
   * @throws {Error} - If an error occurs while fetching the product.
   */
  public async getProductByCategory(id: number): Promise<Product | null> {
    try {
      const product = await Product.findOne({
        include: {
          model: Category,
          where: {
            id: id,
          },
          through: { attributes: [] },
        },
      });
      return product;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  }

  /**
   * Get a product by ID.
   *
   * @param {number} id - The ID of the product.
   * @returns {Promise<Product | null>} - A promise that resolves to the product with the specified ID, or null if not found.
   * @throws {Error} - If an error occurs while fetching the product.
   */
  public async getProductById(id: number): Promise<Product | null> {
    try {
      const product = await Product.findByPk(id);
      return product;
    } catch (error) {
      throw new Error(`Failed to fetch product with ID ${id}`);
    }
  }

  /**
   * Get featured products.
   *
   * @param {number} count - The number of featured products to retrieve. Default is 5.
   * @returns {Promise<Product[] | null>} - A promise that resolves to an array of featured products, or null if none found.
   * @throws {Error} - If an error occurs while fetching the featured products.
   */
  public async getFeaturedProducts(count: number = 5): Promise<Product[] | null> {
    try {
      const products = await Product.findAll({
        where: {
          isFeatured: true,
        },
        limit: count,
      });
      return products;
    } catch (error) {
      throw new Error('Failed to fetch featured products');
    }
  }

  /**
   * Create a new product.
   *
   * @param {Partial<Product>} productData - The product data.
   * @returns {Promise<Product>} - A promise that resolves to the created product.
   * @throws {Error} - If an error occurs while creating the product.
   */
  public async createProduct(productData: Partial<Product>): Promise<Product> {
    try {
      const createdProduct = await Product.create(productData);
      return createdProduct;
    } catch (error) {
      throw new Error('Failed to create product');
    }
  }

  /**
   * Set categories for a product.
   *
   * @param {Product} product - The product to set the categories for.
   * @param {number} category - The category ID.
   * @returns {Promise<void>} - A promise that resolves when the categories are set for the product.
   * @throws {Error} - If an error occurs while setting the categories.
   */
  public async setProductCategories(product: Product, category: number): Promise<void> {
    try {
      const productWithCategory = product.setCategories([category]);
      return productWithCategory;
    } catch (error) {
      throw new Error('Failed to set categories');
    }
  }

  /**
   * Update a product by ID.
   *
   * @param {number} id - The ID of the product.
   * @param {Partial<Product>} productData - The updated product data.
   * @returns {Promise<Product | null>} - A promise that resolves to the updated product, or null if the product is not found.
   * @throws {Error} - If an error occurs while updating the product.
   */
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

  /**
   * Delete a product by ID.
   *
   * @param {number} id - The ID of the product.
   * @returns {Promise<boolean>} - A promise that resolves to true if the product is successfully deleted, false otherwise.
   * @throws {Error} - If an error occurs while deleting the product.
   */
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
