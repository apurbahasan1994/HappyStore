import Category from '../../Models/Category';

class CategoryRepository {
  public static async getAllCategories(): Promise<Category[]> {
    try {
      const categories = await Category.findAll();
      return categories;
    } catch (error) {
      throw new Error('Failed to fetch categories');
    }
  }

  public static async getCategoryById(id: number): Promise<Category | null> {
    try {
      const category = await Category.findByPk(id);
      return category;
    } catch (error) {
      throw new Error(`Failed to fetch category with ID ${id}`);
    }
  }

  public static async createCategory(categoryData: Partial<Category>): Promise<Category> {
    try {
      const createdCategory = await Category.create(categoryData);
      return createdCategory;
    } catch (error) {
      throw new Error('Failed to create category');
    }
  }

  public static async updateCategory(id: number, categoryData: Partial<Category>): Promise<Category | null> {
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

  public static async deleteCategory(id: number): Promise<boolean> {
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