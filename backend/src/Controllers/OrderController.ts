import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../BaseModels/BaseController';
import { ProductRequestHandler } from '../RequestHandlers/ProductRequestHandler';
import { SetResponseWithMessage } from '../Utils/SetResWithMessage';
import Order from '../Models/Order';
import { OrderRequestHandler } from '../RequestHandlers/OrderRequestHandler';

export class OrderController extends BaseController {

    private readonly requestHandler: OrderRequestHandler;
    constructor() {
        super();
        this.requestHandler = new OrderRequestHandler()
    }

    public async getAllOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const orders: Order[] = await this.requestHandler.getAllOrders();
            return res.status(200).json({ message: "Success", data: { orders } });
        }
        catch (e) {
            SetResponseWithMessage.setErrorAndGoNext(e.message, 400, res, next);
            return;
        }
    }


    public async getOrderByPk(req: Request, res: Response, next: NextFunction) {
        const { orderId } = req.params;
        try {
            const product = await this.requestHandler.getOrderById(+orderId);
            if (!product) {
                SetResponseWithMessage.setErrorAndGoNext('could not find any order with that id', 404, res, next);
                return;
            }
            return res.status(200).json({ message: "Success", data: { product } });
        }
        catch (e) {
            SetResponseWithMessage.setErrorAndGoNext(e.message, 500, res, next);
            return;
        }
    }

    public async createOrder(req: Request, res: Response, next: NextFunction) {
        const payload = req.body;
        try {
            const order : Order = await this.requestHandler.createOrder(payload);
            return res.status(200).json({ message:"Success", data: {order} });
        }
        catch (e) {
            SetResponseWithMessage.setErrorAndGoNext(e.message, 500, res, next);
            return;
        }
    }

}
