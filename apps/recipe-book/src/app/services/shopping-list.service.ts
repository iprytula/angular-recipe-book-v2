import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '../types/ingredient.type';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private baseUrl = 'https://recipe-book-4f550-default-rtdb.europe-west1.firebasedatabase.app';
  private shoppingListUrl = this.baseUrl + '/shopping-list.json';

  constructor(
    private http: HttpClient
  ) { }

  saveShoppingList(shoppingList: Ingredient[]) {
    return this.http.put(this.shoppingListUrl, shoppingList);
  }

  getShoppingList(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.shoppingListUrl).pipe(
      map(
        response => {
          const shoppingListArr = Object.values(response);
          return shoppingListArr;
        }
      )
    );
  }
}
