import { signUpDto } from "../RequstDto/SignUpDto";
import { SigninDto } from "../RequstDto/SignInDto";
import { AuthenticationService, IAuthenticationService } from "../Services/Authentication/AuthService";
import { TokenResponseDto } from "../ResponseDto/AuthResponseDto";
import { ResetPassDTO } from "../RequstDto/ResetPassDto";

export class AuthRequestHandler {

    private readonly authService: IAuthenticationService;

    constructor() {
        this.authService = new AuthenticationService()
    }

    /**
     * Helper method for sigup user
     * @param {signUpDto} payload : signUpDto
     * @returns {Promise<boolean>} response : Promise<boolean>
     */
    async signUp(payload: signUpDto): Promise<boolean> {
        try {
            const response = await this.authService.signUp(payload);
            return response;
        }
        catch (e) {
            throw e;
        }

    }

    /**
     * Helper method for forgot password
     * @param {string} email 
     */
    async forgotPassWord(email: string) {

        try {
            await this.authService.forgotPassWord(email);
        }
        catch (e) {

            throw e;
        }
    }

    /**
     * Helpe method for Signing in users
     * @param {SigninDto}  payload : SigninDto
     * @returns {Promise<TokenResponseDto | null>} response : TokenResponseDto
     */
    async signIn(payload: SigninDto): Promise<TokenResponseDto | null> {
        try {
            const response: TokenResponseDto | null = await this.authService.signIn(payload);
            return response;
        }
        catch (e) {
            throw e;
        }

    }
    
    /**
     * Helper method to check users validity
     * @param {string} password : string
     * @param {string} email :string
     * @returns { Promise<boolean | null>} isMatched :boolena
     */
    async checkValidPassWord(password: string, email: string): Promise<boolean | null> {
        try {
            const isMatched = await this.authService.checkPasswordValidity(password, email);
            return isMatched;
        }
        catch (e) {

        }
    }

    /**
     * Helper method to reset user password
     * @param {ResetPassDTO} userData : ResetPassDTO
     * @param {string} token : string 
     * @returns {Promise<boolean | null>} isUpdatable : boolean
     */
    async resetPassWord(userData: ResetPassDTO, token: string): Promise<boolean | null> {
        try {
            const isUpdatable = await this.authService.resetPassWord(userData, token);
            return isUpdatable;
        }
        catch (e) {
            throw e;
        }
    }


}