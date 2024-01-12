import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../interfaces/recipe.interface';
import { RecipeListComponent } from "../recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "../recipe-detail/recipe-detail.component";
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { selectLoading, selectRecipes, selectRecipesError } from '../../../store/selectors/recipes.selectors';
import { Store } from '@ngrx/store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

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
    MatProgressSpinnerModule,
    MatButtonModule
  ],
})
export class RecipeBookComponent implements OnInit {

  recipes$!: Observable<Recipe[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<HttpErrorResponse | null>;


  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading);
    this.recipes$ = this.store.select(selectRecipes);
    this.error$ = this.store.select(selectRecipesError);
  }
}
