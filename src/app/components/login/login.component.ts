import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';

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
    this.userInfo = new User();
  }
  userInfo: User;
  userName = '';
  password = '';
  headers = new Headers();
  userDetails = {};

  ngOnInit() {
    this.userName = '';
    this.password = '';
  }
  login() {
    // debugger;

    this.headers.append('Content-type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.router.navigateByUrl('/products');
    this.userInfo.role = this.userName;
    this.userInfo.name = this.userName;
    this.loginService.login(this.userInfo);
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
