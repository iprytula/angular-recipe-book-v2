import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Recipe } from '../../types/recipe.type';
import { HttpErrorResponse } from '@angular/common/http';

export const RecipesActions = createActionGroup({
  source: 'Recipes',
  events: {
    load: emptyProps(),
    loadSuccess: props<{ recipes: Recipe[] }>(),
    loadFailure: props<{ error: HttpErrorResponse }>(),
    addRecipe: props<{ recipe: Recipe }>(),
    addRecipeSuccess: props<{ recipe: Recipe }>(),
    addRecipeFailure: props<{ error: HttpErrorResponse }>(),
    updateRecipe: props<{ recipe: Recipe, updatedRecipes: Recipe[] }>(),
    updateRecipeSuccess: props<{ recipe: Recipe }>(),
    updateRecipeFailure: props<{ error: HttpErrorResponse }>(),
    deleteRecipe: props<{ recipe: Recipe, updatedRecipes: Recipe[] }>(),
    deleteRecipeSuccess: props<{ recipe: Recipe }>(),
    deleteRecipeFailure: props<{ error: HttpErrorResponse }>()
  }
});
