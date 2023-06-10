// To start any data change in the store we need to call action
import { IUserBase, EmailPasswordCredentials } from "./user.models";
import { Action } from "@ngrx/store";

// enum to describe all the possible actions

export enum Types {

    INIT = "[User] Init: Start",
    INIT_AUTHORIZED = "[User] Init: Authorized",
    INIT_UNAUTHORIZED = "[User] Init: Unauthorized",
    INIT_ERROR = "[User] Init: Error",


    SIGN_IN_EMAIL = "[User] Sign in with email: Start",
    SIGN_IN_EMAIL_SUCCESS = "[User] Sign in with email: Success",
    SIGN_IN_EMAIL_ERROR = "[User] Sign in with email: ERROR",

    SIGN_UP_EMAIL = "[User] Sign up with email: Start",
    SIGN_UP_EMAIL_SUCCESS = "[User] Sign up with email: Success",
    SIGN_UP_EMAIL_ERROR = "[User] Sign up with email: ERROR",

    SIGN_OUT_EMAIL = "[User] Sign out with email: Start",
    SIGN_OUT_EMAIL_SUCCESS = "[User] Sign out with email: Success",
    SIGN_OUT_EMAIL_ERROR = "[User] Sign out with email: ERROR",

    FORGOT_PASS_EMAIL = "[User] Forgot pass with email: Start",
    FORGOT_PASS_EMAIL_SUCCESS = "[User] Forgot in with email: Success",
    FORGOT_PASS_EMAIL_ERROR = "[User] Forgot in with email:error",

    RESET_PASSWORD = "[User] Reset Password: Start",
    RESET_PASSWORD_SUCCESS = "[User] Reset Password: Success",
    RESET_PASSWORD_ERROR = "[User] Reset Password: Error"
}

// init

export class Init implements Action {
    readonly type: string = Types.INIT;
    constructor() { }
}

export class InitAuthorized implements Action {
    readonly type: string = Types.INIT_AUTHORIZED;
    constructor(public user: IUserBase) { }
}

export class InitUnAuthorized implements Action {
    readonly type: string = Types.INIT_UNAUTHORIZED;
    constructor() { }
}

export class InitError implements Action {
    readonly type: string = Types.INIT_ERROR;
    constructor(public error: string) { }
}


// signin

export class SignInEmail implements Action {
    readonly type: string = Types.SIGN_IN_EMAIL;
    constructor(public credentials: EmailPasswordCredentials) { }
}
export class SignInEmailSuccess implements Action {
    readonly type: string = Types.SIGN_IN_EMAIL_SUCCESS;
    constructor(public user: IUserBase) { }
}

export class SignInEmailError implements Action {
    readonly type: string = Types.SIGN_IN_EMAIL_ERROR;
    constructor(public error: string) { }
}

// sign up



export class SignUpEmail implements Action {
    readonly type: string = Types.SIGN_UP_EMAIL;
    constructor(public user: IUserBase) { }
}
export class SignUpEmailSuccess implements Action {
    readonly type: string = Types.SIGN_UP_EMAIL_SUCCESS;
    constructor() { }
}

export class SignUpEmailError implements Action {
    readonly type: string = Types.SIGN_UP_EMAIL_ERROR;
    constructor(public error: string) { }
}


// sign out

export class SignOutEmail implements Action {
    readonly type: string = Types.SIGN_OUT_EMAIL;
    constructor() { }
}
export class SignOutSuccess implements Action {
    readonly type: string = Types.SIGN_OUT_EMAIL_SUCCESS;
    constructor() { }
}

export class SignOutError implements Action {
    readonly type: string = Types.SIGN_OUT_EMAIL_ERROR;
    constructor(public error: string) { }
}


// frgot pass
export class ForgotPassEmail implements Action {
    readonly type: string = Types.FORGOT_PASS_EMAIL;
    constructor(public email: string) { }
}

export class ForgotPassEmailSuccess implements Action {
    readonly type: string = Types.FORGOT_PASS_EMAIL_SUCCESS;
    constructor(public message: string) { }
}

export class ForgotPassEmailError implements Action {
    readonly type: string = Types.FORGOT_PASS_EMAIL_ERROR;
    constructor(public error: string) { }
}

// reset pass 
export class ResetPassword implements Action {
    readonly type = Types.RESET_PASSWORD;
    constructor(public newPassword: string, public resetToken: string) { }
}

export class ResetPasswordSuccess implements Action {
    readonly type = Types.RESET_PASSWORD_SUCCESS;
}

export class ResetPasswordError implements Action {
    readonly type = Types.RESET_PASSWORD_ERROR;
    constructor(public error: string) { }
}

export type All
    = SignInEmail
    | SignInEmailError
    | SignInEmailSuccess
    | SignUpEmail
    | SignUpEmailError
    | SignUpEmailSuccess
    | SignOutEmail
    | SignOutEmail
    | SignOutSuccess
    | Init
    | InitAuthorized
    | InitUnAuthorized
    | InitError
    | ForgotPassEmail
    | ForgotPassEmailSuccess
    | ForgotPassEmailError
    | ResetPassword
    | ResetPasswordSuccess
    | ResetPasswordError
