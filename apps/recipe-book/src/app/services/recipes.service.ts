import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../interfaces/recipe.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private baseUrl = 'https://recipe-book-4f550-default-rtdb.europe-west1.firebasedatabase.app';
  private recipesUrl = this.baseUrl + '/recipes.json';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl)
      .pipe(
        map(
          response => {
            const recipesArr = Object.values(response);
            return recipesArr;
          }
        )
      );
  }

  addRecipe(recipe: Recipe): Observable<{ name: string }> {
    return this.http.post<Recipe>(this.recipesUrl, recipe);
  }

  updateRecipes(updatedRecipes: Recipe[]) {
    return this.http.put(this.recipesUrl, updatedRecipes);
  }
}
