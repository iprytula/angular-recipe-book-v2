import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor(private http: HttpClient) {}

  getRecipes(): Observable<unknown> {
    return this.http.get('https://recipe-book-4f550-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
  }
}
