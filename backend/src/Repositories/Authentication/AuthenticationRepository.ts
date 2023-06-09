import { MailSendConfig } from "../../InterFaces/MailConfig";
import PasswordToken from "../../Models/PasswordResetToken";
import User from "../../Models/User";
import { SigninDto } from "../../RequstDto/SignInDto";
import { signUpDto } from "../../RequstDto/SignUpDto";
import { TokenResponseDto } from "../../ResponseDto/AuthResponseDto";
import { Tokenify } from "../../Utils/JsonTokenify";
import { MailSneder } from "../../Utils/MailSender";
import { Utility } from "../../Utils/Util";
import { UserRepository } from "../User/UserRepository";

export interface IAuthenticationRepository {
    signUp(payload: signUpDto): Promise<boolean>;
    signIn(payload: SigninDto): Promise<TokenResponseDto | null>;
    logOut(): Promise<void>;
    forgotPassWord(email: string);
}


export class AuthenticationRepository implements IAuthenticationRepository {

    private readonly userRepo: UserRepository;
    constructor() {
        this.userRepo = new UserRepository();
    }

    public async signUp(payload: signUpDto) {

        try {
            const user = await this.userRepo.createUser(payload);
            if (user) {
                return true;
            }
            false;
        }
        catch (e) {
            throw new Error('Could not register the user');
        }

    }

    public async signIn(payload: SigninDto): Promise<TokenResponseDto | null> {
        try {
            const user: User = await this.userRepo.getUserByEmail(payload.email);
            if (user) {
                const { passwordHash, ...userData } = user.dataValues;
                return { ...Tokenify.generateTokens(userData), user: userData };

            }
            return null
        }
        catch (e) {
            throw e;
        }
    }

    public async logOut() {

    }

    static async generateToken(length: number) {
        const token = await Utility.generateToken(length);
        return token;
    }

    static async createPassWordToken(userid: any, expiration: Date) {

        const resetToken = await PasswordToken.create({
            token: await AuthenticationRepository.generateToken(32),
            expires_at: expiration,
            userId: userid
        });
        return resetToken;

    }

    public async forgotPassWord(email: string) {
        try {
            const user: Partial<User> = await this.userRepo.getUserByEmail(email);
            const expirationTime = new Date();
            expirationTime.setHours(expirationTime.getMinutes() + 4);
            const resetToken = await AuthenticationRepository.createPassWordToken(user.id, expirationTime);
            const requestUrl = `http://localhost:4200/reset-pass`
            if (user) {
                await MailSneder.sendMail({
                    from: 'happyshop@exaple.com',
                    to: email,
                    subject: "User registration success",
                    text: `Click this link to reset your password link:${requestUrl}`

                } as MailSendConfig)
            }
        }
        catch (err) {
            throw err;
        }
    }

}