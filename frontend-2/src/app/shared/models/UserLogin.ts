import { Observable } from "rxjs";
import { IUserBase } from "./Backend/User";


export interface ISignInRequestDto{
    email:string;
    password:string;
}

export interface ISignInAble {

    signIn(payload:ISignInRequestDto):Observable<any>;

}

export interface ISignUpAble {
    signUp(payload:Partial<IUserBase>):Observable<any>;

}


export interface IUserLogin {

}