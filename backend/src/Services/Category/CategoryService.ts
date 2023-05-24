import Category from '../../Models/Category';
import CategoryRepository from '../../Repositories/Category/CategoryRepository';
export interface ICategoryService {

  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | null>;
  createCategory(categoryData: Partial<Category>): Promise<Category>;
  updateCategory(id: number, categoryData: Partial<Category>): Promise<Category | null>;
  deleteCategory(id: number): Promise<boolean>

}
class CategoryService implements ICategoryService {
  public async getAllCategories(): Promise<Category[]> {
    try {
      const categories = await CategoryRepository.getAllCategories();
      return categories;
    } catch (error) {
      throw new Error('Failed to fetch categories');
    }
  }

  public async getCategoryById(id: number): Promise<Category | null> {
    try {
      const category = await CategoryRepository.getCategoryById(id);
      return category;
    } catch (error) {
      throw new Error(`Failed to fetch category with ID ${id}`);
    }
  }

  public async createCategory(categoryData: Partial<Category>): Promise<Category> {
    try {
      const createdCategory = await CategoryRepository.createCategory(categoryData);
      return createdCategory;
    } catch (error) {
      throw new Error('Failed to create category');
    }
  }

  public async updateCategory(id: number, categoryData: Partial<Category>): Promise<Category | null> {
    try {
      const category = await CategoryRepository.updateCategory(id, categoryData);
      return category;
    } catch (error) {
      throw new Error(`Failed to update category with ID ${id}`);
    }
  }

  public async deleteCategory(id: number): Promise<boolean> {
    try {
      const isDeleted = await CategoryRepository.deleteCategory(id);
      return isDeleted;
    } catch (error) {
      throw new Error(`Failed to delete category with ID ${id}`);
    }
  }
}

export default CategoryService;