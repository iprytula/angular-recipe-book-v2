import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';
import { AuthData } from '../../interfaces/auth-data.interface';
import { HttpErrorResponse } from '@angular/common/http';

export const authFeatureKey = 'auth';

export interface AuthState {
  authData: AuthData | null;
  error: HttpErrorResponse | null;
  loading: boolean;
}

export const authInitialState: AuthState = {
  authData: null,
  error: null,
  loading: false
};

export const authReducer = createReducer(
  authInitialState,
  on(AuthActions.signIn, (state) => ({ ...state, loading: true })),
  on(AuthActions.signInSuccess, (state, { authData }) => ({ ...state, authData: authData, loading: false })),
  on(AuthActions.signInFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(AuthActions.signUp, (state) => ({ ...state, loading: true })),
  on(AuthActions.signUpSuccess, (state, { authData }) => ({ ...state, authData: authData, loading: false })),
  on(AuthActions.signUpFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(AuthActions.logOut, (state) => ({ ...state, authData: null, error: null }))
);
