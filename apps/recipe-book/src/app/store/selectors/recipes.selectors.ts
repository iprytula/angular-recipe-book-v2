import { createFeatureSelector, createSelector } from '@ngrx/store';
import { recipesFeatureKey, RecipesState, recipesAdapter } from '../reducers/recipes.reducer';

export const selectRecipesState = createFeatureSelector<RecipesState>(recipesFeatureKey);

export const {
  selectAll: selectRecipes,
  selectEntities: selectRecipeEntities,
  selectIds: selectRecipeIds,
  selectTotal: selectTotalRecipes,
} = recipesAdapter.getSelectors(selectRecipesState);

export const selectLoading = createSelector(
  selectRecipesState,
  state => state.loading
);

export const selectRecipeById = (recipeId: number) => createSelector(
  selectRecipeEntities,
  entities => entities[recipeId]
);
