import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, first, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private _authService: AuthService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        return this._authService.checkUserValidity().pipe(
            catchError(() => {
                this.router.navigate(['/']);
                return of(false);
            }),
            switchMap(isAuthenticated => {
                if (isAuthenticated) {
                    return of(true);
                } else {
                    this.router.navigate(['/login']);
                    return of(false);
                }
            }),
            first()
        );

    }


}
