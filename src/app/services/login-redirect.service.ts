import { Injectable } from '@angular/core';
import { CanActivate } from '../../../node_modules/@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectService implements CanActivate {

  constructor(private loginService: LoginService) { }
  canActivate(): boolean {
    if (this.loginService.isAuthenticated()) {
      this.loginService.navigateToProducts();
      return false;
    } else {
      return true;
    }
  }
}
