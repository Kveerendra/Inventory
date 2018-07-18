import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() {}

  getLogin() {
    return true;
  }

  register() {
    return true;
  }

  getRole() {
    return 'buyer'; // or supplier
  }

  isAuthenticated() {
    return true;
  }
}
