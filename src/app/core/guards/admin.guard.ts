import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser();

    if (!user) {
      this.router.navigate(['/admin/login']);
      return false;
    }

    if (user.role !== 'admin') {
      this.router.navigate(['/auth']);
      return false;
    }

    return true;
  }
}
