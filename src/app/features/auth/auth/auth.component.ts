import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLogin = true;

  showLogin() {
    this.isLogin = true;
  }

  showSignup() {
    this.isLogin = false;
  }
}
