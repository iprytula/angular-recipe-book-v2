import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../types/recipe.type';
import { RecipeListComponent } from "../recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "../recipe-detail/recipe-detail.component";
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { selectLoading, selectRecipes } from '../../../store/selectors/recipes.selectors';
import { Store } from '@ngrx/store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule
  ],
})
export class RecipeBookComponent implements OnInit {

  recipes$!: Observable<Recipe[]>;
  loading$!: Observable<boolean>;


  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading);
    this.recipes$ = this.store.select(selectRecipes);
  }
}
