export interface signUpDto{
    firstName: string;
    lastName?: string;
    email: string;
    street?: string;
    house?: string;
    zip?: string;
    city?: string;
    country: string;
    phone?: string;
    mobile?: string;
    passwordHash:string;
}