import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { AuthActions } from "../actions/auth.actions";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap(({ email, password }) =>
        this.authService.signUp(email, password).pipe(
          map((authResponse) => AuthActions.signUpSuccess({ authResponse })),
          catchError(error => of(AuthActions.signUpFailure({ error })))
        )
      )
    )
  )

}
