import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { RecipesActions } from '../actions/recipes.actions';
import { Recipe } from '../../types/recipe.type';

export const recipesFeatureKey = 'recipes';

export interface RecipesState extends EntityState<Recipe> {
  loading: boolean;
}

export const recipesAdapter = createEntityAdapter<Recipe>();

export const initialState: RecipesState = recipesAdapter.getInitialState({
  loading: false
});

export const recipesReducer = createReducer(
  initialState,
  on(RecipesActions.load, (state) => ({ ...state, loading: true })),
  on(RecipesActions.loadSuccess, (state, { recipes }) =>
    recipesAdapter.setAll(recipes, { ...state, loading: false })
  ),
  on(RecipesActions.loadFailure, (state) => ({ ...state, loading: false }))
);
