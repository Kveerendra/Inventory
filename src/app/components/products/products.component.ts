import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  columnDefs = [
    { headerName: 'Product Id', field: 'product_id' },
    { headerName: 'Product Name', field: 'product_name' },
    { headerName: 'Product Description', field: 'product_description' },
    { headerName: 'Price Per Qty', field: 'price_per_qty' },
    { headerName: 'Product Quantity', field: 'product_quantity' },
    { headerName: 'Delivery Day', field: 'delivery_day' }
  ];
  rowData = [];

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.productService.getProducts().forEach(
      x => {
        this.rowData = x;
      });
  }
}
