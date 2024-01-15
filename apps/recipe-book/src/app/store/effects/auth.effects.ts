import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { EMPTY, Observable, catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { AuthActions } from "../actions/auth.actions";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap(({ email, password }) =>
        this.authService.signUp(email, password).pipe(
          map((authData) => AuthActions.signUpSuccess({ authData })),
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
          map((authData) => AuthActions.signInSuccess({ authData })),
          catchError(error => of(AuthActions.signInFailure({ error })))
        )
      )
    )
  );

  signUpSuccess$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(AuthActions.signUpSuccess),
      switchMap((action) => {
        localStorage.setItem('auth', JSON.stringify(action.authData));
        this.router.navigate(['/recipes']);

        this.logOutWhenExpired(+action.authData.expiresIn);

        return EMPTY;
      })
    )
  );

  signInSuccess$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(AuthActions.signInSuccess),
      switchMap((action) => {
        localStorage.setItem('auth', JSON.stringify(action.authData));
        this.router.navigate(['/recipes']);

        this.logOutWhenExpired(+action.authData.expiresIn);

        return EMPTY;
      })
    )
  );

  logOut$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(AuthActions.logOut),
      switchMap(() => {
        localStorage.removeItem('auth');
        this.router.navigate(['/auth']);

        return EMPTY;
      })
    )
  );

  private logOutWhenExpired(expiresInSeconds: number) {
    const expiresInMilliseconds = expiresInSeconds * 1000;

    setTimeout(() => {
      this.store.dispatch(AuthActions.logOut());
      this.router.navigate(['/auth']);
    }, expiresInMilliseconds);
  }

}
