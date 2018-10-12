import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) {}
  isLogedIn() {
    const logged = this.authService.isLogedIn();
    return logged;
  }
  getFullUserName() {
    return this.authService.currentUser.fullName();
  }
  logout() {
    this.authService.logout();
  }
}
