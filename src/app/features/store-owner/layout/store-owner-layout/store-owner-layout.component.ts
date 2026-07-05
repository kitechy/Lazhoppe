import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-store-owner-layout',
  templateUrl: './store-owner-layout.component.html',
  styleUrls: ['./store-owner-layout.component.css'],
})
export class StoreOwnerLayoutComponent {
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
    this.router.navigate(['/auth']);
  }
}
