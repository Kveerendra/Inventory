import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '../../../../node_modules/@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '../../../../node_modules/@angular/router';

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
    private dialogRef: MatDialogRef<EditProductComponent>,
    private router: Router,
    public snackBar: MatSnackBar
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
      product_price: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(5),Validators.max(99999),Validators.min(0)
      ])],
      product_quantity: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(5),Validators.max(99999),Validators.min(0)
        ])
      ],
      delivery_day: [this.product.delivery_day, Validators.compose( [ Validators.required,Validators.pattern('^[0-9]*$')])],
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
    console.error(this.product);
    if (this.form.valid) {
      const product: Product = this.product;
      product.product_name = this.form.get('product_name').value;
      product.product_type = this.form.get('product_type').value;
      product.product_description = this.form.get('product_description').value;
      product.product_price = this.form.get('product_price').value;

      product.product_quantity = this.form.get('product_quantity').value;
      product.product_delivery = this.form.get('delivery_day').value;
      this.productService.updateProduct(product).subscribe(res => {
        this.router.navigateByUrl('/products');
      });
      // console.log(JSON.stringify(this.form.value)); // {7}
      const message = 'Product updated successfully.';
      this.openSnackBar(message, 'X');
    }
    this.formSubmitAttempt = true; // {8}
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      panelClass: ['snack-bar-color'],
      duration: 2000
    });
  }
}
