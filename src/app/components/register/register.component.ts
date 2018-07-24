import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  form: FormGroup;
  private formSubmitAttempt: boolean; 
  constructor(private loginService: LoginService,private fb: FormBuilder) {}

  ngOnInit() {
    this.user = new User('', '', '', '', '', '', '', '');
    this.form = this.fb.group({     // {5}
      name: ['', Validators.compose([
		Validators.required,
		Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).{2,}$'),Validators.maxLength(20)])],
      pincode: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).{5,}$'),Validators.maxLength(5)])],
      location: ['', Validators.required],
      district: ['', Validators.required],
      partner: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { // {6}
  return (
    (!this.form.get(field).valid && this.form.get(field).touched) ||
    (this.form.get(field).untouched && this.formSubmitAttempt)
  );
}
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value); // {7}
      this.loginService.register(this.form.value).then(res => {
        console.log(res);
      });
    }
    this.formSubmitAttempt = true;             // {8}
 
  }
}
