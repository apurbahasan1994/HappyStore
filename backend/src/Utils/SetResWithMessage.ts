import { NextFunction, Response } from "express";

export class SetResponseWithMessage {

    static setErrorAndGoNext(message: string = null, statusCode: number = null, res: Response, next: NextFunction) {
        res.status(statusCode || 500);
        const error = new Error(message || 'Something went wrong');
        return next(error);
    }
}