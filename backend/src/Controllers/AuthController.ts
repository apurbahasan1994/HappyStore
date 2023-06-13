import { NextFunction, Request, Response } from "express";
import { BaseController } from "../BaseModels/BaseController";
import { AuthRequestHandler } from "../RequestHandlers/AuthRequestHandler";
import { SetResponseWithMessage } from "../Utils/SetResWithMessage";
import { TokenResponseDto } from "../ResponseDto/AuthResponseDto";
import { signUpDto } from "../RequstDto/SignUpDto";
import { Tokenify } from "../Utils/JsonTokenify";
import { EntityFieldValidator } from "../Validators/EntityValidator";
import { ResetPassDTO } from "../RequstDto/ResetPassDto";

export interface IAuthController {
  signUp(req: Request, res: Response, next: NextFunction): Promise<any>;
  signIn(req: Request, res: Response, next: NextFunction): Promise<any>;
  refresh(req: Request, res: Response, next: NextFunction): Promise<any>;
  forgotPassWord(req: Request, res: Response, next: NextFunction): Promise<any>;
  resetPassWord(req: Request, res: Response, next: NextFunction): Promise<any>;
}

export class AuthController extends BaseController implements IAuthController {
  private readonly requestHandler: AuthRequestHandler;
  constructor() {
    super();
    this.requestHandler = new AuthRequestHandler();
  }
  async forgotPassWord(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>>> {
    const { isEmpty } = EntityFieldValidator.vaidationErrors(req);
    if (!isEmpty) {
      SetResponseWithMessage.setErrorAndGoNext(
        "User not found with this email",
        400,
        res,
        next
      );
      return;
    }
    const { email } = req.body;
    try {
      await this.requestHandler.forgotPassWord(email);
      return res.status(200).json({ message: "success" });
    } catch (err) {
      SetResponseWithMessage.setErrorAndGoNext(err.message, 500, res, next);
    }
  }

  public async signUp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { isEmpty } = EntityFieldValidator.vaidationErrors(req);
    if (!isEmpty) {
      SetResponseWithMessage.setErrorAndGoNext(
        "Please check your submission more carefully",
        400,
        res,
        next
      );
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
      password,
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
      passwordHash: password,
    };

    try {
      await this.requestHandler.signUp(user);
      return res.status(200).json({ message: "Successfully Signed up" });
    } catch (e) {
      SetResponseWithMessage.setErrorAndGoNext(e.message, 500, res, next);
      return;
    }
  }

  public async signIn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { isEmpty } = EntityFieldValidator.vaidationErrors(req);
    if (!isEmpty) {
      SetResponseWithMessage.setErrorAndGoNext(
        "Invalid credentials",
        400,
        res,
        next
      );
      return;
    }
    const { email, password } = req.body;
    const isPassMatched = await this.requestHandler.checkValidPassWord(
      password,
      email
    );
    if (!isPassMatched) {
      SetResponseWithMessage.setErrorAndGoNext(
        "Invalid email or password",
        400,
        res,
        next
      );
      return;
    }
    try {
      const responseWithToken: TokenResponseDto | null =
        await this.requestHandler.signIn({ email, password });
      return res
        .status(200)
        .json({ message: "Successfully signed in", responseWithToken });
    } catch (e) {
      SetResponseWithMessage.setErrorAndGoNext(e.message, 500, res, next);
      return;
    }
  }

  /**
   * Generates new access token for the user
   * with the refresh token
   * @param req 
   * @param res 
   * @param next 
   * @returns 
   */
  public async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        SetResponseWithMessage.setErrorAndGoNext(
          "Token not valid",
          401,
          res,
          next
        );
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

  /**
   * Resets users password
   * expects token, email and password in request body
   * @param req 
   * @param res 
   * @param next 
   * @returns 
   */
  async resetPassWord(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const { isEmpty } = EntityFieldValidator.vaidationErrors(req);
      if (!isEmpty) {
        SetResponseWithMessage.setErrorAndGoNext(
          "Invalid payload object",
          400,
          res,
          next
        );
        return;
      }
      const { password, token, email } = req.body;
      const userData: ResetPassDTO = {
        email: email as string,
        password: password,
      };
      const updatable = await this.requestHandler.resetPassWord(
        userData,
        token
      );
      if (updatable) {
        res.status(204).json({ message: "Password reset successfull" });
        return;
      }
      SetResponseWithMessage.setErrorAndGoNext(
        "Invalid credentials",
        404,
        res,
        next
      );
      return;
    } catch (error) {
      SetResponseWithMessage.setErrorAndGoNext("Unauthorized", 401, res, next);
      return;
    }
  }
}
