import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  VERSION,
  MatDialog,
  MatDialogRef
} from '@angular/material';
import { Product } from '../../models/product';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  user: User;
  routeParam;
  displayedColumns;
  dataSource: MatTableDataSource<Product>;
  version = VERSION;
  title;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private dialog: MatDialog,
    private loginService: LoginService,
    private modalService: BsModalService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.routeParam = params['flag'];
      this.refreshingData();
    });
    this.route.queryParams.subscribe(params => {
      this.title = params['tableTitle'];
    });
  }

  refreshingData() {
    let statusFlag;
    let filteredData;
    if (this.routeParam === 'approval') {
      this.displayedColumns = [
        'order_id',
        'product_id',
        'product_name',
        'product_price',
        'quantity_ordered',
        'order_date',
        'status_flag',
        'actions'
      ];
      this.productService.getOrdersForApproval().subscribe(data => {
        data.forEach(d => {
          d.status_flag = this.getOrderStatusText(d.delivery_stauts);
          if(d.status_flag === 'Pending')
          {
              d.show_approval_flag = true;
              d.show_decline_flag = true;
          }
          else
          {
            d.show_approval_flag = false;
            d.show_decline_flag = false;
          }
        });
        filteredData = data;
        this.dataSource = new MatTableDataSource(filteredData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    } else {
      this.displayedColumns = [
        'order_id',
        'product_id',
        'product_name',
        'product_price',
        'quantity_ordered',
        'order_date',
        'status_flag'
      ];
      switch (this.routeParam) {
        case 'pendingOrders':
          statusFlag = 'in progress';
          break;
        case 'deliveredOrders':
          statusFlag = 'delivered';
          break;
        case 'approval':
          statusFlag = 'in progress';
          break;
        default:
          statusFlag = 'all';
          break;
      }
      this.user = this.loginService.getUser();
      this.productService.getOrders().subscribe(data => {
        // console.error(data);
        /* if (statusFlag !== 'all') {
          filteredData = data.filter(function(el) {
            return el.status.toLowerCase() === statusFlag; // Changed this so a home would match
          });
        } else { */
        data.forEach(d => {
          d.status_flag = this.getOrderStatusText(d.delivery_stauts);
          if(d.status_flag === 'Pending')
          {
              d.show_approval_flag = true;
              d.show_decline_flag = true;
          }
          else
          {
            d.show_approval_flag = false;
            d.show_decline_flag = false;
          }
        });
        filteredData = data;
        this.dataSource = new MatTableDataSource(filteredData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //  }
      });
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  approveOrder(product: Product) {
    product.delivery_stauts = 'CO';
    this.productService.approveOrDeclineOrder(product).subscribe(data => {
      console.log('Order Approved');
      product.status_flag = 'Completed';
      product.show_approval_flag = false;
      product.show_decline_flag = false;
    });
  }
  declineOrder(product: Product) {
    product.delivery_stauts = 'DE';

    this.productService.approveOrDeclineOrder(product).subscribe(data => {
      console.log('Order Declined');
      product.status_flag = 'Rejected';
      product.show_approval_flag = false;
      product.show_decline_flag = false;
    });
  }
  getOrderStatusText(statusCode: String): String {
    switch (statusCode) {
      case 'OG':
        return 'Pending';
      case 'CO':
        return 'Completed';
      case 'DE':
        return 'Rejected';
      default:
        return '-----';
    }
  }
}
