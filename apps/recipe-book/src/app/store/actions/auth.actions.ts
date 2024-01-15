import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { AuthData } from "../../interfaces/auth-data.interface";

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    signUp: props<{ email: string, password: string }>(),
    signUpSuccess: props<{ authData: AuthData }>(),
    signUpFailure: props<{ error: HttpErrorResponse }>(),
    signIn: props<{ email: string, password: string }>(),
    signInSuccess: props<{ authData: AuthData }>(),
    signInFailure: props<{ error: HttpErrorResponse }>(),
    logOut: emptyProps()
  }
})
