import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean; 
  constructor(private fb: FormBuilder,private productsService: ProductsService) { }

  ngOnInit() {
    this.form = this.fb.group({     // {5}
      product_name: ['', Validators.required],
      product_type: ['', Validators.required],
       product_description: ['', Validators.required]
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
      this.productsService.insertMasterData(this.form.value).subscribe();
    }
    this.formSubmitAttempt = true;             // {8}
 
  }

}
