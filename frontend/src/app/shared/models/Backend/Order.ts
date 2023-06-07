export interface IOrderBase {
    id: number;
    city: string;
    zip: string;
    country: string;
    phone?: string;
    mobile: string;
    status: string;
    totalPrice: string;
    dateOrdered: Date;
    shippingAddress1?: string;
    shippingAddress2?: string;
}