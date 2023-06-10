import bcrypt from 'bcrypt';
export class AuthUtil {
    static async hashedPassWord(password: string, salt: number): Promise<string> {
        const hashedValue = await bcrypt.hash(password, salt);
        return hashedValue;
    }
}