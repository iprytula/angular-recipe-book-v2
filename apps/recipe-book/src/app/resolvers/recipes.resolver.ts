import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { RecipesActions } from '../store/actions/recipes.actions';
import { selectRecipes, selectLoading } from '../store/selectors/recipes.selectors';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolver {
  constructor(private store: Store) {}

  resolve(): Observable<boolean> {
    return this.store.pipe(
      select(selectRecipes),
      take(1),
      switchMap((recipes) => {
        if (!recipes.length) {
          this.store.dispatch(RecipesActions.load());
          return this.waitForRecipesToLoad();
        } else {
          return of(true);
        }
      }),
      catchError(() => of(false))
    );
  }

  private waitForRecipesToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(selectLoading),
      filter((loading) => !loading), // Wait until loading is complete
      take(1),
      map(() => true)
    );
  }
}
