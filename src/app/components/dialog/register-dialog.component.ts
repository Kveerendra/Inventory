import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatDialogRef} from '@angular/material';

@Component({
  templateUrl: './register-dialog.component.html',
})
export class RegisterDialogComponent implements OnInit  {
  message:string;

  constructor( private router: Router,private loginService: LoginService,private dialogRef: MatDialogRef<RegisterDialogComponent>){}

  ngOnInit() {
    this.loginService.currentMessage.subscribe(message => this.message = message)
  }

  redirectToLogin() {
    this.router.navigateByUrl('/login');
    this.dialogRef.close();
  }
}