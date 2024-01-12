import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';
import { AuthResponse } from '../../interfaces/auth-response.interface';
import { HttpErrorResponse } from '@angular/common/http';

export const authFeatureKey = 'auth';

export interface AuthState {
  authData: AuthResponse | null;
  error: HttpErrorResponse | null;
}

export const authInitialState: AuthState = {
  authData: null,
  error: null
};

export const authReducer = createReducer(
  authInitialState,
  on(AuthActions.signInSuccess, (state, { authResponse }) => ({ ...state, authData: authResponse })),
  on(AuthActions.signUpSuccess, (state, { authResponse }) => ({ ...state, authData: authResponse })),
  on(AuthActions.signUpFailure, (state, { error }) => ({...state, error}))
);
