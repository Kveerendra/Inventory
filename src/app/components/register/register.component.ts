import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.user = new User('', '', '', '', '', '', '', '');
  }

  onSubmit() {
  this.loginService.register(this.user).then(res => {
    console.log(res);
//    this.loginService.navigateToLogin();
  });
  }
}
