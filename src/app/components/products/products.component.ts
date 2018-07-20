import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  user: User;
  columnDefs = [
    { headerName: 'Product Id', field: 'product_id' },
    { headerName: 'Product Name', field: 'product_name' },
    { headerName: 'Product Description', field: 'product_description' },
    { headerName: 'Price Per Qty', field: 'price_per_qty' },
    { headerName: 'Product Quantity', field: 'product_quantity' },
    { headerName: 'Delivery Day', field: 'delivery_day' }
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
    this.user = this.loginService.getUser();
    this.productService.getProducts().forEach(
      x => {
        this.rowData = x;
      });
  }
  myTab() {
    return this.staticTabs.tabs[1].active !== true;
  }
  addProduct() {
    this.modalRef.hide();
  }
}
