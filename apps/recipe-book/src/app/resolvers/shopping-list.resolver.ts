import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { ShoppingListActions } from '../store/actions/shopping-list.actions';
import { selectShoppingList, selectLoading } from '../store/selectors/shopping-list.selectors';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListResolver {
  constructor(private store: Store) {}

  resolve(): Observable<boolean> {
    return this.store.pipe(
      select(selectShoppingList),
      take(1),
      switchMap((shoppingList) => {
        if (!shoppingList.length) {
          this.store.dispatch(ShoppingListActions.load());
          return this.waitForShoppingListToLoad();
        } else {
          return of(true);
        }
      }),
      catchError(() => of(false))
    );
  }

  private waitForShoppingListToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(selectLoading),
      filter((loading) => !loading),
      take(1),
      map(() => true)
    );
  }
}
