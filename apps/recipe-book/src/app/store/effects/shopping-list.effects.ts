import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ShoppingListActions } from '../actions/shopping-list.actions';
import { ShoppingListService } from '../../services/shopping-list.service';

@Injectable()
export class ShoppingListEffects {

  constructor(
    private actions$: Actions,
    private shoppingListService: ShoppingListService,
    // private router: Router
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

  // loadRecipes$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(RecipesActions.load),
  //     switchMap(() =>
  //       this.recipesService.getRecipes().pipe(
  //         map((recipes) => RecipesActions.loadSuccess({ recipes })),
  //         catchError((error) => of(RecipesActions.loadFailure({ error })))
  //       )
  //     )
  //   )
  // );

  // addRecipe$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(RecipesActions.addRecipe),
  //     switchMap((action) =>
  //       this.recipesService.addRecipe(action.recipe).pipe(
  //         map(() => RecipesActions.addRecipeSuccess({ recipe: action.recipe })),
  //         catchError((error) => of(RecipesActions.addRecipeFailure({ error })))
  //       )
  //     )
  //   )
  // );

  // addRecipeSuccess$ = createEffect((): Observable<Action> =>
  //   this.actions$.pipe(
  //     ofType(RecipesActions.addRecipeSuccess),
  //     switchMap(({ recipe }) => {
  //       this.router.navigate(['/recipes', recipe.id]);

  //       return EMPTY;
  //     })
  //   )
  // );

}
