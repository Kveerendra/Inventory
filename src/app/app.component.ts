import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { LoginService } from './services/login.service';
import { User } from './models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user: User;
  constructor(private loginService: LoginService) {
    setTheme('bs4');
  }
  isAuthenticated(): boolean {
    console.log(this.loginService.authenticated);
    return this.loginService.authenticated;
  }
  signOut() {
  console.error('SignOut');
  }
}
