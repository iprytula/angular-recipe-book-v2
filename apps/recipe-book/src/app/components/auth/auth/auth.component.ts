import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../store/actions/auth.actions';
import { Observable } from 'rxjs';
import { selectIsLoading } from '../../../store/selectors/auth.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  @Input() isSignUpMode = false;
  buttonText = this.isSignUpMode ? 'Sign Up' : 'Sign In';
  authForm!: FormGroup;
  loading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit() {
    this.initAuthForm();
    this.loading$ = this.store.select(selectIsLoading);
  }

  initAuthForm() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: ['', [
        this.isSignUpMode ? Validators.required : Validators.nullValidator,
        Validators.minLength(6)]
      ],
    }, {
      validators: this.isSignUpMode ? this.passwordMatchValidator('password', 'passwordRepeat') : null
    });
  }

  onSubmit() {
    if (this.authForm.valid) {
      const { email, password } = this.authForm.value;

      if (this.isSignUpMode) {
        this.store.dispatch(AuthActions.signUp({ email, password }));
      } else {
        this.store.dispatch(AuthActions.signIn({ email, password }));
      }
    }
  }

  private passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }

      if (matchingControl.errors && !matchingControl.errors['passwordMismatch']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMismatch: true });
      } else {
        matchingControl.setErrors(null);
      }

      return null;
    };
  }
}
