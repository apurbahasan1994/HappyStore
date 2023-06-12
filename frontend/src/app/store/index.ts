import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './user';
import * as fromUsers from './users';
import * as fromProducts from './products';
export interface AppState {
    user: fromUser.UserState;
    users: fromUsers.UsersState,
    products:fromProducts.ProductsState
};

export const reducers: ActionReducerMap<AppState> = {
    user: fromUser.reducer,
    users: fromUsers.usersReducer,
    products: fromProducts.productsReducer
}
export const effects = [
    fromUser.UserEffects,
    fromUsers.UsersEffects
];