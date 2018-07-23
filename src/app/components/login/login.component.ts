import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private http: Http,
    private router: Router,
    private loginService: LoginService
  ) {
    this.userInfo = new User('', '', '', '', '', '', '', '');
  }

  userName = new FormControl('', [Validators.required]);
  password: string;
  matcher = new MyErrorStateMatcher();
  hide = true;

  userInfo: User;
 
  headers = new Headers();
  userDetails = {};

  ngOnInit() {
   
    this.password = '';
  }
  login() {
    // debugger;

    this.headers.append('Content-type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.router.navigateByUrl('/products');
    // this.userInfo.role = this.userName;
    // this.userInfo.username = this.userName;
    // this.loginService.login(this.userInfo).then(user => {
    //   this.loginService.store(user);
    // });
    /* this.http
      .post('http://localhost:5002/login', this.userDetails)
      .subscribe((response: any) => {
        console.log(response);
        if (response.json().error == null) {
          if (response.json().template === 'B') {
            this.router.navigateByUrl('/products');
          }
        } else {
          this.router.navigateByUrl('/error');
        }
      }); */
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  } 

