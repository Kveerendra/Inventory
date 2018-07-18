import { Injectable, Inject } from '@angular/core';
import { User } from '../models/user';
import { Router } from '../../../node_modules/@angular/router';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authenticated: boolean;

  navigateToLogin(): any {
    this.router.navigateByUrl('/login');
  }
  login(user: User): boolean {
    this.window.sessionStorage.setItem('username', user.name);
    this.window.sessionStorage.setItem('userrole', user.role);
    this.router.navigateByUrl('/products');
    return true;
  }
  logout(): boolean {
    this.window.sessionStorage.setItem('username', null);
    this.window.sessionStorage.setItem('userrole', null);
    return true;
  }
  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject('Window') private window: Window
  ) {
    this.authenticated = false;
  }

  getLogin() {
    return true;
  }

  register() {
    return true;
  }

  getRole() {
    return 'buyer'; // or supplier
  }

  isAuthenticated(): boolean {
    // console.error(this.session.get('username'));
    const res = this.window.sessionStorage.getItem('username');
    if (res == null || res === undefined) {
      this.authenticated = false;
    } else {
      this.authenticated = true;
    }
return  this.authenticated;
    /* if (
      this.window.sessionStorage.get('username').then === undefined ||
      this.window.sessionStorage.get('username') == null
    ) {
      return false;
    } else {
      return true;
    } */
  }
}
