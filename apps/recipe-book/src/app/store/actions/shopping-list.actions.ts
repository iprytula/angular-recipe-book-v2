import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Ingredient } from '../../types/ingredient.type';

export const ShoppingListActions = createActionGroup({
  source: 'ShoppingList',
  events: {
    load: emptyProps(),
    loadSuccess: props<{ ingredients: Ingredient[] }>(),
    loadFailure: props<{ error: HttpErrorResponse }>(),
    addToShoppingList: props<{ ingredients: Ingredient[] }>(),
    removeFromShoppingList: props<{ ingredient: Ingredient }>(),
    saveShoppingList: props<{ ingredients: Ingredient[] }>(),
    saveShoppingListSuccess: props<{ ingredients: Ingredient[] }>(),
    saveShoppingListFailure: props<{ error: HttpErrorResponse }>()
  }
});
