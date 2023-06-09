import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './user';
export interface AppState {
    user: fromUser.UserState;
};

export const reducers: ActionReducerMap<AppState> = {
    user: fromUser.reducer
}
export const effects = [
    fromUser.UserEffects
];