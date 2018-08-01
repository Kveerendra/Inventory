import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '../../../../node_modules/@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: Product;
  form: FormGroup;
  private formSubmitAttempt: boolean;
  constructor(
    private productService: ProductsService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProductComponent>
  ) {
    this.product = this.productService.getProduct();
    // console.log("Product JSON >>>>> "+ JSON.stringify(this.product) );

  }

  ngOnInit() {
    this.form = this.fb.group({
      // {5}
      product_name: [this.product.product_name, Validators.required],
      product_description: [
        this.product.product_description,
        Validators.required
      ],
      price_per_qty: [this.product.product_price, Validators.required],
      product_quantity: [this.product.product_quantity, Validators.required],
      delivery_day: [this.product.delivery_day, Validators.required],
      product_type: [this.product.product_type, Validators.required]
    });
    this.form.controls['product_description'].disable();
    this.form.controls['product_type'].disable();
    this.form.controls['product_name'].disable();
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
    //  console.log(this.form.value); // {7}
    }
    this.formSubmitAttempt = true; // {8}
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
