import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {Headers} from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: Http,
  private router: Router) {  }
  
  userName:string = '';
  password:string = '';
  headers = new Headers();
  userDetails = {};

  ngOnInit() {
    this.userName='';
    this.password='';
    
  }
 login()
{
  debugger;
  this.userDetails = {
    "username":this.userName,
    "password":this.password
  }
  this.headers.append("Content-type","application/json");
  this.headers.append( "Access-Control-Allow-Origin","*");
  this.http.post( 'http://localhost:5002/login',this.userDetails)
  .subscribe((response: any) => {
    console.log(response)
    if(response.json().error == null)
    {
      if(response.json().template == 'B')
      {
        this.router.navigateByUrl('/products');
      }
    }
    else{
      this.router.navigateByUrl('/error');
    }
    
  });
}
}
