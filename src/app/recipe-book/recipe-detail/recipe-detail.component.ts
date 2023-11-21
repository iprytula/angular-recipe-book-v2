import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../types/recipe.type';
import { ActivatedRoute } from '@angular/router';
import { recipes } from '../../const/recipes.const';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent {

  recipe: Recipe | null = null;

  constructor( private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.recipe = this.getRecipeById(+params['id']);
      }
    });
  }

  getRecipeById(id: number): Recipe | null {
    const recipe = recipes.find(recipe => recipe.id === id)
    return recipe || null;
  }

}
