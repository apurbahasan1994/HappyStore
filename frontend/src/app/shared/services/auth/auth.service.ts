import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISignInAble, ISignUpAble } from '@app/shared/models/UserLogin';
import { LocalStoageToken } from '@app/shared/models/constant/constants';
import { EmailPasswordCredentials, IUserBase } from '@app/store/user/user.models';
import { environment } from '@src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements ISignInAble, ISignUpAble {
  baseUrl = environment.baseUrl;
  public isLoggedIn = false;
  constructor(private _http: HttpClient,) { }
  signUp(payload: IUserBase) {
    return this._http.post(`${this.baseUrl}auth/signUp`, payload);
  }
  signIn(payload: EmailPasswordCredentials) {
    return this._http.post(`${this.baseUrl}auth/signIn`, payload).pipe(map((response) => {
      this.isLoggedIn = true;
      return response;
    }));;
  }
  validateEmailAndSendResetPassEmail(email: string) {
    return this._http.post(`${this.baseUrl}auth/forgot`, email)
  }
  checkUserValidity() {
    return this._http.get(`${this.baseUrl}users/me`).pipe(map((response: { message: string, data: { user: IUserBase } }) => {
      this.isLoggedIn = true;
      return response;
    }));
  }

  signOut() {
    return of(true);
  }
  signOutWhileExpire() {
    this.isLoggedIn = false;
    localStorage.removeItem(LocalStoageToken.accessToken);
    localStorage.removeItem(LocalStoageToken.refreshToken);
  }
  resetPassWord(payload: { password: string, token: string, email: string }) {

    return this._http.post(`${this.baseUrl}auth/reset`, payload);

  }

  refreshToken(): Observable<any> {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    return this._http.post(`${this.baseUrl}auth/refresh`, { accessToken, refreshToken }).pipe(
      map((res: any) => {
        this.setAccessToken(res.accessToken);
        this.setRefreshToken(res.refreshToken);
        return res;
      }),
      catchError((err) => {
        return of(err);
      })
    );
  }
  setRefreshToken(token: string) {
    localStorage.setItem(LocalStoageToken.refreshToken, token);
  }
  setAccessToken(token: string) {
    localStorage.setItem(LocalStoageToken.accessToken, token);
  }
  public getAccessToken() {
    return localStorage.getItem(LocalStoageToken.accessToken);
  }
  public getRefreshToken() {
    return localStorage.getItem(LocalStoageToken.refreshToken);
  }

}
