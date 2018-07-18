import { Injectable } from '@angular/core';
import { CanActivate } from '../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectService implements CanActivate {

  constructor() { }
  canActivate(): boolean {
return false;
  }
}
