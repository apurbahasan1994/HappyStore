import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { secret, refresh } from '../Utils/EnvConfig';
export class Tokenify {

    static generateRefreshToken(): string {
        return jwt.sign({token:uuidv4()}, refresh, { expiresIn: '10h' });
    }

    static generateAcessToken(user: any): string {
        const { exp, ...userWithoutExp } = user;
        return jwt.sign(userWithoutExp, secret, { expiresIn: '15m' });
    }

    static generateTokens(user: any): { accessToken: string; refreshToken: string } {
        const accessToken = Tokenify.generateAcessToken(user);
        const refreshToken = Tokenify.generateRefreshToken();
        return { accessToken, refreshToken };
    }

    static verifyAccessToken(token: string): any {
        return jwt.verify(token, secret);
    }
    static verifyRefreshToken(token: string): any {
        return jwt.verify(token, refresh);
    }

}