import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { RecipesActions } from '../store/actions/recipes.actions';
import { selectRecipes, selectLoading } from '../store/selectors/recipes.selectors';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolver {
  constructor(private store: Store) {}

  resolve(): Observable<boolean> {
    return this.store.pipe(
      select(selectLoading),
      tap((loading) => {
        if (!loading) {
          this.store.dispatch(RecipesActions.load());
        }
      }),
      filter((loading) => !loading),
      switchMap(() =>
        this.store.pipe(
          select(selectRecipes),
          take(1),
          map((recipes) => !!recipes), // Map to a boolean
          catchError(() => of(false))
        )
      )
    );
  }
}
