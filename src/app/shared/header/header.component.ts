import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isDropdownOpen = false;
  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['auth']);
  }
}
