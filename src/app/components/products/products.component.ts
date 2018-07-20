import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TabsetComponent } from 'ngx-bootstrap';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  user: User;
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
  tab = 'All';
  modalRef: BsModalRef;
  product: Product;
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  constructor(private productService: ProductsService, private loginService: LoginService, private modalService: BsModalService) {
    this.user = loginService.getUser();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit() {
    this.productService.getProducts().subscribe(data => {

        this.rowData = data;
    });
    console.log('#########' + this.rowData);
  }
  myTab() {
    return this.staticTabs.tabs[1].active !== true;
  }
  addProduct() {
    this.modalRef.hide();
  }
}
