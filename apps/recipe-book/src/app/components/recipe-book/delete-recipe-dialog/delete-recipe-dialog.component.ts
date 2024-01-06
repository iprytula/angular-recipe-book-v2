import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";

@Component({
  selector: 'app-delete-dialog',
  template: `
    <h1 mat-dialog-title>Are you sure You want to delete this recipe</h1>
    <div mat-dialog-actions>
      <div class="w-100 d-flex justify-content-center">
        <button mat-button cdkFocusInitial (click)="onNoClick()">No</button>
        <button mat-button (click)="onYesClick()">Yes</button>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DeleteRecipeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteRecipeDialogComponent>,
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
