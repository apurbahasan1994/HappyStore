import Category from "../Models/Category";
import Product from "../Models/Product";
import { ICreateCategory, IUpdateCategory } from "../RequstDto/CategoryDto";
import CategoryService from "../Services/Category/CategoryService";

export class CategoryRequestHandler {

    constructor() { }

    async createCategory(payload: ICreateCategory): Promise<Category> {
        try {
            const category = await CategoryService.createCategory(payload);
            return category;
        }
        catch (e) {
            throw e;
        }
    }
    async updateCategory(id: number, payload: IUpdateCategory): Promise<Category> {
        try {
            const Category = await CategoryService.updateCategory(id, payload);
            return Category;
        }
        catch (e) {
            throw e;
        }
    }
    async deleteCategory(id: number) {
        await CategoryService.deleteCategory(id);
    }
    async getAllCategory(): Promise<Category[]> {
        try {
            const categories = await CategoryService.getAllCategories();
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
            const category = await CategoryService.getCategoryById(id);
            return category;
        }
        catch (e) {
            throw e;
        }
    }

}