import { Injectable, Inject } from '@angular/core';
import { User } from '../models/user';
import { Router } from '../../../node_modules/@angular/router';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authenticated: boolean;
  getUser(): User {
    return new User(
      this.window.sessionStorage.getItem('username'),
      this.window.sessionStorage.getItem('username')
    );
  }

  navigateToProducts(): any {
    this.router.navigateByUrl('/products');
  }
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
    this.window.sessionStorage.clear();
    this.isAuthenticated();
    return true;
  }
  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject('Window') private window: Window
  ) {
    this.authenticated = false;
  }
  register() {
    return true;
  }
  isAuthenticated(): boolean {
    const res = this.window.sessionStorage.getItem('username');
    if (res == null || res === undefined) {
      this.authenticated = false;
    } else {
      this.authenticated = true;
    }
    return this.authenticated;
  }
}