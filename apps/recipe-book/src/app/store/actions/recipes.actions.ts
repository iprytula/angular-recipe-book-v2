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
    addRecipeFailure: props<{ error: HttpErrorResponse }>()
  }
});
