import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, zip } from 'rxjs';
import { map, switchMap, catchError, take, tap } from 'rxjs/operators';
import * as fromActions from './user.actions';
import { Injectable } from '@angular/core';
import { Types, InitAuthorized, SignUpEmail, SignUpEmailSuccess, SignUpEmailError, SignInEmail, SignInEmailSuccess, SignInEmailError, SignOutEmail, SignOutSuccess, SignOutError, InitUnAuthorized, InitError } from './user.actions'; // Import action types
import { AuthService } from '@app/shared/services/auth/auth.service';
import { EmailPasswordCredentials, IUserBase } from './user.models';
import { NotificationService } from '@app/notification/notification.service';
import { Router } from '@angular/router';

type Action = fromActions.All;

@Injectable()
export class UserEffects {
    constructor(private actions: Actions,
        private authService: AuthService,
        private notificcation: NotificationService,
        private router: Router
    ) { }


    @Effect()
    init: Observable<Action> = this.actions.pipe(
        ofType(Types.INIT),
        switchMap((_) => {
            return this.authService.checkUserValidity().pipe(
                map((response: any) => {
                    if (response.status === 200) {
                        const user = response.data.user;
                        this.authService.isLoggedIn = true;
                        return new InitAuthorized(user);
                    }
                    else {
                        return new InitUnAuthorized();
                    }
                }),
                catchError(error => {
                    this.authService.isLoggedIn = false;
                    this.router.navigateByUrl('/')
                    return of(new InitError(error.message))
                })
            )
        }),

    )

    @Effect()
    signUpEmail: Observable<Action> = this.actions.pipe(
        ofType(Types.SIGN_UP_EMAIL),
        map((action: SignUpEmail) => action.user),
        switchMap((user: IUserBase) => {
            return this.authService.signUp(user).pipe(
                map((_) => {
                    this.notificcation.success('Successfully signed up')
                    this.router.navigate(['/signup/success']);
                    return new SignUpEmailSuccess()
                }),
                catchError((error) => {
                    this.notificcation.error(error.message);
                    return of(new SignUpEmailError(error.message));
                })
            )
        }),
    );

    @Effect()
    signInEmail: Observable<Action> = this.actions.pipe(
        ofType(Types.SIGN_IN_EMAIL),
        map((action: SignInEmail) => action.credentials),
        switchMap((credentials: EmailPasswordCredentials) => {
            return this.authService.signIn(credentials).pipe(

                map((response: any) => {
                    const { user, accessToken, refreshToken } = response.responseWithToken;
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    this.router.navigateByUrl('');
                    this.notificcation.success('Successfully logged in');
                    return new SignInEmailSuccess(user)
                }),
                catchError((error) => {
                    this.notificcation.error(error.message);
                    return of(new SignInEmailError(error.message));
                })
            )
        }),

    );

    @Effect()
    signOutEmail: Observable<Action> = this.actions.pipe(
        ofType(Types.SIGN_OUT_EMAIL),
        map((action: SignOutEmail) => of(true)),
        switchMap((_) => {
            return this.authService.signOut().pipe(
                map((_) => {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    return new SignOutSuccess()
                }),
                catchError((error) => {
                    this.notificcation.error(error.message);
                    return of(new SignOutError(error.message));
                })
            )
        }),
    );
    
    @Effect()
    forgotPass: Observable<Action> = this.actions.pipe(
        ofType(Types.FORGOT_PASS_EMAIL),
        map((action: fromActions.ForgotPassEmail) => action.email),
        switchMap((email: string) => this.authService.validateEmailAndSendResetPassEmail(email)

            .pipe(
                map((_) => {
                    this.notificcation.success('Successfull, and email is sent to you inbox with reset passwork link');
                    return new fromActions.ForgotPassEmailSuccess('sucessfull')
                }),
                catchError(err => {
                    this.notificcation.error(err.message);
                    return of(new fromActions.ForgotPassEmailError(err.message))
                })
            )
        ),

    )

    @Effect()
    resetPass: Observable<Action> = this.actions.pipe(
        ofType(Types.RESET_PASSWORD),
        map((action: fromActions.ResetPassword) => {
            return { password: action.newPassword, token: action.resetToken };
        }),
        switchMap((payload: { password: string, token: string }) => this.authService.resetPassWord(payload)

            .pipe(
                map((_) => {
                    this.notificcation.success('Successfully');
                    return new fromActions.ResetPasswordSuccess()
                }),
                catchError(err => {
                    this.notificcation.error(err.message);
                    return of(new fromActions.ResetPasswordError(err.message))
                })
            )
        ),

    )
}