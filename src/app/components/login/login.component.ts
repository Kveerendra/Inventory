import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../models/user';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { MatSnackBar } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup; // {1}
  private formSubmitAttempt: boolean; // {2}
  hide = true;
  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    public snackBar: MatSnackBar
  ) {}

  headers = new Headers();

  ngOnInit() {
    this.form = this.fb.group({
      // {5}
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    // {6}
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  login() {
    if (this.form.valid) {
      this.loginService.login(this.form.value).subscribe(data => {
        if (data['error']) {
          
          this.openSnackBar(data['error'], "X");
        } else {
          const user: User = data;
          this.loginService.store(user);
          this.router.navigateByUrl('/products');
        }
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      panelClass: ['snack-bar-color'],
      duration: 2000
    });
  }
}
