import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../BaseModels/BaseController';
import { ProductRequestHandler } from '../RequestHandlers/ProductRequestHandler';
import { SetResponseWithMessage } from '../Utils/SetResWithMessage';

export class ProductController extends BaseController {

    private readonly requestHandler: ProductRequestHandler;
    constructor() {
        super();
        this.requestHandler = new ProductRequestHandler()
    }

    public async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await this.requestHandler.getAllProducts();
            return res.status(200).json({ products: products });
        }
        catch (e) {
            res.status(400)
            return next(e)
        }
    }

    public async getAllProductsWithCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await this.requestHandler.getAllProductsWithCategories();
            return res.status(200).json({ products: products });
        }
        catch (e) {
            res.status(400)
            return next(e)
        }
    }

    public async getProductByCategory(req: Request, res: Response, next: NextFunction) {
        const {categoryId} = req.query;
        try {
            const product = await this.requestHandler.getProductByCategory(+categoryId);
            return res.status(200).json({ product: product });
        }
        catch (e) {
            res.status(400)
            return next(e)
        }
    }

    public async getProductByPk(req: Request, res: Response, next: NextFunction) {
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
            res.status(400)
            return next(e)
        }
    }
    public async createProduct(req: Request, res: Response, next: NextFunction) {
        const payload = req.body;
        try {
            const product = await this.requestHandler.createProduct(payload);
            return res.status(200).json({ product: product });
        }
        catch (e) {
            res.status(400);
            next(e);
        }
    }

    public async createProductWithCategories(req: Request, res: Response, next: NextFunction) {
        const payload = req.body;
        try {
            const productWithCategory = await this.requestHandler.createProductWithCategories(payload);
            return res.status(200).json({ message: 'Successfully created product', data: productWithCategory });
        }
        catch (e) {
            res.status(400)
            next(e);
        }
    }
}
