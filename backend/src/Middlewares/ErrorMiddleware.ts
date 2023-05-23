import { NextFunction, Request, Response } from "express";

export class ErrorMiddleWare {

    static sendErrorMessageWithResponse(error: Error, request: Request, response: Response, next: NextFunction) {

        const errorMessage = error.message || 'Something went wrong, please try again'
        if (!response.statusCode) {
            return response.status(500).json({ message: errorMessage });
        }
        return response.status(response.statusCode).json({ message: errorMessage });
    }

}