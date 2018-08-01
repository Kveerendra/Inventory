import { Component, OnInit, ViewChild , Inject} from '@angular/core';
import{Product } from '../../models/product';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { ProductsService } from '../../services/products.service';
import {MatPaginator, MatSort, MatTableDataSource,VERSION, MatDialog} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})
export class PlaceorderComponent implements OnInit {

  title;
  user: User;
  displayedColumns = ['product_id', 'product_name', 'product_type', 'product_description', 'price_per_qty', 'product_quantity','quantity_ordered', 'actions' ];
  dataSource: MatTableDataSource<Product>;
  version = VERSION;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,public snackBar: MatSnackBar,  private productService: ProductsService,private dialog: MatDialog, private loginService: LoginService) {
    
    this.route.queryParams.subscribe(
      params => {
        this.title = params['tableTitle'];
      }
    );
   
    this.user = loginService.getUser();
    this.productService.getProductListForOrder().subscribe(data => {
      
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      //console.log("datasource is : "+ this.dataSource);
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

  invokeAction(qty: string, prod: Product)
  {
    console.log("invokeActiom"+JSON.stringify(prod));
    if(qty == null || qty === '')
    {
      prod.wish_list_flag = false;
      prod.place_order_flag = false;
    }
    else if(parseInt(qty) > +prod.product_quantity)
    {
      prod.wish_list_flag = true;
      prod.place_order_flag = false;
    }
    else{
      prod.place_order_flag = true;
      prod.wish_list_flag = false;
    }

    prod.quantity_ordered = qty;
  }

  placeOrder(prodObj : Product){
    debugger;
    prodObj.product_quantity = String(+prodObj.product_quantity - +prodObj.quantity_ordered );
    //this.productService.placeOrder(prodObj).subscribe(data => {});
    var tempdetails = prodObj.quantity_ordered;
    prodObj.quantity_ordered = "";
    prodObj.place_order_flag = false;
    var message = "Order for "+prodObj.product_name + " (Qty : "+ tempdetails + ") placed successfully."
    this.openSnackBar(message,"close");

  }

  addToWishList(prodObj : Product){
    var tempdetails = prodObj.quantity_ordered;
    prodObj.quantity_ordered = "";
    prodObj.wish_list_flag = false;
    var message = "Order for "+prodObj.product_name + " (Qty : "+ tempdetails + ") added to wishlist successfully."
    this.openSnackBar(message,"close");
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

 

}
