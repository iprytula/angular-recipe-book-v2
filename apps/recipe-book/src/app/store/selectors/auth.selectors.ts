import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthData = createSelector(
  selectAuthState,
  (state) => state.authData
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectIsAuthenticated = createSelector(
  selectAuthData,
  (authData) => !!authData
);
