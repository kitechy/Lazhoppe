import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(public router: Router) {}

  isActive(route: string): boolean {
    const currentUrl = this.router.url
      .split('?')[0]
      .split('#')[0]
      .replace(/\/$/, '');

    if (route === '/admin') {
      return currentUrl === '/admin';
    }

    return currentUrl === route || currentUrl.startsWith(`${route}/`);
  }
}
