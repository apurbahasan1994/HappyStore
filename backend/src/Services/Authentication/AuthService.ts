import { AuthenticationRepository } from "../../Repositories/Authentication/AuthenticationRepository";
import { ResetPassDTO } from "../../RequstDto/ResetPassDto";
import { SigninDto } from "../../RequstDto/SignInDto";
import { signUpDto } from "../../RequstDto/SignUpDto";
import { ICreateUser } from "../../RequstDto/UserDto";
import { TokenResponseDto } from "../../ResponseDto/AuthResponseDto";
import { UserService } from "../User/UserService";
import bcrypt from 'bcrypt';
export interface IAuthenticationService {
    signUp(payload: signUpDto): Promise<boolean>;
    signIn(payload: SigninDto): Promise<TokenResponseDto | null>;
    checkPasswordValidity(password: string, email: string): Promise<boolean | null>;
    forgotPassWord(email: string);
    resetPassWord(userData:Partial<ResetPassDTO> , email: string)
}

export class AuthenticationService implements IAuthenticationService {


    private readonly authRepo: AuthenticationRepository;
    private readonly userService: UserService;
    constructor() {
        this.authRepo = new AuthenticationRepository();
        this.userService = new UserService();
    }

    public async signUp(payload: signUpDto) {
        try {
            const response = await this.authRepo.signUp(payload);
            return response;

        }
        catch (e) {
            throw e;
        }
    }

    public async forgotPassWord(email: string) {

        try {
            await this.authRepo.forgotPassWord(email);
        }
        catch (err) {
            throw err;
        }

    }


    public async resetPassWord(userData: Partial<ICreateUser>, token: string) {

        try {
            const updatable = await this.authRepo.resetPassWord(userData, token);
            return updatable;
        }
        catch (err) {
            throw err;
        }

    }

    public async signIn(payload: SigninDto): Promise<TokenResponseDto | null> {
        try {
            const user = this.userService.getUserByEmail(payload.email);
            if (!user) {
                throw new Error('User not found');
            }
            const response: TokenResponseDto | null = await this.authRepo.signIn(payload);
            return response;
        }
        catch (e) {
            throw e;
        }
    }

    public async checkPasswordValidity(password: string, email: string): Promise<boolean | null> {
        try {
            const passwordHash = await this.userService.getUserPassWord(email);
            const matched = await bcrypt.compare(password, passwordHash);
            return matched;
        }
        catch (e) {
            throw e;
        }
    }

}