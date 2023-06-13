
export { IUserBase } from '../../shared/models/Backend/User'

// Request Models

export interface EmailPasswordCredentials {
    email: string;
    password: string;
    confirmPassword:string;
}


// Always start creating a store with  models
export interface Dictionaries {
    role: Dictionary;
    specialization: Dictionary;
    qualificaton: Dictionary,
    skills: Dictionary
}

export interface Dictionary {
    items: any[];
    controlItems: any[]
}