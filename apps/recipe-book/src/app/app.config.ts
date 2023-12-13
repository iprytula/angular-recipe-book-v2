import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { recipesFeatureKey, recipesReducer } from './store/reducers/recipes.reducer';
import { RecipesEffects } from './store/effects/recipes.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      [recipesFeatureKey]: recipesReducer
    }),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideEffects([ RecipesEffects ]),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient()
  ],
};
