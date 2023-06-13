
import * as fromActions from './products.actions';
import { Action } from "@ngrx/store";
import { All, Types } from "./products.actions";
import { IProduct } from '@app/shared/models/Backend/Product';

export const userReducerKey = 'user';
// stores data and current state of the data
export interface ProductsState {
    entity: IProduct[]
    uid: string;
    loading: boolean;
    error: string;
}

const initialState: ProductsState = {
    entity: [],
    uid: null,
    loading: null,
    error: null
};

export function productsReducer(state: ProductsState = initialState, action: All): ProductsState {
    switch (action.type) {
        case Types.GET_ALL_PRODUCTS:
            return { ...state, loading: true, error: '' };
        case Types.GET_ALL_PRODUCTS_SUCCESS:
            return { ...state, entity: (action as fromActions.GetAllProductsSuccess).products, loading: false };
        case Types.GET_ALL_PRODUCTS_ERROR:
            return { ...state, loading: false, error: 'Error getting users' };
        case Types.UPDATE_PRODCT:
            return { ...state, loading: true, error: '' };
        case Types.DELETE_PRODCT:
            return { ...state, loading: true, error: '' };
        case Types.UPDATE_PRODCT_SUCCESS:
            return updateUserSuccessReducer(state, action as fromActions.UpdateProductSuccess);
        case Types.DELETE_PRODCT_SUCCESS:
            return deleteUserSuccessReducer(state, action as fromActions.DeleteProductSuccess);
        case Types.UPDATE_PRODCT_ERROR:
            return { ...state, loading: false, error: (action as fromActions.UpdateProductError).error };
        case Types.DELETE_PRODCT_ERROR:
            return { ...state, loading: false, error: (action as fromActions.DeleteProductError).error };
        default:
            return state;
    }
}
// Helper function for handling UPDATE_PRODUCT_SUCCESS action
function updateUserSuccessReducer(state: ProductsState, action: fromActions.UpdateProductSuccess): ProductsState {
    const updatedProduct = action.product;
    const updatedEntity = state.entity.map(product => product.id === updatedProduct.id ? updatedProduct : product);
    return { ...state, entity: updatedEntity, loading: false };
}

// Helper function for handling DELETE_USER_SUCCESS action
function deleteUserSuccessReducer(state: ProductsState, action: fromActions.DeleteProductSuccess): ProductsState {
    const deletedProductId = action.id;
    const updatedEntity = state.entity.filter(product => product.id !== deletedProductId);
    return { ...state, entity: updatedEntity, loading: false };
}

export function ProductsReducer(state: ProductsState | undefined, action: Action) {
    return productsReducer(state, action);
}