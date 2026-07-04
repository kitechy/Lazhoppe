import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent {
  isDropdownOpen = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['admin/login']);
  }
}
