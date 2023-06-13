// To start any data change in the store we need to call action
import { IUserBase } from "./users.models";
import { Action } from "@ngrx/store";

// enum to describe all the possible actions

export enum Types {

    GET_ALL_USERS = "[Users] Get all: Start",
    GET_ALL_USERS_SUCCESS = "[Users] Get all: Success",
    GET_ALL_USERS_ERROR = "[Users]  Get all: Error",

    GET_USER_DETAILS = "[Users] Get user deatils: Start",
    GET_USER_DETAILS_SUCCESS = "[Users] Get user details : Success",
    GET_USER_DETAILS_ERROR = "[Users]  Get user details : Error",

    DELETE_USER = "[Users] delete : Start",
    DELETE_USER_SUCCESS = "[Users] delete : Success",
    DELETE_USER_ERROR = "[Users]  delete : Error",

    UPDATE_USER = "[Users] update : Start",
    UPDATE_USER_SUCCESS = "[Users] update : Success",
    UPDATE_USER_ERROR = "[Users]  update : Error",

}

// get all

export class GelAllUsers implements Action {
    readonly type: string = Types.GET_ALL_USERS;
    constructor() { }
}

export class GelAllUsersSuccess implements Action {
    readonly type: string = Types.GET_ALL_USERS_SUCCESS;
    constructor(public users: IUserBase[]) { }
}

export class GelAllUsersError implements Action {
    readonly type: string = Types.GET_ALL_USERS_ERROR;
    constructor() { }
}



// get details

export class GetUserDetails implements Action {
    readonly type: string = Types.GET_USER_DETAILS;
    constructor(public id: number) { }
}

export class GetUserDetailsSuccess implements Action {
    readonly type: string = Types.GET_USER_DETAILS_SUCCESS;
    constructor(public user: IUserBase) { }
}

export class GetUserDetailsError implements Action {
    readonly type: string = Types.GET_USER_DETAILS_ERROR;
    constructor(public error:string) { }
}


// update 

export class UpdateUser implements Action {
    readonly type: string = Types.UPDATE_USER;
    constructor(public user: IUserBase) { }
}
export class UpdateUserSuccess implements Action {
    readonly type: string = Types.UPDATE_USER_SUCCESS;
    constructor(public user: IUserBase) { }
}

export class UpdateUserError implements Action {
    readonly type: string = Types.UPDATE_USER_ERROR;
    constructor(public error: string) { }
}

// sign up



export class DeleteUser implements Action {
    readonly type: string = Types.DELETE_USER;
    constructor(public id: number) { }
}
export class DeleteUserSuccess implements Action {
    readonly type: string = Types.DELETE_USER_SUCCESS;
    constructor(public id: number) { }
}

export class DeleteUserError implements Action {
    readonly type: string = Types.DELETE_USER_ERROR;
    constructor(public error: string) { }
}


export type All
    = GelAllUsers
    | GelAllUsersSuccess
    | GelAllUsersError
    | UpdateUser
    | UpdateUserSuccess
    | UpdateUserError
    | DeleteUser
    | DeleteUserSuccess
    | DeleteUserError
    | GetUserDetails
    | GetUserDetailsSuccess
    | GetUserDetailsError

