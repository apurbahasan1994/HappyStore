import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISignInAble, ISignUpAble } from '@app/shared/models/UserLogin';
import { EmailPasswordCredentials, IUserBase } from '@app/store/user/user.models';
import { environment } from '@src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements ISignInAble, ISignUpAble {
  baseUrl = environment.baseUrl;
  public isLoggedIn = false;
  constructor(private _http: HttpClient) { }
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
    return this._http.post(`${this.baseUrl}auth/signIn`, { email })
  }
  checkUserValidity() {
    return this._http.get(`${this.baseUrl}users/me`).pipe(map((response) => {
      this.isLoggedIn = true;
      return response;
    }));
  }

  signOut() {
    return of(true);
  }
  signOutWhileExpire() {
    this.isLoggedIn = false;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
  refreshToken(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return this._http.post(`${this.baseUrl}auth/refresh`, { accessToken, refreshToken }).pipe(
      map((res: any) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        return res;
      }),
      catchError((err) => {
        return of(err);
      })
    );
  }

}
