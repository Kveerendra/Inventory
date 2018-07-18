import { Injectable } from '@angular/core';
import { CanActivate, Router } from '../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedService implements CanActivate {
  constructor( private router: Router) {}
  canActivate(): boolean {
    this.router.navigateByUrl('/login');
    return false;
  }
}
