import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { RecipesActions } from '../actions/recipes.actions';
import { Recipe } from '../../types/recipe.type';
import { HttpErrorResponse } from '@angular/common/http';

export const recipesFeatureKey = 'recipes';

export interface RecipesState extends EntityState<Recipe> {
  ids: number[];
  loading: boolean,
  error: HttpErrorResponse | null,
  addingRecipe: boolean
}

export const recipesAdapter = createEntityAdapter<Recipe>();

export const initialState: RecipesState = recipesAdapter.getInitialState({
  ids: [],
  loading: false,
  error: null,
  addingRecipe: false
});

export const recipesReducer = createReducer(
  initialState,
  on(RecipesActions.load, (state) => ({ ...state, loading: true })),
  on(RecipesActions.loadSuccess, (state, { recipes }) =>
    recipesAdapter.setAll(recipes, { ...state, loading: false })
  ),
  on(RecipesActions.loadFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(RecipesActions.addRecipe, (state) => ({ ...state, addingRecipe: true })),
  on(RecipesActions.addRecipeSuccess, (state, { recipe }) => {
    const updatedIds = [ recipe.id, ...state.ids ];
    const updatedEntities = { ...state.entities, [recipe.id]: recipe };

    return {
      ...state,
      ids: updatedIds,
      entities: updatedEntities,
      addingRecipe: false
    };
  }),
  on(RecipesActions.addRecipeFailure, (state, { error }) => ({ ...state, addingRecipe: false, error })),
  on(RecipesActions.deleteRecipeSuccess, (state, { recipe }) =>
    recipesAdapter.removeOne(recipe.id, { ...state })
  ),
  on(RecipesActions.updateRecipeSuccess, (state, { recipe }) =>
    recipesAdapter.updateOne({ id: recipe.id, changes: recipe }, { ...state })
  )
);
