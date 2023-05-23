import User from "../../Models/User";
import { SigninDto } from "../../RequstDto/SignInDto";
import { signUpDto } from "../../RequstDto/SignUpDto";
import { TokenResponseDto } from "../../ResponseDto/AuthResponseDto";
import { Tokenify } from "../../Utils/JsonTokenify";
import { UserRepository } from "../User/UserRepository";

export class AuthenticationRepository {

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
                return Tokenify.generateTokens(user.dataValues);

            }
            return null
        }
        catch (e) {
            throw e;
        }
    }

    public async logOut() {

    }

}