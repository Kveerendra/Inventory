import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import {VERSION, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  product: Product;
  productList: Product[];
  form: FormGroup;
  private formSubmitAttempt: boolean; 
  constructor(private productService: ProductsService,private fb: FormBuilder) {}

  ngOnInit() {
    
    this.form = this.fb.group({     // {5}
      product_name: ['', Validators.required],
      product_description: ['', Validators.required],
      price_per_qty: ['', Validators.required],
      product_quantity: ['', Validators.required],
      delivery_day: ['', Validators.required],
      product_type: ['', Validators.required]
    });
    this.form.controls['product_description'].disable();
    this.form.controls['product_type'].disable();
    this.productService.getProducts().subscribe(data => {

      console.log(data);
      this.productList = data;
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
  }
  this.formSubmitAttempt = true;             // {8}

}

somethingChanged(data)
{
  
  this.form.controls['product_description'].setValue(data.product_description);
 
  this.form.controls['product_type'].setValue(data.product_type);
  

}

}
