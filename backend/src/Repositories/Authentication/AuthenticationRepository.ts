import { hashingSalt } from "../../Constants/Constants";
import { MailSendConfig } from "../../InterFaces/MailConfig";
import PasswordToken from "../../Models/PasswordResetToken";
import User from "../../Models/User";
import { ResetPassDTO } from "../../RequstDto/ResetPassDto";
import { SigninDto } from "../../RequstDto/SignInDto";
import { signUpDto } from "../../RequstDto/SignUpDto";
import { TokenResponseDto } from "../../ResponseDto/AuthResponseDto";
import { AuthUtil } from "../../Utils/AuthUtils";
import { Tokenify } from "../../Utils/JsonTokenify";
import { MailSneder } from "../../Utils/MailSender";
import { Utility } from "../../Utils/Util";
import { UserRepository } from "../User/UserRepository";

export interface IAuthenticationRepository {
    signUp(payload: signUpDto): Promise<boolean>;
    signIn(payload: SigninDto): Promise<TokenResponseDto | null>;
    logOut(): Promise<void>;
    forgotPassWord(email: string): Promise<any>;
    resetPassWord(userData: Partial<ResetPassDTO>, token: string): Promise<boolean>;
}


export class AuthenticationRepository implements IAuthenticationRepository {

    private readonly userRepo: UserRepository;
    constructor() {
        this.userRepo = new UserRepository();
    }

    /**
 * Sign up a user.
 *
 * @param {Object} payload - The sign up data.
 * @returns {Promise<boolean>} - A promise that resolves to true if the user is registered successfully, or false otherwise.
 * @throws {Error} - If an error occurs during the sign up process.
 */
    public async signUp(payload: signUpDto): Promise<boolean> {
        try {
            const user = await this.userRepo.createUser(payload);
            if (user) {
                return true;
            }
            return false;
        } catch (e) {
            throw new Error('Could not register the user');
        }
    }

    /**
     * Sign in a user.
     *
     * @param {Object} payload - The sign in data.
     * @returns {Promise<TokenResponseDto | null>} - A promise that resolves to the token response or null if sign in fails.
     * @throws {Error} - If an error occurs during the sign in process.
     */
    public async signIn(payload: SigninDto): Promise<TokenResponseDto | null> {
        try {
            const user: User = await this.userRepo.getUserByEmail(payload.email);
            if (user) {
                const { passwordHash, ...userData } = user.dataValues;
                return { ...Tokenify.generateTokens(userData), user: userData };
            }
            return null;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Log out the current user.
     */
    public async logOut(): Promise<void> {
        // Implement your logic here.
    }

    /**
     * Generate a token with the specified length.
     *
     * @param {number} length - The length of the token.
     * @returns {Promise<string>} - A promise that resolves to the generated token.
     */
    static async generateToken(length: number): Promise<string> {
        const token = await Utility.generateToken(length);
        return token;
    }

    /**
     * Create a password reset token for the specified user ID and expiration date.
     *
     * @param {any} userid - The ID of the user.
     * @param {Date} expiration - The expiration date of the token.
     * @returns {Promise<any>} - A promise that resolves to the created password reset token.
     */
    static async createPassWordToken(userid: any, expiration: Date): Promise<any> {
        const resetToken = await PasswordToken.create({
            token: await AuthenticationRepository.generateToken(32),
            expires_at: expiration,
            userId: userid
        });
        return resetToken;
    }

    /**
     * Reset the password for a user.
     *
     * @param {Object} userData - The new password data.
     * @param {string} token - The reset token.
     * @returns {Promise<boolean>} - A promise that resolves to true if the password is reset successfully, or false otherwise.
     * @throws {Error} - If an error occurs during the password reset process.
     */
    async resetPassWord(userData: ResetPassDTO, token: string): Promise<boolean> {
        try {
            const resetToken = await this.userRepo.getToken(token);
            if (!resetToken) {
                throw new Error('Invalid token');
            }
            if (resetToken.expires_at < new Date()) {
                throw new Error('Invalid token');
            }
            const hashedPassWord = await AuthUtil.hashedPassWord(userData.password, hashingSalt);
            const user = await this.userRepo.updateUserByEmail(userData.email, { passwordHash: hashedPassWord, email: userData.email });
            if (user) {
                return true;
            }
            return false;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Send a password reset email to the specified email address.
     *
     * @param {string} email - The email address of the user.
     * @throws {Error} - If an error occurs while sending the reset password email.
     */
    public async forgotPassWord(email: string): Promise<void> {
        try {
            const user: Partial<User> = await this.userRepo.getUserByEmail(email);
            const expirationTime = new Date();
            expirationTime.setMinutes(expirationTime.getMinutes() + 4);
            const resetToken = await AuthenticationRepository.createPassWordToken(user.id, expirationTime);
            const requestUrl = `http://localhost:4200/reset-pass/${resetToken.dataValues.token}?email=${user.email}`;
            if (user) {
                await MailSneder.sendMail({
                    from: 'hasanapu099@gmail.com',
                    to: email,
                    subject: "User registration success",
                    text: `Click this link to reset your password link: ${requestUrl}`
                } as MailSendConfig);
            }
        } catch (err) {
            throw err;
        }
    }


}