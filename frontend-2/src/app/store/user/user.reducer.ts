import { EmailPasswordCredentials, IUserBase } from "./user.models";
import * as fromActions from './user.actions';
import { Action } from "@ngrx/store";

export const userReducerKey = 'user';
// stores data and current state of the data
export interface UserState {
    entity: IUserBase;
    uid: string;
    loading: boolean;
    error: string;
}

const initialState: UserState = {
    entity: null,
    uid: null,
    loading: null,
    error: null
};

export function reducer(state = initialState, action: fromActions.All): UserState {

    switch (action.type) {

        // init
        case fromActions.Types.INIT:
            return { ...state, loading: true }
        case fromActions.Types.INIT_AUTHORIZED:
            return { ...state, loading: false, error: null, entity: (action as fromActions.InitAuthorized).user }
        case fromActions.Types.INIT_UNAUTHORIZED:

            return { ...state, loading: false, error: null, entity: null }
        case fromActions.Types.INIT_ERROR:
            return { ...state, loading: false, error: (action as fromActions.InitError).error }

        // signin
        case fromActions.Types.SIGN_IN_EMAIL:
            return { ...state, loading: true, error: null, entity: null }
        case fromActions.Types.SIGN_IN_EMAIL_SUCCESS:
            return { ...state, loading: false, error: null, entity: (action as fromActions.SignInEmailSuccess).user }
        case fromActions.Types.SIGN_IN_EMAIL_ERROR:
            return { ...state, loading: false, error: (action as fromActions.SignInEmailError).error, entity: null }

        // signup
        case fromActions.Types.SIGN_UP_EMAIL:
            return { ...state, loading: true, error: null, entity: (action as fromActions.SignUpEmail).user }
        case fromActions.Types.SIGN_UP_EMAIL_SUCCESS:
            return { ...state, loading: false, error: null, entity: null }
        case fromActions.Types.SIGN_UP_EMAIL_ERROR:
            return { ...state, loading: false, error: (action as fromActions.SignInEmailError).error }

        // signout
        case fromActions.Types.SIGN_OUT_EMAIL:
            return { ...state, loading: true, error: null, }
        case fromActions.Types.SIGN_OUT_EMAIL_SUCCESS:
            return { ...initialState }
        case fromActions.Types.SIGN_OUT_EMAIL_ERROR:
            return { ...state, loading: false, error: (action as fromActions.SignInEmailError).error }

        // forgot pass
        case fromActions.Types.FORGOT_PASS_EMAIL:
            return { ...state, loading: true, error: null }
        case fromActions.Types.FORGOT_PASS_EMAIL_SUCCESS:
            return { ...state, loading: false, error: null, }
        case fromActions.Types.FORGOT_PASS_EMAIL_ERROR:
            return { ...state, loading: false }

        // reset pass
        case fromActions.Types.RESET_PASSWORD:
            return { ...state, loading: true, error: null }
        case fromActions.Types.RESET_PASSWORD_SUCCESS:
            return { ...state, loading: false, error: null, }
        case fromActions.Types.RESET_PASSWORD_ERROR:
            return { ...state, loading: false }
        default: {
            return state;
        }
    }

}

export function UserReducer(state: UserState | undefined, action: Action) {
    return reducer(state, action);
}