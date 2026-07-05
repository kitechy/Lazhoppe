import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    this.authService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (res) => {
          if (res.user.role !== 'admin') {
            alert('Access denied.');
            return;
          }

          this.authService.saveSession(res.token, res.user);

          this.router.navigate(['/admin/dashboard']);
        },

        error: () => {
          alert('Invalid credentials');
        },
      });
  }
}
