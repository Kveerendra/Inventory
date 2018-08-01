import { Injectable, Inject } from '@angular/core';
import { User } from '../models/user';
import { Router } from '../../../node_modules/@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private message = new BehaviorSubject('New User');
  currentMessage = this.message.asObservable();
  authenticated: boolean;
  private headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  getUser(): User {
    return new User(
      this.window.sessionStorage.getItem('username'),
      this.window.sessionStorage.getItem('userrole'),
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
  login(user: any): Observable<any> {
    //console.log(user);
    return this.http.post('http://localhost:5002/login', JSON.stringify(user));
  }
  store(user: User): boolean {
    // console.log(user);
    // console.error(user['username']);
    // console.error(user['role']);
    this.window.sessionStorage.setItem('username', '' + user.username);
    this.window.sessionStorage.setItem('userrole', '' + user.role);
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

  changeMessage(message: string) {
    this.message.next(message);
  }

  register(user: User) {
    return this.http
      .post<User>('http://localhost:5002/register', user);
  }
  isAuthenticated(): boolean {
    const res = this.window.sessionStorage.getItem('username');
    //console.log(res);
    if (res == null || res === undefined) {
      this.authenticated = false;
    } else {
      this.authenticated = true;
    }
    return this.authenticated;
  }

  isSeller(): boolean {
    return this.window.sessionStorage.getItem('userrole') === 'seller';
  }

  isbuyer(): boolean {
    return this.window.sessionStorage.getItem('userrole') === 'buyer';
  }
}
