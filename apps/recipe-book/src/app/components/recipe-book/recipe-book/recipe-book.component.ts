import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../types/recipe.type';
import { RecipeListComponent } from "../recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "../recipe-detail/recipe-detail.component";
import { RouterModule } from '@angular/router';
import { RecipesService } from '../../../services/recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-book',
  standalone: true,
  templateUrl: './recipe-book.component.html',
  styleUrl: './recipe-book.component.scss',
  imports: [
    CommonModule,
    RecipeListComponent,
    RecipeDetailComponent,
    RouterModule
  ],
})
export class RecipeBookComponent implements OnInit, OnDestroy {
  bookRecipes: Recipe[] = [];
  recipesSubscription: Subscription | null = null;

  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {
    this.recipesSubscription = this.recipeService.getRecipes().subscribe(response => {
      this.bookRecipes = [...response];
    });
  }

  ngOnDestroy(): void {
    this.recipesSubscription?.unsubscribe();
  }
}
