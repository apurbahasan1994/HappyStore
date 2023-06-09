
import { promisify } from "util";
import crypto from 'crypto';
export class Utility {
    static makeAsPromise(func:any) {
        const funcPromise = promisify(func);
        return funcPromise;
    }
    private static async getRandomBytesFunc(length:number) {
        const randomBytesFunc = Utility.makeAsPromise(crypto.randomBytes);
        return randomBytesFunc(length);
    }
    static async generateToken(length:number){
        const token = (await Utility.getRandomBytesFunc(length)).toString('hex');
        return token;
    }
}