import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
import { AppState } from '../';

export const getUserState = createFeatureSelector<AppState, UserState>('user');

export const getUser = createSelector(
  getUserState,
  (state: UserState) => state ? state.entity : null
);

export const getLoading = createSelector(
  getUserState,
  (state: UserState) => state ? state.loading : false
);

export const isAuthorized = createSelector(
  getUser,
  (user) => !!user
);
