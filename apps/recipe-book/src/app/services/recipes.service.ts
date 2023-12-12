import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../types/recipe.type';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  baseUrl = 'https://recipe-book-4f550-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    const recipesUrl = this.baseUrl + '/recipes.json';

    return this.http.get<{ [key: string]: Recipe }[]>(recipesUrl)
      .pipe(
        map(
          response => {
            const recipesObj = Object.values(response)[0];
            const recipesArr = Object.values(recipesObj);

            return recipesArr;
          }
        )
      )
  }
}
