import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recipe-detail-placeholder',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-title>Please check the recipe</mat-card-title>
    </mat-card>
  `,
  styles: `
    mat-card {
      height: 100%;
      position: relative;

      mat-card-title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  `
})
export class RecipeDetailPlaceholderComponent {

}
