import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';
import { AuthResponse } from '../../interfaces/auth-response.interface';
import { HttpErrorResponse } from '@angular/common/http';

export const authFeatureKey = 'auth';

export interface AuthState {
  authData: AuthResponse | null;
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
  on(AuthActions.signInSuccess, (state, { authResponse }) => ({ ...state, authData: authResponse, loading: false })),
  on(AuthActions.signInFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(AuthActions.signUp, (state) => ({ ...state, loading: true })),
  on(AuthActions.signUpSuccess, (state, { authResponse }) => ({ ...state, authData: authResponse, loading: false })),
  on(AuthActions.signUpFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
