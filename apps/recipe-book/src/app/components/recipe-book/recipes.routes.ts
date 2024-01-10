import { Routes } from "@angular/router";
import { RecipeDetailPlaceholderComponent } from "./recipe-detail-placeholder/recipe-detail-placeholder.component";
import { RecipeFormComponent } from "./recipe-form/recipe-form.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";

export const recipesRoutes: Routes = [
  { path: '',  component: RecipeDetailPlaceholderComponent, pathMatch: 'full' },
  { path: 'new', component: RecipeFormComponent },
  { path: ':id', component: RecipeDetailComponent },
  { path: 'edit/:id', component: RecipeFormComponent, data: { editMode: true } }
]
