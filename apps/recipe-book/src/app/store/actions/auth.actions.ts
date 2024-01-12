import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, props } from "@ngrx/store";
import { AuthResponse } from "../../interfaces/auth-response.interface";

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    signUp: props<{ email: string, password: string }>(),
    signUpSuccess: props<{ authResponse: AuthResponse }>(),
    signUpFailure: props<{ error: HttpErrorResponse }>(),
    signIn: props<{ email: string, password: string }>(),
    signInSuccess: props<{ authResponse: AuthResponse }>(),
    signInFailure: props<{ error: HttpErrorResponse }>(),
  }
})
