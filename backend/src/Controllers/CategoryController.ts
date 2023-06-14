import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../BaseModels/BaseController';
import { CategoryRequestHandler } from '../RequestHandlers/CategoryRequestHandler';
import { SetResponseWithMessage } from '../Utils/SetResWithMessage';
import { ICreateCategory, IUpdateCategory } from '../RequstDto/CategoryDto';
import { EntityFieldValidator } from '../Validators/EntityValidator';
import { requiredCategoryCreate, requiredgetCategoryByPk } from '../Constants/Constants';

export class CategoryController extends BaseController {

    private readonly requestHandler: CategoryRequestHandler;
    constructor() {
        super();
        this.requestHandler = new CategoryRequestHandler()
    }

    public async getAllCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await this.requestHandler.getAllCategory();
            return res.status(200).json({ categories: categories });
        }
        catch (e) {
            SetResponseWithMessage.setErrorAndGoNext(e.message, 500, res, next);
            return;
        }
    }

    public async getCategoryByPk(req: Request, res: Response, next: NextFunction) {
        if (EntityFieldValidator.isRequireFieldExist(req.params, requiredgetCategoryByPk)) {
            SetResponseWithMessage.setErrorAndGoNext('categoryId was not provided', 400, res, next);
            return;
        }
        const { categoryId } = req.params;
        try {
            const category = await this.requestHandler.getCategoryById(+categoryId);
            if (!category) {
                SetResponseWithMessage.setErrorAndGoNext('could not find any category with that id', 404, res, next);
                return;
            }
            return res.status(200).json({ category: category });
        }
        catch (e) {
            SetResponseWithMessage.setErrorAndGoNext(e.message, 500, res, next);
            return;
        }
    }

    public async createCategory(req: Request, res: Response, next: NextFunction) {
        if (!EntityFieldValidator.isRequireFieldExist(req.body, requiredCategoryCreate)) {
            SetResponseWithMessage.setErrorAndGoNext('Name is required', 400, res, next);
            return;
        }
        const payload: ICreateCategory = req.body;
        try {
            const category = await this.requestHandler.createCategory(payload);
            return res.status(200).json({ category: category });
        }
        catch (e) {
            SetResponseWithMessage.setErrorAndGoNext(e.message, 500, res, next);
            return;
        }
    }
    public async updateCategory(req: Request, res: Response, next: NextFunction) {
        const payload: IUpdateCategory = req.body;
        const { categoryId } = req.params;
        try {
            const category = await this.requestHandler.updateCategory(+categoryId, payload);
            return res.status(200).json({ category: category });
        }
        catch (e) {
            SetResponseWithMessage.setErrorAndGoNext(e.message, 500, res, next);
            return;
        }
    }
}
