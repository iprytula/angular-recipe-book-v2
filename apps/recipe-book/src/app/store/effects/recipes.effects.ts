import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RecipesService } from '../../services/recipes.service';
import { RecipesActions } from '../actions/recipes.actions';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class RecipesEffects {

  constructor(
    private actions$: Actions,
    private recipesService: RecipesService,
    private router: Router
  ) {}

  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.load),
      switchMap(() =>
        this.recipesService.getRecipes().pipe(
          map((recipes) => RecipesActions.loadSuccess({ recipes })),
          catchError((error) => of(RecipesActions.loadFailure({ error })))
        )
      )
    )
  );

  addRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.addRecipe),
      switchMap((action) =>
        this.recipesService.addRecipe(action.recipe).pipe(
          map(() => RecipesActions.addRecipeSuccess({ recipe: action.recipe })),
          catchError((error) => of(RecipesActions.addRecipeFailure({ error })))
        )
      )
    )
  );

  addRecipeSuccess$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(RecipesActions.addRecipeSuccess),
      switchMap(({ recipe }) => {
        this.router.navigate(['/recipes', recipe.id]);

        return EMPTY;
      })
    )
  );

  deleteREcipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.deleteRecipe),
      switchMap((action) =>
        this.recipesService.deleteRecipe(action.updatedRecipes).pipe(
          map(() => RecipesActions.deleteRecipeSuccess({ recipe: action.recipe })),
          catchError((error) => of(RecipesActions.deleteRecipeFailure({ error })))
        )
      )
    )
  );

  deleteRecipeSuccess$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(RecipesActions.deleteRecipeSuccess),
      switchMap(() => {
        this.router.navigate(['/recipes']);

        return EMPTY;
      })
    )
  );

}
