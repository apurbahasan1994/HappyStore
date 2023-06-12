import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../BaseModels/BaseController';
import { ProductRequestHandler } from '../RequestHandlers/ProductRequestHandler';
import { SetResponseWithMessage } from '../Utils/SetResWithMessage';
import { EntityFieldValidator } from '../Validators/EntityValidator';
import { requiredgetProductByPk } from '../Constants/Constants';

export interface IProductController {
    getAllProducts(req: Request, res: Response, next: NextFunction): void;
    getAllProductsWithCategories(req: Request, res: Response, next: NextFunction): void;
    getProductByCategory(req: Request, res: Response, next: NextFunction): void;
    getProductByPk(req: Request, res: Response, next: NextFunction): void;
    getFeaturedProducts(req: Request, res: Response, next: NextFunction): void;
    createProduct(req: Request, res: Response, next: NextFunction): void;
    createProductWithCategories(req: Request, res: Response, next: NextFunction): void;
}


export class ProductController extends BaseController implements IProductController {

    private readonly requestHandler: ProductRequestHandler;
    constructor() {
        super();
        this.requestHandler = new ProductRequestHandler()
    }

    public async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await this.requestHandler.getAllProducts();
            return res.status(200).json({message:'Successfull', products: products });
        }
        catch (e) {
            SetResponseWithMessage.setErrorAndGoNext(e.message, 400, res, next);
            return;
        }
    }

    public async getAllProductsWithCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await this.requestHandler.getAllProductsWithCategories();
            return res.status(200).json({ products: products });
        }
        catch (e) {
            SetResponseWithMessage.setErrorAndGoNext(e.message, 400, res, next);
            return;
        }
    }

    public async getProductByCategory(req: Request, res: Response, next: NextFunction) {
        const { categoryId } = req.query;
        try {
            const product = await this.requestHandler.getProductByCategory(+categoryId);
            return res.status(200).json({ product: product });
        }
        catch (e) {
            SetResponseWithMessage.setErrorAndGoNext(e.message, 400, res, next);
            return;
        }
    }

    public async getProductByPk(req: Request, res: Response, next: NextFunction) {
        if (EntityFieldValidator.isRequireFieldExist(req.body, requiredgetProductByPk)) {
            SetResponseWithMessage.setErrorAndGoNext('productId is required', 400, res, next);
            return;
        }
        const { productId } = req.params;
        try {
            const product = await this.requestHandler.getProductById(+productId);
            if (!product) {
                SetResponseWithMessage.setErrorAndGoNext('could not find any product with that id', 404, res, next);
                return;
            }
            return res.status(200).json({ product: product });
        }
        catch (e) {
            SetResponseWithMessage.setErrorAndGoNext(e.message, 500, res, next);
            return;
        }
    }

    public async getFeaturedProducts(req: Request, res: Response, next: NextFunction) {
        const limit = req.query.limit || 5;
        try {
            const products = await this.requestHandler.getFeaturedProducts(+limit);
            return res.status(200).json({ products: products });
        }
        catch (e) {
            SetResponseWithMessage.setErrorAndGoNext(e.message, 400, res, next);
            return;
        }
    }
    public async createProduct(req: Request, res: Response, next: NextFunction) {
        const payload = req.body;
        try {
            const product = await this.requestHandler.createProduct(payload);
            return res.status(200).json({ product: product });
        }
        catch (e) {
            SetResponseWithMessage.setErrorAndGoNext(e.message, 500, res, next);
            return;
        }
    }

    public async createProductWithCategories(req: Request, res: Response, next: NextFunction) {
        const payload = req.body;
        try {
            const productWithCategory = await this.requestHandler.createProductWithCategories(payload);
            return res.status(200).json({ message: 'Successfully created product', data: productWithCategory });
        }
        catch (e) {
            SetResponseWithMessage.setErrorAndGoNext(e.message, 500, res, next);
            return;
        }
    }
}
