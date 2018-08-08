import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '../../../../node_modules/@angular/forms';
import { VERSION, MatDialog, MatDialogRef } from '@angular/material';
import { RegisterDialogComponent } from '../dialog/register-dialog.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  version = VERSION;
  registerDialogRef: MatDialogRef<RegisterDialogComponent>;
  userNameExists = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      // {5}
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Za-z]).{2,}$'),
          Validators.maxLength(20)
        ])
      ],
      pincode: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*[0-9]).{5,}$'),
          Validators.maxLength(5)
        ])
      ],
      location: ['', Validators.required],
      district: ['', Validators.required],
      partner: ['', Validators.required]
    });
    this.form.patchValue({
      partner: 'B'
    });
  }

  isFieldInvalid(field: string) {
    // {6}
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }
  onSubmit() {
    if (this.form.valid) {
      // console.log(this.form.value); // {7}
      this.loginService.register(this.form.value).subscribe(data => {
        if (data['error'] == null) {
          this.loginService.changeMessage(
            'Your username: ' +
              data['params'][0] +
              ' with password :' +
              data['params'][1]
          );
          this.registerDialogRef = this.dialog.open(RegisterDialogComponent, { disableClose: true });
        } else {
          // this.userNameExists = true;
          this.openSnackBar(data['error'], 'X');
        }
      });
    }
    this.formSubmitAttempt = true; // {8}
  }

  onNoClick(): void {
    this.registerDialogRef.close();
  }

  redirectToLogin() {
    this.router.navigateByUrl('/login');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      panelClass: ['snack-bar-color'],
      duration: 2000
    });
  }
}
