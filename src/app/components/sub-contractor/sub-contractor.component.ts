import { Component, OnInit,ViewChild } from '@angular/core';
import { Subcontractor } from '../../models/subcontractor';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { ProductsService } from '../../services/products.service';
import {MatPaginator, MatSort, MatTableDataSource,VERSION, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-sub-contractor',
  templateUrl: './sub-contractor.component.html',
  styleUrls: ['./sub-contractor.component.css']
})
export class SubContractorComponent implements OnInit {
  user: User;
  displayedColumns = ['sub_contractor_id', 'product_id', 'product_name', 'price_per_qty', 'quantity_ordered', 'status','order_date'];
  dataSource: MatTableDataSource<Subcontractor>;
  version = VERSION;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductsService,private dialog: MatDialog, private loginService: LoginService) {

    this.user = loginService.getUser();
    this.productService.getSubContractors().subscribe(data => {
      
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      console.log("datasource is : "+ this.dataSource);
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

}
