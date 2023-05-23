export class EntityFieldValidator {
    static isRequireFieldExist(object: Object, requiredFields: string[]) {
        const keys = Object.keys(object);
        const missingFields = requiredFields.filter((field) => !keys.includes(field));
        return missingFields.length === 0;
    }
}