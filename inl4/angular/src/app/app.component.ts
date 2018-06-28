import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(public authService: AuthService) {
    if(authService.authenticated) {
      this.username = authService.user
    }
  }
  username: any;

  login(credentials) {
    this.authService.login({credentials})
    this.username = authService.user
  }

  logout() {
    this.authService.logout()
    this.username = authService.user
  }

  testApi() {
    this.authService.getResource('friends')
  }
}
