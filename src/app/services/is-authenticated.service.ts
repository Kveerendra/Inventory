import { Injectable } from '@angular/core';
import { CanActivate, Router } from '../../../node_modules/@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedService implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}
  canActivate(): boolean {
    if (this.loginService.isAuthenticated()) {
      return true;
    } else {
      this.loginService.navigateToLogin();
      return false;
    }
  }
}
