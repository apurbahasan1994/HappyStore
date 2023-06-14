import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, zip } from 'rxjs';
import { map, switchMap, catchError, take, tap, skipWhile } from 'rxjs/operators';
import * as fromActions from './users.actions';
import { Injectable } from '@angular/core';
import { Types, } from './users.actions'; // Import action types
import { AuthService } from '@app/shared/services/auth/auth.service';
import { EmailPasswordCredentials, IUserBase } from './users.models';
import { NotificationService } from '@app/notification/notification.service';
import { Router } from '@angular/router';
import { UsersService } from '@app/Users/services/users.service';

type Action = fromActions.All;

@Injectable()
export class UsersEffects {
    constructor(private actions: Actions,
        private usersService: UsersService,
        private notificcation: NotificationService,
        private router: Router
    ) { }

    @Effect()
    getAllUser: Observable<Action> = this.actions.pipe(
        ofType(fromActions.Types.GET_ALL_USERS),
        switchMap((action: fromActions.GelAllUsers) => this.usersService.getAllUsers().pipe(
            map((response:any) => {
                return new fromActions.GelAllUsersSuccess(response.users);
            }),
            catchError((err) => {
                this.notificcation.error('Falid to load users');
                return of(new fromActions.GelAllUsersError());
            })
        )),

    )
    @Effect()
    getUserDetails: Observable<Action> = this.actions.pipe(
        ofType(fromActions.Types.GET_USER_DETAILS),
        switchMap((action: fromActions.GetUserDetails) => this.usersService.getUser(action.id).pipe(
            map((response: any) => {
                return new fromActions.GetUserDetailsSuccess(response.data.user);
            }),
            catchError((err) => {
                this.notificcation.error('Falid to get the user');
                return of(new fromActions.GetUserDetailsError('Falid to get the user'));
            })
        )),

    )

}