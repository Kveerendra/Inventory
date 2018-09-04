import { Component, OnInit, ViewChild } from '@angular/core';
import { Subcontractor } from '../../models/subcontractor';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { ProductsService } from '../../services/products.service';
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
  selector: 'app-sub-contractor',
  templateUrl: './sub-contractor.component.html',
  styleUrls: ['./sub-contractor.component.css']
})
export class SubContractorComponent implements OnInit {
  user: User;
  displayedColumns = [
    's_user_name',
    'product_id',
    'product_name',
    'product_price',
    'quantity_ordered',
    'delivery_stauts',
    'order_date'
  ];
  dataSource: MatTableDataSource<Product>;
  version = VERSION;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private productService: ProductsService,
    private dialog: MatDialog,
    private loginService: LoginService
  ) {
    this.user = loginService.getUser();
    this.productService.getSubContractors().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      //console.log("datasource is : "+ this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
