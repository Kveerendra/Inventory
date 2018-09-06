import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { ProductsService } from '../../services/products.service';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  VERSION,
  MatDialog,
  MatTable
} from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { isNumber } from 'util';
import { CdkTable } from '@angular/cdk/table';

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})
export class PlaceorderComponent implements OnInit {
  title;
  user: User;
  displayedColumns = [
    'product_id',
    'product_name',
    'product_type',
    'product_description',
    'product_price',
    'product_quantity',
    'quantity_ordered',
    'actions'
  ];
  dataSource: MatTableDataSource<Product>;
  version = VERSION;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild('table')
  table: CdkTable<any>;

  constructor(
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private productService: ProductsService,
    private dialog: MatDialog,
    private loginService: LoginService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.route.queryParams.subscribe(params => {
      this.title = params['tableTitle'];
    });
    this.getData();
  }

  ngOnInit() {}
  getData() {
    this.user = this.loginService.getUser();
    this.productService.getProducts().subscribe(data => {
      this.dataSource = new MatTableDataSource(
        data.filter(d => {
          return d.s_user_name !== this.loginService.getUser().username;
        })
      );
      this.dataSource.sort = this.sort;
      // console.log('datasource is : '+ this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
this.changeDetectorRefs.detectChanges();
    });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  invokeAction(qty: string, prod: Product) {
    if (isNaN(parseInt(qty, 10))) {
      prod.quantity_ordered = null;
      prod.wish_list_flag = false;
      prod.place_order_flag = false;
    } else {
      if (qty == null || qty == '' || qty == '0') {
        prod.wish_list_flag = false;
        prod.place_order_flag = false;
      } else if (parseInt(qty, 10) > +prod.product_quantity) {
        prod.wish_list_flag = true;
        prod.place_order_flag = false;
      } else {
        prod.place_order_flag = true;
        prod.wish_list_flag = false;
      }

      prod.quantity_ordered = parseInt(qty, 10);
    }
  }

  placeOrder(prodObj: Product) {
    prodObj.place_order_flag = false;
    // prodObj.product_quantity = +prodObj.product_quantity - +prodObj.quantity_ordered;
    this.productService.placeOrder(prodObj).subscribe(data => {
      // debugger;
      const tempdetails = prodObj.quantity_ordered;
      prodObj.quantity_ordered = null;

      const message =
        'Order for ' +
        prodObj.product_name +
        ' (Qty : ' +
        tempdetails +
        ') placed successfully.';
      this.openSnackBar(message, 'X');
      this.getData();
    });
  }

  addToWishList(prodObj: Product) {
    const tempdetails = prodObj.quantity_ordered;
    prodObj.wish_list_flag = false;
    this.productService.addToWishList(prodObj).subscribe(data => {
      prodObj.quantity_ordered = null;

      const message =
        'Order for ' +
        prodObj.product_name +
        ' (Qty : ' +
        tempdetails +
        ') added to wishlist successfully.';
      this.openSnackBar(message, 'X');
      this.getData();
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      panelClass: ['snack-bar-color'],
      duration: 2000
    });
  }
}
