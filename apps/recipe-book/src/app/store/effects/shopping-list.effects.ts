import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ShoppingListActions } from '../actions/shopping-list.actions';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';

@Injectable()
export class ShoppingListEffects {

  constructor(
    private actions$: Actions,
    private shoppingListService: ShoppingListService,
    private router: Router
  ) {}

  loadShoppingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingListActions.load),
      switchMap(() =>
        this.shoppingListService.getShoppingList().pipe(
          map((ingredients) => ShoppingListActions.loadSuccess({ ingredients })),
          catchError((error) => of(ShoppingListActions.loadFailure({error })))
        )
      )
    )
  );

  saveShoppingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingListActions.saveShoppingList),
      switchMap((action) =>
        this.shoppingListService.saveShoppingList(action.ingredients).pipe(
          map(() => ShoppingListActions.saveShoppingListSuccess({ ingredients: action.ingredients })),
          catchError((error) => of(ShoppingListActions.saveShoppingListFailure({ error })))
        )
      )
    )
  );

  addedToShoppingList$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(ShoppingListActions.addToShoppingList),
      switchMap(() => {
        this.router.navigate(['/shopping-list']);
        return EMPTY;
      })
    )
  );

}
