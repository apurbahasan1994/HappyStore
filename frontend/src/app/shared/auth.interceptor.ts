import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { LocalStoageToken } from './models/constant/constants';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store';
import { InitUnAuthorized } from '@app/store/user';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService, private router: Router,private store:Store<AppState>) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = localStorage.getItem(LocalStoageToken.accessToken);

    if (authToken) {
      request = this.addTokenToRequest(request, authToken);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          if (request.url.includes('/auth/refresh')) {
            this.router.navigate(['/login'])
            this._authService.signOutWhileExpire();
            this.store.dispatch(new InitUnAuthorized())
            return throwError(error);
          } else {
            return this._authService.refreshToken().pipe(
              catchError((error) => {
                this._authService.signOutWhileExpire();
                return throwError(error);
              }),
              mergeMap(() => {
                const newAuthToken = localStorage.getItem('accessToken');
                if (newAuthToken) {
                  const newRequest = this.addTokenToRequest(request, newAuthToken);
                  return next.handle(newRequest);
                } else {
                  this._authService.signOutWhileExpire();
                  this.store.dispatch(new InitUnAuthorized())
                  return throwError('Failed to refresh token');
                }
              })
            );
          }
        }
        return throwError(error);
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
