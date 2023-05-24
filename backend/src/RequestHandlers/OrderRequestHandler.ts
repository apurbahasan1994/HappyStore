import Order from "../Models/Order";
import Product from "../Models/Product";
import { ICreateProduct, ICreateProductWithCategory } from "../RequstDto/ProductDto";
import { OrderService } from "../Services/Order/OrderService";

export class OrderRequestHandler {
    private orderService: OrderService;

    constructor() { 
        this.orderService = new OrderService();
    }

    async createOrder(payload: ICreateProduct): Promise<Order> {
        try {
            const order: Order = await this.orderService.createOrder(payload);
            return order;
        }
        catch (e) {
            throw e;
        }
    }


    async updateOrder(id: number, payload: any): Promise<Order> {
        try {
            const order = await this.orderService.updateOrder(id, payload);
            return order;
        }
        catch (e) {
            throw e;
        }
    }
    async deleteOrder(id: number) {
        await this.orderService.deleteOrder(id);
    }
    async getAllOrders(): Promise<Order[]> {
        try {
            const orders = await this.orderService.getAllOrders();
            return orders;
        }
        catch (e) {
            throw e;
        }
    }

    async getOrderById(id: number): Promise<Order> {
        try {
            const order = await this.orderService.getOrderById(id);
            return order;
        }
        catch (e) {
            throw e;
        }
    }

}