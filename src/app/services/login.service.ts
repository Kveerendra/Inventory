import { Injectable, Inject } from '@angular/core';
import { User } from '../models/user';
import { Router } from '../../../node_modules/@angular/router';

import { Headers, Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authenticated: boolean;
  private headers: Headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin':'*'
  });

  getUser(): User {
    return new User(
      this.window.sessionStorage.getItem('username'),
      this.window.sessionStorage.getItem('username'),
      '',
      '',
      '',
      '',
      '',
      ''
    );
  }

  navigateToProducts(): any {
    this.router.navigateByUrl('/products');
  }
  navigateToLogin(): any {
    this.router.navigateByUrl('/login');
  }
  login(user: User): any {
    console.log(user);
    return this.http
      .post('http://localhost:5002/login', JSON.stringify(user), { headers: this.headers })
      .toPromise();
   
  }
  
  store(user: User): boolean {
    this.window.sessionStorage.setItem('username', user.username);
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
    private http: Http,
    @Inject('Window') private window: Window
  ) {
    this.authenticated = false;
  }
  register(user: User) {
    return this.http
    .post('http://localhost:5002/register', user, { headers: this.headers })
    .toPromise();
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
