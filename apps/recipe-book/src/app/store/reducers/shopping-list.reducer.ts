import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';
import { Ingredient } from '../../interfaces/ingredient.interface';
import { ShoppingListActions } from '../actions/shopping-list.actions';

export const shoppingListFeatureKey = 'shoppingList';

export interface ShoppingListState extends EntityState<Ingredient> {
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const shoppingListAdapter = createEntityAdapter<Ingredient>({
  selectId: (ingredient: Ingredient) => ingredient.name, // Use the name as the ID
});

export const initialState: ShoppingListState = shoppingListAdapter.getInitialState({
  loading: false,
  error: null,
});

export const shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.load, (state) => ({ ...state, loading: true })),
  on(ShoppingListActions.loadSuccess, (state, { ingredients }) =>
    shoppingListAdapter.setAll(ingredients, { ...state, loading: false })
  ),
  on(ShoppingListActions.loadFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(ShoppingListActions.addToShoppingList, (state, { ingredients }) => {
    const updatedIngredients = [...state.ids].reduce((acc, id) => {
      const existingIngredient = state.entities[id];
      const newIngredient = ingredients.find(ingredient => existingIngredient && ingredient.name === existingIngredient.name && ingredient.units === existingIngredient.units);

      if (existingIngredient && newIngredient) {
        const updatedAmount = existingIngredient.amount + newIngredient.amount;
        acc.push({ ...existingIngredient, amount: updatedAmount } as Ingredient);
      } else if (existingIngredient) {
        acc.push(existingIngredient);
      }
      return acc;
    }, [] as Ingredient[]);

    ingredients.forEach(newIngredient => {
      const exists = updatedIngredients.some(existingIngredient => existingIngredient.name === newIngredient.name && existingIngredient.units === newIngredient.units);
      if (!exists) {
        updatedIngredients.push(newIngredient as Ingredient);
      }
    });

    return shoppingListAdapter.setAll(updatedIngredients, { ...state });
  }),
  on(ShoppingListActions.removeFromShoppingList, (state, { ingredient }) =>
    shoppingListAdapter.removeOne(ingredient.name, { ...state })
  )
);
