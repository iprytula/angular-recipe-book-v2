import { Routes } from '@angular/router';
import { RecipeBookComponent } from './components/recipe-book/recipe-book/recipe-book.component';
import { RecipeResolver } from './resolvers/recipes.resolver';
import { ShoppingListResolver } from './resolvers/shopping-list.resolver';

export const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipeBookComponent,
    resolve: { recipes: RecipeResolver },
    loadChildren: () => import('./components/recipe-book/recipes.routes').then(r => r.recipesRoutes)
  },
  {
    path: 'shopping-list',
    loadComponent: () => import(
      './components/shopping-list/shopping-list/shopping-list.component'
    ).then(c => c.ShoppingListComponent),
    resolve: { shoppingList: ShoppingListResolver }
  },
];
