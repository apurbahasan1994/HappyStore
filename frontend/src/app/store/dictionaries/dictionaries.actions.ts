// To start any data change in the store we need to call action
import { Dictionaries } from "./dictionaries.models";
import { Action } from "@ngrx/store";

// enum to describe all the possible actions

export enum Types {
    READ = "[Dictionaries] Read: Start",
    READ_SUCCESS = "[Dictionaries] Read: Success",
    READ_ERROR = "[Dictionaries] Read: ERROR",
}

export class Read implements Action {
    readonly type: string = Types.READ;
    constructor() { }
}
export class ReadSuccess implements Action {
    readonly type: string = Types.READ_SUCCESS;
    constructor(public dictionaries: Dictionaries) { }
}

export class ReadError implements Action {
    readonly type: string = Types.READ_ERROR;
    constructor(public error: string) { }
}

export type All = Read | ReadError | ReadSuccess