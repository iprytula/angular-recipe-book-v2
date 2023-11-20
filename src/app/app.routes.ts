import { Routes } from '@angular/router';
import { RecipeBookComponent } from './recipe-book/recipe-book/recipe-book.component';

export const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipeBookComponent },
  { path: 'shopping-list', loadComponent: () => import('./shopping-list/shopping-list/shopping-list.component')
                                                .then(c => c.ShoppingListComponent) }
];
