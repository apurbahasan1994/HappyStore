import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { secret, refresh } from '../Utils/EnvConfig';
import User from '../Models/User';
export class Tokenify {

    static generateRefreshToken(email: string): string {
        return jwt.sign({ email }, refresh, { expiresIn: '10h' });
    }

    static generateAcessToken(user: any): string {
        const { exp, ...userWithoutExp } = user;
        return jwt.sign(userWithoutExp, secret, { expiresIn: '15m' });
    }

    static generateTokens(user: Partial<User>): { accessToken: string; refreshToken: string } {
        const accessToken = Tokenify.generateAcessToken(user);
        const refreshToken = Tokenify.generateRefreshToken(user.email);
        return { accessToken, refreshToken };
    }

    static verifyAccessToken(token: string): any {
        return jwt.verify(token, secret);
    }
    static verifyRefreshToken(token: string): any {
        return jwt.verify(token, refresh);
    }

}