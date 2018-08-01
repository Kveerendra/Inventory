import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TabsetComponent } from 'ngx-bootstrap';

import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  VERSION,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatSnackBar
} from '@angular/material';
import { OutOfStockDialogComponent } from '../out-of-stock-dialog/out-of-stock-dialog.component';
import { Subcontractor } from '../../models/subcontractor';

@Component({
  selector: 'app-out-of-stock',
  templateUrl: './out-of-stock.component.html',
  styleUrls: ['./out-of-stock.component.css']
})
export class OutOfStockComponent implements OnInit {
  user: User;
  displayedColumns = [
    'product_id',
    'product_name',
    'product_description',
    'price_per_qty',
    'product_quantity',
    'delivery_day',
    'actions'
  ];
  dataSource: MatTableDataSource<Product>;
  version = VERSION;
  modalRef: BsModalRef;
  product: Product;
  dialogRef;
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public snackBar: MatSnackBar,
    private productService: ProductsService,
    private dialog: MatDialog,
    private loginService: LoginService,
    private modalService: BsModalService) {
      this.user = loginService.getUser();
      this.productService.getProducts().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      //  console.log('datasource is : ' + this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
     }

  ngOnInit() {
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialog(prodObj : Product) {
   
    debugger;
    this.productService.getSubContractors().subscribe(data => {
      var subContractorList = data;
     // console.log("subContractorList -- >>"+data);
       
      const dialogConfig = new MatDialogConfig();
  
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      dialogConfig.data = {
        list :  subContractorList
    };

     this.dialogRef =  this.dialog.open(OutOfStockDialogComponent, dialogConfig);

     this.dialogRef.afterClosed().subscribe(
      data => {
        
        //console.log("testing"+data);
        if(data === "orderedPlaced")
          this.openSnackBar("Product ordered successfully.", "X"); } );


     

    });
    //dialogConfig.data = prodObj.sub_contractors;
  
      
      
 

   
}

 
public openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    panelClass: ['snack-bar-color'],
  duration: 2000
  });
  } 

}
