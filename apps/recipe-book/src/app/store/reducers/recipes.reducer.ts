import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { RecipesActions } from '../actions/recipes.actions';
import { Recipe } from '../../types/recipe.type';
import { HttpErrorResponse } from '@angular/common/http';

export const recipesFeatureKey = 'recipes';

export interface RecipesState extends EntityState<Recipe> {
  loading: boolean,
  error: HttpErrorResponse | null
}

export const recipesAdapter = createEntityAdapter<Recipe>();

export const initialState: RecipesState = recipesAdapter.getInitialState({
  loading: false,
  error: null
});

export const recipesReducer = createReducer(
  initialState,
  on(RecipesActions.load, (state) => ({ ...state, loading: true })),
  on(RecipesActions.loadSuccess, (state, { recipes }) =>
    recipesAdapter.setAll(recipes, { ...state, loading: false })
  ),
  on(RecipesActions.loadFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
