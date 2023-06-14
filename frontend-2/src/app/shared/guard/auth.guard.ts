import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map, } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store';
import { IUserBase } from '../models/Backend/User';
import { InitAuthorized, InitUnAuthorized } from '@app/store/user';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private _authService: AuthService,private store:Store<AppState>) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._authService.checkUserValidity().pipe(
          map((res:{message:string,data:{user:IUserBase}}) => {
            if (res) {
              this.store.dispatch(new InitAuthorized(res.data.user));
              return true;
            } else {
              this.store.dispatch(new InitUnAuthorized());
              this.router.navigate(['/login']);
              return false;
            }
          }),
          catchError((err) => {
            this.store.dispatch(new InitUnAuthorized());
            this.router.navigate(['/']);
            return of(false);
          })
        );
      }

}
