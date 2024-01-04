import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShoppingListState, shoppingListAdapter, shoppingListFeatureKey } from '../reducers/shopping-list.reducer';

export const selectShoppingListState = createFeatureSelector<ShoppingListState>(shoppingListFeatureKey);

export const {
  selectAll: selectShoppingList,
  selectEntities: selectShoppingListEntities,
  selectIds: selectShoppingListIds,
} = shoppingListAdapter.getSelectors(selectShoppingListState);

export const selectLoading = createSelector(
  selectShoppingListState,
  state => state.loading
);

export const selectIngredientById = (recipeId: number) => createSelector(
  selectShoppingListEntities,
  entities => entities[recipeId]
);

export const selectShoppingListError = createSelector(
  selectShoppingListState,
  state => state.error
)
