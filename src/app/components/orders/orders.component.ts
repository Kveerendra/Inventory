import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Order } from '../../models/Order';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {
  user: User;
  routeParam;
  displayedColumns;
  dataSource: MatTableDataSource<Order>;
  version = VERSION;
  order: Order;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute, private productService: ProductsService, private dialog: MatDialog, private loginService: LoginService, private modalService: BsModalService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.routeParam = params['flag'];
        this.refreshingData();
      }
    );
  }

  refreshingData() {
    var statusFlag;
    if (this.routeParam === 'approval') {
      this.displayedColumns = ['order_id', 'product_id', 'product_name', 'price_per_qty', 'product_quantity', 'order_date', 'status', 'actions'];
    }
    else {
      this.displayedColumns = ['order_id', 'product_id', 'product_name', 'price_per_qty', 'product_quantity', 'order_date', 'status'];
    }
    switch (this.routeParam) {
      case 'pendingOrders': statusFlag = 'in progress';
        break;
      case 'deliveredOrders': statusFlag = 'delivered';
        break;
      case 'approval': statusFlag = 'in progress';
        break;
      default: statusFlag = 'all';
        break;
    }
    this.user = this.loginService.getUser();
    var filteredData;
    this.productService.getOrders().subscribe(data => {
      if (statusFlag != 'all') {
        filteredData = data.filter(function (el) {
          return (el.status.toLowerCase() === statusFlag); // Changed this so a home would match
        });
      }
      else {
        filteredData = data;
      }
      this.dataSource = new MatTableDataSource(filteredData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
