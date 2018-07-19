import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  columnDefs = [
    { headerName: 'Product Id', field: 'product_id' },
    { headerName: 'Product Name', field: 'product_name' },
    { headerName: 'Product Description', field: 'product_description' },
    { headerName: 'Price/Qty', field: 'price_per_qty' },
    { headerName: 'Available Qty', field: 'product_quantity' },
    { headerName: 'Delivery Time', field: 'delivery_day' },
    {headerName: 'Action', cellRenderer: EditProductComponent}
  ];
  rowData = [];

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
       
        this.rowData = data;
    })
    console.log("#########"+this.rowData)
  }
}
