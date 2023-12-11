import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../types/recipe.type';
import { recipes } from '../../const/recipes.const';
import { RecipeListComponent } from "../recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "../recipe-detail/recipe-detail.component";
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-recipe-book',
  standalone: true,
  templateUrl: './recipe-book.component.html',
  styleUrl: './recipe-book.component.scss',
  imports: [
    CommonModule,
    RecipeListComponent,
    RecipeDetailComponent,
    RouterModule,
    HttpClientModule,
  ],
})
export class RecipeBookComponent {
  bookRecipes: Recipe[] = recipes;

  constructor(private http: HttpClient) {}

  onFetchRecipes() {
    this.http.get('https://recipe-book-4f550-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
    .subscribe(response => console.log(response));
  }
}
