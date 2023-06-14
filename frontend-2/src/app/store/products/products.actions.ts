// To start any data change in the store we need to call action
import { IProduct } from "@app/shared/models/Backend/Product";
import { Action } from "@ngrx/store";

// enum to describe all the possible actions

export enum Types {

    GET_ALL_PRODUCTS = "[Products] Get all: Start",
    GET_ALL_PRODUCTS_SUCCESS = "[Products] Get all: Success",
    GET_ALL_PRODUCTS_ERROR = "[Products]  Get all: Error",

    DELETE_PRODCT = "[Products] delete : Start",
    DELETE_PRODCT_SUCCESS = "[Products] delete : Success",
    DELETE_PRODCT_ERROR = "[Products]  delete : Error",

    UPDATE_PRODCT = "[Products] update : Start",
    UPDATE_PRODCT_SUCCESS = "[Products] update : Success",
    UPDATE_PRODCT_ERROR = "[Products]  update : Error",

}

// get all

export class GetAllProducts implements Action {
    readonly type: string = Types.GET_ALL_PRODUCTS;
    constructor() { }
}

export class GetAllProductsSuccess implements Action {
    readonly type: string = Types.GET_ALL_PRODUCTS_SUCCESS;
    constructor(public products: IProduct[]) { }
}

export class GetAllProductsError implements Action {
    readonly type: string = Types.GET_ALL_PRODUCTS_ERROR;
    constructor() { }
}


// update 

export class UpdateProduct implements Action {
    readonly type: string = Types.UPDATE_PRODCT;
    constructor(public product: IProduct) { }
}
export class UpdateProductSuccess implements Action {
    readonly type: string = Types.UPDATE_PRODCT_SUCCESS;
    constructor(public product: IProduct) { }
}

export class UpdateProductError implements Action {
    readonly type: string = Types.UPDATE_PRODCT_ERROR;
    constructor(public error: string) { }
}

// sign up



export class DeleteProduct implements Action {
    readonly type: string = Types.DELETE_PRODCT;
    constructor(public id: number) { }
}
export class DeleteProductSuccess implements Action {
    readonly type: string = Types.DELETE_PRODCT_SUCCESS;
    constructor(public id: number) { }
}

export class DeleteProductError implements Action {
    readonly type: string = Types.DELETE_PRODCT_ERROR;
    constructor(public error: string) { }
}


export type All
    = GetAllProducts
    | GetAllProductsSuccess
    | GetAllProductsError
    | UpdateProduct
    | UpdateProductSuccess
    | UpdateProductError
    | DeleteProduct
    | DeleteProductSuccess
    | DeleteProductError
