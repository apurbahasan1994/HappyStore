export interface ICreateUser{
    name: string;
    email: string;
    password:string;
    street?: string;
    house?: string;
    zip?: string;
    city?: string;
    country: string;
    phone?: string;
    mobile?: string;
    isAdmin?: boolean;
}