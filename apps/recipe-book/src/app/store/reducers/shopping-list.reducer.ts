import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';
import { Ingredient } from '../../types/ingredient.type';
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
  on(ShoppingListActions.removeFromShoppingList, (state, { ingredient }) =>
    shoppingListAdapter.removeOne(ingredient.name, { ...state })
  )
);
