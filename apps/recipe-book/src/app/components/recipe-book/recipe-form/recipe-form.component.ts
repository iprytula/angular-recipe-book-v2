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
import { selectRecipeById, selectRecipes } from '../../../store/selectors/recipes.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit {

  recipeForm!: FormGroup;
  recipes$!: Observable<Recipe[]>;
  recipe$!: Observable<Recipe | undefined>;
  nextId: number = -1;
  editMode: boolean = false;
  recipeId: number = -1;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      name: ['', [Validators.required]],
      photoUrl: ['', [Validators.required]],
      description: ['', [Validators.required]],
      ingredients: this.fb.array([this.createIngredient()])
    });

    this.recipes$ = this.store.select(selectRecipes);

    this.route.data.subscribe(data => {
      this.editMode = data['editMode'] || false;

      if (this.editMode) {
        this.route.params.subscribe(params => {
          this.recipeId = params['id'];
          this.recipe$ = this.store.select(selectRecipeById(this.recipeId));

          this.recipe$.pipe(take(1)).subscribe(recipe => {
            if (recipe) {
              this.recipeForm.patchValue({
                name: recipe.name,
                photoUrl: recipe.photoUrl,
                description: recipe.description
              });

              const ingredientsFormArray = this.recipeForm.get('ingredients') as FormArray;
              while (ingredientsFormArray.length > 0) {
                this.removeIngredient(0);
              }

              recipe.ingredients.forEach(ingredient => {
                const ingredientGroup = this.createIngredient();
                ingredientGroup.patchValue({
                  name: ingredient.name,
                  amount: ingredient.amount.toString(),
                  units: ingredient.units
                });
                ingredientsFormArray.push(ingredientGroup);
              });
            }
          });
        });
      }
    });
  }

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  addIngredient() {
    const ingredientsArray = this.recipeForm.get('ingredients') as FormArray;
    ingredientsArray.push(this.createIngredient());
  }

  removeIngredient(index: number) {
    const ingredientsArray = this.recipeForm.get('ingredients') as FormArray;
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
    if (!this.editMode) {
      this.recipes$.pipe(take(1)).subscribe(recipes => {
        this.nextId = recipes.length + 1;
        const recipe = { ...this.recipeForm.value, id: this.nextId };
        this.store.dispatch(RecipesActions.addRecipe({ recipe }));
      });
      this.nextId++;
    } else {
      this.recipes$.pipe(take(1)).subscribe(recipes => {
        const ingredientsArrayValue = this.recipeForm.get('ingredients')?.value || [];
        const recipe = { ...this.recipeForm.value, id: this.recipeId, ingredients: ingredientsArrayValue };

        if (recipes) {
          const existingRecipeIndex = recipes.findIndex(existingRecipe => existingRecipe.id === this.recipeId);

          if (existingRecipeIndex !== -1) {
            recipes[existingRecipeIndex] = recipe;
          } else {
            recipes.push(recipe);
          }

          this.store.dispatch(RecipesActions.updateRecipe({ recipe, updatedRecipes: recipes }));
        }
      });
    }
  }

}
