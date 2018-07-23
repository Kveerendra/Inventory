import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

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
    private http: Http,
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
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
      this.loginService.login(this.form.value).then(data => {
        if (data['error']) {
          console.log(data['error']);
        } else {
          this.loginService.store(data);
          this.router.navigateByUrl('/products');
        }
      });
    }
  }
}
