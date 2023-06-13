import Order from "../../Models/Order";

export class OrderRepository {

    /**
      * Get all orders.
      *
      * @returns {Promise<Order[]>} - A promise that resolves to an array of all orders.
      * @throws {Error} - If an error occurs while fetching the orders.
      */
    public static async getAllOrders(): Promise<Order[]> {
        try {
            const orders = await Order.findAll();
            return orders;
        } catch (error) {
            throw new Error('Failed to fetch orders');
        }
    }

    /**
     * Get an order by ID.
     *
     * @param {number} id - The ID of the order.
     * @returns {Promise<Order | null>} - A promise that resolves to the order with the specified ID, or null if not found.
     * @throws {Error} - If an error occurs while fetching the order.
     */
    public static async getOrderById(id: number): Promise<Order | null> {
        try {
            const order = await Order.findByPk(id);
            return order;
        } catch (error) {
            throw new Error(`Failed to fetch order with ID ${id}`);
        }
    }

    /**
     * Create a new order.
     *
     * @param {Partial<Order>} orderData - The order data.
     * @returns {Promise<Order>} - A promise that resolves to the created order.
     * @throws {Error} - If an error occurs while creating the order.
     */
    public static async createOrder(orderData: Partial<Order>): Promise<Order> {
        try {
            const createdOrder = await Order.create(orderData);
            return createdOrder;
        } catch (error) {
            throw new Error('Failed to create order');
        }
    }

    /**
     * Update an order by ID.
     *
     * @param {number} id - The ID of the order.
     * @param {Partial<Order>} orderData - The updated order data.
     * @returns {Promise<Order | null>} - A promise that resolves to the updated order, or null if the order is not found.
     * @throws {Error} - If an error occurs while updating the order.
     */
    public static async updateOrder(id: number, orderData: Partial<Order>): Promise<Order | null> {
        try {
            const order = await Order.findByPk(id);
            if (order) {
                const updatedOrder = await order.update(orderData);
                return updatedOrder;
            }
            return null;
        } catch (error) {
            throw new Error(`Failed to update order with ID ${id}`);
        }
    }

    /**
     * Delete an order by ID.
     *
     * @param {number} id - The ID of the order.
     * @returns {Promise<boolean>} - A promise that resolves to true if the order is successfully deleted, false otherwise.
     * @throws {Error} - If an error occurs while deleting the order.
     */
    public static async deleteOrder(id: number): Promise<boolean> {
        try {
            const order = await Order.findByPk(id);
            if (order) {
                await order.destroy();
                return true;
            }
            return false;
        } catch (error) {
            throw new Error(`Failed to delete order with ID ${id}`);
        }
    }
}