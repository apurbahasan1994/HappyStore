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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService,private router:Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = localStorage.getItem('accessToken');
    const newReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next.handle(newReq).pipe(
      catchError((error) => {
        // Catch "401 Unauthorized" responses
        
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Sign out
          if (newReq.url.includes("/auth/refresh")) {
            this._authService.signOutWhileExpire();
            this.router.navigate(['/login']);
          } else {
            return this._authService.refreshToken().pipe(
              catchError((error) => {
                this._authService.signOutWhileExpire();
                this.router.navigate(['/login']);
                return throwError(error);
              }),
              mergeMap(() => next.handle(newReq))
            );
          }

          //Reload the app
          // location.reload();
        }

        return throwError(error);
      })
    );
  }
}
