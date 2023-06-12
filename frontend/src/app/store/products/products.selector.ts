import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';
import { AppState } from '..';

export const getProductsState = createFeatureSelector<AppState, ProductsState>('products');

export const getProducts = createSelector(
  getProductsState,
  (state: ProductsState) => state ? state.entity : null
);

export const getLoading = createSelector(
  getProductsState,
  (state: ProductsState) => state ? state.loading : false
);

