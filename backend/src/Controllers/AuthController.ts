import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../BaseModels/BaseController';
import { AuthRequestHandler } from '../RequestHandlers/AuthRequestHandler';
import { SetResponseWithMessage } from '../Utils/SetResWithMessage';
import { TokenResponseDto } from '../ResponseDto/AuthResponseDto';
import { signUpDto } from '../RequstDto/SignUpDto';
import { Tokenify } from '../Utils/JsonTokenify';
import { EntityFieldValidator } from '../Validators/EntityValidator';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export interface IAuthController {
  signUp(req: Request, res: Response, next: NextFunction): Promise<any>;
  signIn(req: Request, res: Response, next: NextFunction): Promise<any>;
  refresh(req: Request, res: Response, next: NextFunction): void;
  forgotPassWord(req: Request, res: Response, next: NextFunction): void;
}

export class AuthController extends BaseController implements IAuthController {


  private readonly requestHandler: AuthRequestHandler;
  constructor() {
    super();
    this.requestHandler = new AuthRequestHandler();
  }
  async forgotPassWord(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { isEmpty } = EntityFieldValidator.vaidationErrors(req)
    if (!isEmpty) {
      SetResponseWithMessage.setErrorAndGoNext("User not found with this email", 400, res, next);
      return;
    }
    const { email } = req.body;
    try {
      await this.requestHandler.forgotPassWord(email);
    }
    catch (err) {
      SetResponseWithMessage.setErrorAndGoNext(err.message, 500, res, next);
    }
  }

  public async signUp(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { isEmpty } = EntityFieldValidator.vaidationErrors(req)
    if (!isEmpty) {
      SetResponseWithMessage.setErrorAndGoNext("Please check your submission more carefully", 400, res, next);
      return;
    }
    const {
      firstName,
      lastName,
      email,
      street,
      house,
      zip,
      city,
      country,
      phone,
      mobile,
      password
    } = req.body;
    const user: signUpDto = {
      firstName,
      lastName,
      email,
      zip,
      city,
      country,
      mobile,
      phone,
      house,
      street,
      passwordHash: password
    };

    try {
      await this.requestHandler.signUp(user)
      return res.status(200).json({ message: "Successfully Signed up" });
    }
    catch (e) {
      SetResponseWithMessage.setErrorAndGoNext(e.message, 500, res, next);
      return;
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { isEmpty } = EntityFieldValidator.vaidationErrors(req)
    if (!isEmpty) {
      SetResponseWithMessage.setErrorAndGoNext("Invalid credentials", 400, res, next);
      return;
    }
    const { email, password } = req.body;
    const isPassMatched = await this.requestHandler.checkValidPassWord(password, email);
    if (!isPassMatched) {
      SetResponseWithMessage.setErrorAndGoNext("Invalid email or password", 400, res, next);
      return;
    }
    try {
      const responseWithToken: TokenResponseDto | null = await this.requestHandler.signIn({ email, password });
      return res.status(200).json({ message: "Successfully signed in", responseWithToken });
    }
    catch (e) {
      SetResponseWithMessage.setErrorAndGoNext(e.message, 500, res, next);
      return;
    }
  }
  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        SetResponseWithMessage.setErrorAndGoNext("Token not valid", 401, res, next);
        return;
      }
      const decoded = Tokenify.verifyRefreshToken(refreshToken);
      const tokens = Tokenify.generateTokens(decoded);
      res.json(tokens);
    } catch (error) {
      SetResponseWithMessage.setErrorAndGoNext(error.message, 401, res, next);
      return;
    }
  }

}
