import { Routes } from '@angular/router';
import { RecipeBookComponent } from './recipe-book/recipe-book/recipe-book.component';
import { RecipeDetailComponent } from './recipe-book/recipe-detail/recipe-detail.component';
import { RecipeDetailPlaceholderComponent } from './recipe-book/recipe-detail-placeholder/recipe-detail-placeholder.component';

export const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipeBookComponent, children: [
      { path: '',  component: RecipeDetailPlaceholderComponent, pathMatch: 'full' },
      { path: ':id', component: RecipeDetailComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'shopping-list', loadComponent: () => import('./shopping-list/shopping-list/shopping-list.component')
      .then(c => c.ShoppingListComponent)
  }
];
