import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../types/recipe.type';
import { ActivatedRoute } from '@angular/router';
import { recipes } from '../../const/recipes.const';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent {

  recipe: Recipe | null = null;
  paramsSubscription: Subscription | null = null;

  constructor( private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      if (params?.['id']) {
        this.recipe = this.getRecipeById(+params['id']);
      }
    });
  }

  getRecipeById(id: number): Recipe | null {
    const recipe = recipes.find(recipe => recipe.id === id)
    return recipe || null;
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }

}
