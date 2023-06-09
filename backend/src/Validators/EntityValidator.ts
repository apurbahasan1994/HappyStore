import { body, header, check, validationResult } from 'express-validator';
import { UserService } from '../Services/User/UserService';
import { Request } from 'express';
export class EntityFieldValidator {
    private static readonly userService: UserService = new UserService();
    static isRequireFieldExist(object: Object, requiredFields: string[]) {
        const keys = Object.keys(object);
        const missingFields = requiredFields.filter((field) => !keys.includes(field));
        return missingFields.length === 0;
    }

    static EmailValidationsSignIn = [
        body('email')
            .notEmpty()
            .withMessage('Email cant be empty')
            .isEmail()
            .withMessage('Valid email is required')
            .custom(async (email) => {
                const usedEmail = await EntityFieldValidator.userService.getUserByEmail(email);
                if (!usedEmail) {
                    throw new Error('User not found')
                }
            }),
    ]
    static EmailValidationsSignUp = [
        body('email')
            .notEmpty()
            .withMessage('Email cant be empty')
            .isEmail()
            .withMessage('Valid email is required')
            .custom(async (email) => {
                const usedEmail = await EntityFieldValidator.userService.getUserByEmail(email);
                if (usedEmail) {
                    throw new Error('User already registered')
                }
            }),
    ]

    static PassworValidations =[
        body('password')
            .notEmpty()
            .withMessage('Password can not be empty')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 character long')
            .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/)
            .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one digit'),
        body('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords did not match')
                }
                return true;
            }),
    ]

    static SignInValidations = [
       ...EntityFieldValidator.EmailValidationsSignIn,
       ...EntityFieldValidator.PassworValidations
    ]

    static SignUpValidations = [
        ...EntityFieldValidator.EmailValidationsSignUp,
        ...EntityFieldValidator.PassworValidations,
        body('country')
            .notEmpty()
            .withMessage('Country cant be empty'),
        body('mobile')
            .notEmpty()
            .withMessage('Mobile number cant be empty')
            .isNumeric()
            .withMessage('Mobile must contain only numeric characters'),

    ]

    static vaidationErrors(req: Request) {
        const errors = validationResult(req);
        return { isEmpty: errors.isEmpty(), errors: errors };
    }

}