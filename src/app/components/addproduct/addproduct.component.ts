import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '../../../../node_modules/@angular/forms';
import { Router } from '../../../../node_modules/@angular/router';
import { MatSnackBar } from '../../../../node_modules/@angular/material';

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
  constructor(
    private productService: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      // {5}
      product_name: ['', Validators.required],
      product_description: ['', Validators.required],
      product_price: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(5),
          Validators.max(99999),
          Validators.min(1)
        ])
      ],
      product_quantity: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(5),
          Validators.max(99999),
          Validators.min(0)
        ])
      ],
      product_delivery: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.max(99999),
          Validators.min(0)
        ])
      ],
      product_type: ['', Validators.required]
    });
    this.form.controls['product_description'].disable();
    this.form.controls['product_type'].disable();
    this.productService.getProductTypesList().subscribe(data => {
      // console.log(data);
      this.productList = data;
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
      const product: Product = new Product();
      const data = this.form.get('product_name').value;
      for (const p in this.productList) {
        if (this.productList[p]['product_id'] === data) {
          product.product_id = this.productList[p].product_id;
          product.product_name = this.productList[p].product_name;
          product.product_description = this.productList[p].product_description;
          product.product_type = this.productList[p].product_type;
        }
      }
      product.product_price = this.form.get('product_price').value;

      product.product_quantity = this.form.get('product_quantity').value;
      product.product_delivery = this.form.get('product_delivery').value;
      console.error(JSON.stringify(this.form.value));
      this.productService.addProduct(product).subscribe(res => {
        console.log(res);
        const message = 'Product ' + res + ' successfully.';
        this.openSnackBar(message, 'X');
        this.router.navigateByUrl('/products');
      });
      // console.log(JSON.stringify(this.form.value)); // {7}
      /* const message = 'Product added successfully.';
      this.openSnackBar(message, 'X'); */
    }
    this.formSubmitAttempt = true; // {8}
  }

  somethingChanged(pid) {
    /*  for (let p in this.productList) {
      console.error(pid);
      if (this.productList[p]['product_id'] == pid.value) {
        this.form.controls['product_description'].setValue(
          this.productList[p].product_description
        );

        this.form.controls['product_type'].setValue(this.productList[p].product_type);
      }
    } */
    for (const p in this.productList) {
      if (this.productList[p]['product_id'] === pid) {
        this.form.controls['product_description'].setValue(
          this.productList[p].product_description
        );
        this.form.controls['product_type'].setValue(
          this.productList[p].product_type
        );
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      panelClass: ['snack-bar-color'],
      duration: 2000
    });
  }
}
