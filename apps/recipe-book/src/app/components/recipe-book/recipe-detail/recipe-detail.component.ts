import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../types/recipe.type';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectRecipeById } from '../../../store/selectors/recipes.selectors';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatMenuModule, MatListModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipe$!: Observable<Recipe | undefined>;
  paramsSubscription$!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.paramsSubscription$ = this.route.params.subscribe(params => {
      const recipeId = params?.['id'];
      if (recipeId) {
        this.recipe$ = this.store.select(selectRecipeById(recipeId));
      }
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription$?.unsubscribe();
  }

}
