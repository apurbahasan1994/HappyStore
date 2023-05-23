import { NextFunction, Response, Request } from "express";
import { Tokenify } from "../Utils/JsonTokenify";

export class AuthenticationCheck {
    static authenticate(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.sendStatus(401);
        }

        try {
            const decoded = Tokenify.verifyAccessToken(token);
            next();
        } catch (error) {
            return res.sendStatus(403);
        }
    }
}