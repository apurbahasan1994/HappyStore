import Order from "../../Models/Order";
import { OrderRepository } from "../../Repositories/Order/OrderRepositories";


export interface IOrderService {

    createOrder(payload: any): Promise<Order | null>;
    updateOrder(id: number, payload: any): Promise<Order | null>;
    deleteOrder(id: number): void;
    getAllOrders(): Promise<Order[] | null>;
    getOrderById(id: number): Promise<Order>

}

export class OrderService implements IOrderService {

    async createOrder(payload: any): Promise<Order> {
        try {
            const order: Order = await OrderRepository.createOrder(payload);
            return order;
        }
        catch (e) {
            throw e;
        }
    }

    async updateOrder(id: number, payload: any): Promise<Order> {
        try {
            const product = await OrderRepository.updateOrder(id, payload);
            return product;
        }
        catch (e) {
            throw e;
        }
    }
    async deleteOrder(id: number) {
        await OrderRepository.deleteOrder(id);
    }
    async getAllOrders(): Promise<Order[]> {
        try {
            const products = await OrderRepository.getAllOrders();
            return products;
        }
        catch (e) {
            throw e;
        }
    }

    async getOrderById(id: number): Promise<Order> {
        try {
            const order = await OrderRepository.getOrderById(id);
            return order;
        }
        catch (e) {
            throw e;
        }
    }

}