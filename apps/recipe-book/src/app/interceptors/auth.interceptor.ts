import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthData } from '../store/selectors/auth.selectors';
import { switchMap, take } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const authData$ = store.select(selectAuthData);

  return authData$.pipe(
    take(1),
    switchMap(authData => {
      if (authData && authData.idToken) {
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', authData.idToken)
        });

        return next(modifiedReq);
      } else {
        return next(req);
      }
    })
  );
};
