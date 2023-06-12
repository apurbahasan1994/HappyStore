import Category from '../../Models/Category';
export interface ICategoryRepository {
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | null>;
  createCategory(categoryData: Partial<Category>): Promise<Category>;
  updateCategory(id: number, categoryData: Partial<Category>): Promise<Category | null>;
  deleteCategory(id: number): Promise<boolean>;
}


class CategoryRepository implements ICategoryRepository {
  /**
 * Get all categories.
 *
 * @returns {Promise<Category[]>} - A promise that resolves to an array of all categories.
 * @throws {Error} - If an error occurs while fetching the categories.
 */
  public async getAllCategories(): Promise<Category[]> {
    try {
      const categories = await Category.findAll();
      return categories;
    } catch (error) {
      throw new Error('Failed to fetch categories');
    }
  }

  /**
   * Get a category by ID.
   *
   * @param {number} id - The ID of the category.
   * @returns {Promise<Category | null>} - A promise that resolves to the category with the specified ID, or null if not found.
   * @throws {Error} - If an error occurs while fetching the category.
   */
  public async getCategoryById(id: number): Promise<Category | null> {
    try {
      const category = await Category.findByPk(id);
      return category;
    } catch (error) {
      throw new Error(`Failed to fetch category with ID ${id}`);
    }
  }

  /**
   * Create a new category.
   *
   * @param {Partial<Category>} categoryData - The category data.
   * @returns {Promise<Category>} - A promise that resolves to the created category.
   * @throws {Error} - If an error occurs while creating the category.
   */
  public async createCategory(categoryData: Partial<Category>): Promise<Category> {
    try {
      const createdCategory = await Category.create(categoryData);
      return createdCategory;
    } catch (error) {
      throw new Error('Failed to create category');
    }
  }

  /**
   * Update a category by ID.
   *
   * @param {number} id - The ID of the category.
   * @param {Partial<Category>} categoryData - The updated category data.
   * @returns {Promise<Category | null>} - A promise that resolves to the updated category, or null if the category is not found.
   * @throws {Error} - If an error occurs while updating the category.
   */
  public async updateCategory(id: number, categoryData: Partial<Category>): Promise<Category | null> {
    try {
      const category = await Category.findByPk(id);
      if (category) {
        await category.update(categoryData);
        return category;
      }
      return null;
    } catch (error) {
      throw new Error(`Failed to update category with ID ${id}`);
    }
  }

  /**
   * Delete a category by ID.
   *
   * @param {number} id - The ID of the category.
   * @returns {Promise<boolean>} - A promise that resolves to true if the category is successfully deleted, false otherwise.
   * @throws {Error} - If an error occurs while deleting the category.
   */
  public async deleteCategory(id: number): Promise<boolean> {
    try {
      const category = await Category.findByPk(id);
      if (category) {
        await category.destroy();
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Failed to delete category with ID ${id}`);
    }
  }
}

export default CategoryRepository;