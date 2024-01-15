import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthError } from '../../../store/selectors/auth.selectors';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    CommonModule,
    AuthComponent,
    MatTabsModule
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent implements OnInit {

  error$!: Observable<HttpErrorResponse | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.error$ = this.store.select(selectAuthError);
  }

}
