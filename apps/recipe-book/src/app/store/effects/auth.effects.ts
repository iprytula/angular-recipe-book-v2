import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { EMPTY, Observable, catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { AuthActions } from "../actions/auth.actions";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap(({ email, password }) =>
        this.authService.signUp(email, password).pipe(
          map((authResponse) => AuthActions.signUpSuccess({ authResponse })),
          catchError(error => of(AuthActions.signUpFailure({ error })))
        )
      )
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      switchMap(({ email, password }) =>
        this.authService.signIn(email, password).pipe(
          map((authResponse) => AuthActions.signInSuccess({ authResponse })),
          catchError(error => of(AuthActions.signInFailure({ error })))
        )
      )
    )
  );

  signUpSuccess$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(AuthActions.signUpSuccess),
      switchMap((action) => {
        localStorage.setItem('auth', JSON.stringify(action.authResponse));

        return EMPTY;
      })
    )
  );

  signInSuccess$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(AuthActions.signInSuccess),
      switchMap((action) => {
        localStorage.setItem('auth', JSON.stringify(action.authResponse));

        return EMPTY;
      })
    )
  );

}
