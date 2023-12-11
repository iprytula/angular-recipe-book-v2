import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../types/recipe.type';
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
  bookRecipes: Recipe[] = [];

  constructor(private http: HttpClient) {}
}
