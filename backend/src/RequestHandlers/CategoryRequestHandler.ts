import Category from "../Models/Category";
import { ICreateCategory, IUpdateCategory } from "../RequstDto/CategoryDto";
import CategoryService, { ICategoryService } from "../Services/Category/CategoryService";

export class CategoryRequestHandler {

    private readonly categoryService:ICategoryService;

    constructor() {
        this.categoryService = new CategoryService();
     }

    async createCategory(payload: ICreateCategory): Promise<Category> {
        try {
            const category = await this.categoryService.createCategory(payload);
            return category;
        }
        catch (e) {
            throw e;
        }
    }
    async updateCategory(id: number, payload: IUpdateCategory): Promise<Category> {
        try {
            const Category = await this.categoryService.updateCategory(id, payload);
            return Category;
        }
        catch (e) {
            throw e;
        }
    }
    async deleteCategory(id: number) {
        await this.categoryService.deleteCategory(id);
    }
    async getAllCategory(): Promise<Category[]> {
        try {
            const categories = await this.categoryService.getAllCategories();
            return categories;
        }
        catch (e) {
            throw e;
        }
    }
    async deleteAllCategory() {
    }
    async getCategoryById(id: number): Promise<Category> {
        try {
            const category = await this.categoryService.getCategoryById(id);
            return category;
        }
        catch (e) {
            throw e;
        }
    }

}