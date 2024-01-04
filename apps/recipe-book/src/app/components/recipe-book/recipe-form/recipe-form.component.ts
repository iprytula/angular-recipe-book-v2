import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Recipe } from '../../../types/recipe.type';
import { RecipesActions } from '../../../store/actions/recipes.actions';
import { Observable, take } from 'rxjs';
import { selectRecipes } from '../../../store/selectors/recipes.selectors';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss',
})
export class RecipeFormComponent implements OnInit {

  newRecipeForm!: FormGroup;
  recipes$!: Observable<Recipe[]>;
  nextId: number = 0;

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.newRecipeForm = this.fb.group({
      name: ['', [Validators.required]],
      photoUrl: ['', [Validators.required]],
      description: ['', [Validators.required]],
      ingredients: this.fb.array([this.createIngredient()])
    });

    this.recipes$ = this.store.select(selectRecipes)
  }

  get ingredientControls() {
    return (this.newRecipeForm.get('ingredients') as FormArray).controls;
  }

  addIngredient() {
    const ingredientsArray = this.newRecipeForm.get('ingredients') as FormArray;
    ingredientsArray.push(this.createIngredient());
  }

  removeIngredient(index: number) {
    const ingredientsArray = this.newRecipeForm.get('ingredients') as FormArray;
    ingredientsArray.removeAt(index);
  }

  private createIngredient() {
    return this.fb.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      units: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const recipe = this.newRecipeForm.value;

    this.recipes$.pipe(take(1)).subscribe(recipes => {
      this.nextId = recipes.length + 1;
      const recipeWithId = { ...recipe, id: this.nextId };

      this.store.dispatch(RecipesActions.addRecipe({ recipe: recipeWithId }));
    });

    this.nextId++;
  }

}
