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
    { headerName: 'product_id', field: 'product_id' },
    { headerName: 'product_name', field: 'product_name' },
    { headerName: 'product_description', field: 'product_description' },
    { headerName: 'price_per_qty', field: 'price_per_qty' },
    { headerName: 'product_quantity', field: 'product_quantity' },
    { headerName: 'delivery_day', field: 'delivery_day' }
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
