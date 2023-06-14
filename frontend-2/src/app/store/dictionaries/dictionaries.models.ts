

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