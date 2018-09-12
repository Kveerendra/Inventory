import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatPaginator,
  MatSort,
  MatTableDataSource,
  VERSION,
  MatSnackBar
} from '@angular/material';
import { Subcontractor } from '../../models/subcontractor';
import { FormGroup } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-out-of-stock-dialog',
  templateUrl: './out-of-stock-dialog.component.html',
  styleUrls: ['./out-of-stock-dialog.component.css']
})
export class OutOfStockDialogComponent implements OnInit {
  form: FormGroup;
  subContractList: Product[];
  displayedColumns = [
    'product_id',
    'product_name',
    's_user_name',
    'product_price',
    'product_quantity',
    'quantity_ordered',
    'actions'
  ];

  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  constructor(
    private dialogRef: MatDialogRef<OutOfStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    public snackBar: MatSnackBar,
    private productService: ProductsService
  ) {
    // console.log(JSON.stringify(data));
    this.subContractList = data.list;
    this.dataSource = new MatTableDataSource(this.subContractList);
    this.dataSource.sort = this.sort;
    //     console.log('datasource is : ' + this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  invokeAction(qty: string, prod: Product) {
    // console.log('invokeActiom'+JSON.stringify(prod));
    if (qty == null || qty === '' || qty == '0') {
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

  placeOrder(prodObj: Product) {
    prodObj.product_quantity =
      +prodObj.product_quantity - +prodObj.quantity_ordered;
    this.productService.placeOrder(prodObj).subscribe(data => {
      const tempdetails = prodObj.quantity_ordered;
      prodObj.quantity_ordered = 0;
      prodObj.place_order_flag = false;
      const message =
        'Order for ' +
        prodObj.product_name +
        ' (Qty : ' +
        tempdetails +
        ') placed successfully.';
      this.openSnackBar(message, 'close');
    });
  }

  addToWishList(prodObj: Product) {
    const tempdetails = prodObj.quantity_ordered;
    this.productService.addToWishList(prodObj).subscribe(data => {
      prodObj.quantity_ordered = 0;
      prodObj.wish_list_flag = false;
      const message =
        'Order for ' +
        prodObj.product_name +
        ' (Qty : ' +
        tempdetails +
        ') added to wishlist successfully.';
      this.openSnackBar(message, 'X');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      panelClass: ['snack-bar-color'],
      duration: 2000
    });
  }
}
