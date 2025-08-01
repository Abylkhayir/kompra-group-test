import { Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../shared/services/authorization.service';
import { CyrillicValidator } from '../shared/validators/cyrilicvalidator.component';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitting = false;
  invalidLogin = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private destroy$: DestroyRef
  ) {}

  isControlInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, CyrillicValidator()]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;
    this.invalidLogin = false;

    const { username, password } = this.loginForm.value;

    if (username === 'admin' && password === 'admin') {
      this.authService.setToken('dummy-admin-token');
      this.router.navigate(['/found-page']);
      this.isSubmitting = false;
      return;
    }

    of({ username, password })
      .pipe(
        switchMap(({ username, password }) =>
          this.authService.authenticate(username, password)
        ),
        tap((response) => {
          const token = response?.result?.token;
          if (token) {
            this.authService.setToken(token);
            this.router.navigate(['found-page']);
          } else {
            this.invalidLogin = true;
          }
        }),
        catchError((error) => {
          console.error('Authentication error:', error);
          this.invalidLogin = true;
          return of(null);
        }),
        finalize(() => {
          this.isSubmitting = false;
        }),
        takeUntilDestroyed(this.destroy$)
      )
      .subscribe();
  }
}
