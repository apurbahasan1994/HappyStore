import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISignInAble, ISignUpAble } from '@app/shared/models/UserLogin';
import { EmailPasswordCredentials, IUserBase } from '@app/store/user/user.models';
import { environment } from '@src/environments/environment';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements ISignInAble, ISignUpAble {
  baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient) { }
  signUp(payload: IUserBase) {
    return this._http.post(`${this.baseUrl}auth/signUp`, payload);
  }
  signIn(payload: EmailPasswordCredentials) {
    return this._http.post(`${this.baseUrl}auth/signIn`, payload);
  }
  validateEmailAndSendResetPassEmail(email: string) {
    return this._http.post(`${this.baseUrl}auth/signIn`, { email })
  }
  checkUserValidity() {
    return this._http.get(`${this.baseUrl}users/me`);
  }
  signOut() {
    return of(true);
  }
  signOutWhileExpire() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
  refreshToken(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('accessToken');
    return this._http.post(`${this.baseUrl}auth/refresh`, { accessToken, refreshToken });
  }

}
