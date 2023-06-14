import { IProduct } from "./Product";

export interface ICategry{
    id: number;
    name: string;
    color?: string;
    image?: string;
    icon?: string;
    products:IProduct[];
}