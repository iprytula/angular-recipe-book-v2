import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { recipesFeatureKey, recipesReducer } from './store/reducers/recipes.reducer';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthEffects } from './store/effects/auth.effects';
import { RecipesEffects } from './store/effects/recipes.effects';
import { ShoppingListEffects } from './store/effects/shopping-list.effects';
import { authFeatureKey, authReducer } from './store/reducers/auth.reducer';
import { shoppingListFeatureKey, shoppingListReducer } from './store/reducers/shopping-list.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      [recipesFeatureKey]: recipesReducer,
      [shoppingListFeatureKey]: shoppingListReducer,
      [authFeatureKey]: authReducer
    }),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideEffects([RecipesEffects, ShoppingListEffects, AuthEffects]),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([AuthInterceptor])),
  ],
};
