import { signUpDto } from "../RequstDto/SignUpDto";
import { SigninDto } from "../RequstDto/SignInDto";
import { AuthenticationService, IAuthenticationService } from "../Services/Authentication/AuthService";
import { TokenResponseDto } from "../ResponseDto/AuthResponseDto";
import { ICreateUser } from "../RequstDto/UserDto";
import { ResetPassDTO } from "../RequstDto/ResetPassDto";

export class AuthRequestHandler {

    private readonly authService: IAuthenticationService;

    constructor() {
        this.authService = new AuthenticationService()
    }

    async signUp(payload: signUpDto) {
        try {
            const response = await this.authService.signUp(payload);
            return response;
        }
        catch (e) {
            throw e;
        }

    }

    async forgotPassWord(email: string) {

        try {
            await this.authService.forgotPassWord(email);
        }
        catch (e) {

            throw e;
        }
    }

    async signIn(payload: SigninDto): Promise<TokenResponseDto | null> {
        try {
            const response: TokenResponseDto | null = await this.authService.signIn(payload);
            return response;
        }
        catch (e) {
            throw e;
        }

    }

    async checkValidPassWord(password: string, email: string): Promise<boolean | null> {
        try {
            const isMatched = await this.authService.checkPasswordValidity(password, email);
            return isMatched;
        }
        catch (e) {

        }
    }

    async resetPassWord(userData: Partial<ResetPassDTO>, token: string): Promise<boolean | null> {
        try {
            const isUpdatable = await this.authService.resetPassWord(userData, token);
            return isUpdatable;
        }
        catch (e) {
            throw e;
        }
    }


}