import { Routes } from '@angular/router';
import { RecipeBookComponent } from './components/recipe-book/recipe-book/recipe-book.component';
import { RecipeDetailComponent } from './components/recipe-book/recipe-detail/recipe-detail.component';
import { RecipeDetailPlaceholderComponent } from './components/recipe-book/recipe-detail-placeholder/recipe-detail-placeholder.component';
import { RecipeResolver } from './resolvers/recipes.resolver';
import { RecipeFormComponent } from './components/recipe-book/recipe-form/recipe-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipeBookComponent, resolve: { recipes: RecipeResolver } , children: [
      { path: '',  component: RecipeDetailPlaceholderComponent, pathMatch: 'full' },
      { path: 'new', component: RecipeFormComponent },
      { path: ':id', component: RecipeDetailComponent },
    ]
  },
  {
    path: 'shopping-list', loadComponent: () => import('./components/shopping-list/shopping-list/shopping-list.component')
      .then(c => c.ShoppingListComponent)
  }
];
