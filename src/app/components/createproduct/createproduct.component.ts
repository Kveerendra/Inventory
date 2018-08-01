import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { ProductsService } from '../../services/products.service';
import { MatSnackBar } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  constructor(private fb: FormBuilder, private productsService: ProductsService, public snackBar: MatSnackBar) { }
  isSuccess: boolean;
  ngOnInit() {
    this.form = this.fb.group({     // {5}
      product_name: ['', Validators.required],
      product_type: ['', Validators.required],
      product_description: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { // {6}
    this.isSuccess = (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt);
    return this.isSuccess;

  }
  onSubmit() {
    if (this.form.valid) {
      this.productsService.insertMasterData(this.form.value).subscribe();
      var message = "Product created successfully."
      this.openSnackBar(message, "X");
    }
    this.formSubmitAttempt = true;             // {8}
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      panelClass: ['snack-bar-color'],
      duration: 2000
    });
  }
}
