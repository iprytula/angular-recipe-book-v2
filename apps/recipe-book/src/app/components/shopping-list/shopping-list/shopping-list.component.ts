import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../../../interfaces/ingredient.interface';
import { selectLoading, selectShoppingList, selectShoppingListError } from '../../../store/selectors/shopping-list.selectors';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ShoppingListActions } from '../../../store/actions/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule, MatListModule],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent implements OnInit{

  shoppingList$!: Observable<Ingredient[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<HttpErrorResponse | null>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.shoppingList$ = this.store.select(selectShoppingList);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectShoppingListError);
  }

  removeIngredient(ingredient: Ingredient) {
    this.store.dispatch(ShoppingListActions.removeFromShoppingList({ ingredient }))
  }

  saveShoppingList(shoppingList: Ingredient[]) {
    this.store.dispatch(ShoppingListActions.saveShoppingList({ ingredients: shoppingList }))
  }

}
