import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, first, map } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/store';
import { isAuthorized } from '@app/store/user';

@Injectable({
  providedIn: 'root'
})
export class NoauthGuard implements CanActivate {

  constructor(private router: Router, private _authService: AuthService, store: Store<AppState>) {
    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this._authService.isLoggedIn;
  }
}
