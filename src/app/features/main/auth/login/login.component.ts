import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private auth: AuthComponent,
  ) {}

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response) => {
        this.authService.saveSession(response.token, response.user);

        alert('Login successful!');

        this.authService.getProfile().subscribe({
          next: (profile) => {
            console.log('Profile:', profile);
          },
          error: (err) => {
            console.error(err);
          },
        });

        switch (response.user.role) {
          case 'admin':
            this.router.navigate(['/admin/dashboard']);
            break;

          case 'store-owner':
            this.router.navigate(['/store-owner/setup-store']);
            break;

          default:
            this.router.navigate(['/shop']);
            break;
        }
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  showSignup() {
    this.auth.showSignup();
  }
}
