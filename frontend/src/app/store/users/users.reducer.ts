import { EmailPasswordCredentials, IUserBase } from "./users.models";
import * as fromActions from './users.actions';
import { Action } from "@ngrx/store";
import { All, Types } from "./users.actions";

export const userReducerKey = 'user';
// stores data and current state of the data
export interface UsersState {
    entity: IUserBase[]
    detailedUser:IUserBase,
    uid: string;
    loading: boolean;
    error: string;
}

const initialState: UsersState = {
    entity: [],
    detailedUser:null,
    uid: null,
    loading: null,
    error: null
};

export function usersReducer(state: UsersState = initialState, action: All): UsersState {
    switch (action.type) {
        case Types.GET_ALL_USERS:
            return { ...state, loading: true, error: '' };
        case Types.GET_ALL_USERS_SUCCESS:
            return { ...state, entity: (action as fromActions.GelAllUsersSuccess).users, loading: false };
        case Types.GET_ALL_USERS_ERROR:
            return { ...state, loading: false, error: 'Error getting users' };
        case Types.UPDATE_USER:
            return { ...state, loading: true, error: '' };
        case Types.DELETE_USER:
            return { ...state, loading: true, error: '' };
        case Types.UPDATE_USER_SUCCESS:
            return updateUserSuccessReducer(state, action as fromActions.UpdateUserSuccess);
        case Types.DELETE_USER_SUCCESS:
            return deleteUserSuccessReducer(state, action as fromActions.DeleteUserSuccess);
        case Types.UPDATE_USER_ERROR:
            return { ...state, loading: false, error: (action as fromActions.UpdateUserError).error };
        case Types.DELETE_USER_ERROR:
            return { ...state, loading: false, error: (action as fromActions.DeleteUserError).error };
        case Types.GET_USER_DETAILS:
            return {...state, loading:true,error:''};
        case Types.GET_USER_DETAILS_SUCCESS:
            return {...state,loading:false,error:'',detailedUser:(action as fromActions.GetUserDetailsSuccess).user};
        case Types.GET_USER_DETAILS_ERROR:
            return { ...state, loading: false, error: (action as fromActions.GetUserDetailsError).error };
        default:
            return state;
    }
}
// Helper function for handling UPDATE_USER_SUCCESS action
function updateUserSuccessReducer(state: UsersState, action: fromActions.UpdateUserSuccess): UsersState {
    const updatedUser = action.user;
    const updatedEntity = state.entity.map(user => user.id === updatedUser.id ? updatedUser : user);
    return { ...state, entity: updatedEntity, loading: false };
}

// Helper function for handling DELETE_USER_SUCCESS action
function deleteUserSuccessReducer(state: UsersState, action: fromActions.DeleteUserSuccess): UsersState {
    const deletedUserId = action.id;
    const updatedEntity = state.entity.filter(user => user.id !== deletedUserId);
    return { ...state, entity: updatedEntity, loading: false };
}

export function UsersReducer(state: UsersState | undefined, action: Action) {
    return usersReducer(state, action);
}