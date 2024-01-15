import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../store/selectors/auth.selectors';
import { map, take } from 'rxjs';

export const UnauthorizedGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const isAuthenticated$ = store.select(selectIsAuthenticated);

  return isAuthenticated$.pipe(
    take(1),
    map((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        router.navigate(['/recipes']);
        return false;
      }

      return true;
    })
  );
};
