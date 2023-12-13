import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RecipesService } from '../../services/recipes.service';
import { RecipesActions } from '../actions/recipes.actions';

@Injectable()
export class RecipesEffects {

  constructor(
    private actions$: Actions,
    private recipesService: RecipesService
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


}
