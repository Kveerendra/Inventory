import { Component, ChangeDetectionStrategy } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { LoginService } from './services/login.service';
import { User } from './models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dashboard';
  user: User;
  constructor(private loginService: LoginService) {
    this.user = loginService.getUser();
    // setTheme('bs4');
  }
  isAuthenticated(): boolean {
    return this.loginService.authenticated;
  }
  signOut() {
    this.loginService.logout();
  }
  isSupplier(): boolean {
    return this.isAuthenticated() && this.loginService.isSeller();
  }


}
