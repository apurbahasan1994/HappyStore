import { AuthenticationRepository } from "../../Repositories/Authentication/AuthenticationRepository";
import { ResetPassDTO } from "../../RequstDto/ResetPassDto";
import { SigninDto } from "../../RequstDto/SignInDto";
import { signUpDto } from "../../RequstDto/SignUpDto";
import { TokenResponseDto } from "../../ResponseDto/AuthResponseDto";
import { UserService } from "../User/UserService";
import bcrypt from "bcrypt";
export interface IAuthenticationService {
  signUp(payload: signUpDto): Promise<boolean>;
  signIn(payload: SigninDto): Promise<TokenResponseDto | null>;
  checkPasswordValidity(
    password: string,
    email: string
  ): Promise<boolean | null>;
  forgotPassWord(email: string): Promise<any>;
  resetPassWord(userData: ResetPassDTO, email: string): Promise<any>;
}

export class AuthenticationService implements IAuthenticationService {
  private readonly authRepo: AuthenticationRepository;
  private readonly userService: UserService;
  constructor() {
    this.authRepo = new AuthenticationRepository();
    this.userService = new UserService();
  }

  /**
   * Sign up a user.
   *
   * @param {Object} payload - The sign up data.
   * @returns {Promise} - A promise that resolves to the response from the auth repository.
   * @throws {Error} - If an error occurs during the sign up process.
   */
  public async signUp(payload: signUpDto): Promise<any> {
    try {
      const response = await this.authRepo.signUp(payload);
      return response;
    } catch (e) {
      throw e;
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
      await this.authRepo.forgotPassWord(email);
    } catch (err) {
      throw err;
    }
  }

  /**
   * Reset the password for a user.
   *
   * @param {Object} userData - The new password data.
   * @param {string} token - The reset token.
   * @returns {Promise} - A promise that resolves to the updated user data.
   * @throws {Error} - If an error occurs during the password reset process.
   */
  public async resetPassWord(
    userData: ResetPassDTO,
    token: string
  ): Promise<any> {
    try {
      const updatable = await this.authRepo.resetPassWord(userData, token);
      return updatable;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Sign in a user.
   *
   * @param {Object} payload - The sign in data.
   * @returns {Promise} - A promise that resolves to the token response or null if sign in fails.
   * @throws {Error} - If an error occurs during the sign in process.
   */
  public async signIn(payload: SigninDto): Promise<TokenResponseDto | null> {
    try {
      const user = this.userService.getUserByEmail(payload.email);
      if (!user) {
        throw new Error("User not found");
      }
      const response: TokenResponseDto | null = await this.authRepo.signIn(
        payload
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Check the validity of a password for a given user.
   *
   * @param {string} password - The password to check.
   * @param {string} email - The email address of the user.
   * @returns {Promise} - A promise that resolves to true if the password is valid, or null if an error occurs.
   * @throws {Error} - If an error occurs during the password validation process.
   */
  public async checkPasswordValidity(
    password: string,
    email: string
  ): Promise<boolean | null> {
    try {
      const passwordHash = await this.userService.getUserPassWord(email);
      const matched = await bcrypt.compare(password, passwordHash);
      return matched;
    } catch (e) {
      throw e;
    }
  }
}
