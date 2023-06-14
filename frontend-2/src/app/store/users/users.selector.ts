import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';
import { AppState } from '..';

export const getUsersState = createFeatureSelector<AppState, UsersState>('users');

export const getUsers = createSelector(
  getUsersState,
  (state: UsersState) => state ? state.entity : null
);

export const getUserDetails = createSelector(
  getUsersState,
  (state: UsersState) => state ? state.detailedUser : null
);

export const getLoading = createSelector(
  getUsersState,
  (state: UsersState) => state ? state.loading : false
);

