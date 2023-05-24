import Order from "../../Models/Order";

export class OrderRepository {

    public static async getAllOrders(): Promise<Order[]> {
        try {
            const Orders = await Order.findAll();
            return Orders;
        } catch (error) {
            throw new Error('Failed to fetch orders');
        }
    }


    public static async getOrderById(id: number): Promise<Order | null> {
        try {
            const order = await Order.findByPk(id);
            return order;
        } catch (error) {
            throw new Error(`Failed to fetch order with ID ${id}`);
        }
    }


    public static async createOrder(OrderData: Partial<Order>): Promise<Order> {
        try {
            const createdOrder = await Order.create(OrderData);
            return createdOrder;
        } catch (error) {
            throw new Error('Failed to create order');
        }
    }

    public static async updateOrder(id: number, orderData: Partial<Order>): Promise<Order | null> {
        try {
            const order = await Order.findByPk(id);
            if (order) {
                const updatedOrder = await order.update(orderData);
                return updatedOrder;
            }
            return null;
        } catch (error) {
            throw new Error(`Failed to update Order with ID ${id}`);
        }
    }

    public static async deleteOrder(id: number): Promise<boolean> {
        try {
            const order = await Order.findByPk(id);
            if (order) {
                await Order.destroy();
                return true;
            }
            return false;
        } catch (error) {
            throw new Error(`Failed to delete order with ID ${id}`);
        }
    }

}