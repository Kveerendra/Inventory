import { Component, OnInit , Inject,ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatPaginator,MatSort,MatTableDataSource,VERSION,} from "@angular/material";
import { Subcontractor } from '../../models/subcontractor';

@Component({
  selector: 'app-out-of-stock-dialog',
  templateUrl: './out-of-stock-dialog.component.html',
  styleUrls: ['./out-of-stock-dialog.component.css']
})
export class OutOfStockDialogComponent implements OnInit {

  subContractList : Subcontractor[];
  displayedColumns = [
    'product_id',
    'product_name',
    'sub_contractor_id',
    'price_per_qty',
    'available_quantity',
    'quantity_ordered',
    'actions'
  ];

  dataSource: MatTableDataSource<Subcontractor>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dialogRef: MatDialogRef<OutOfStockDialogComponent>,@Inject(MAT_DIALOG_DATA) data) {
      console.log(JSON.stringify(data));
         this.subContractList = data.list;
         this.dataSource = new MatTableDataSource(this.subContractList);
         this.dataSource.sort = this.sort;
    //     console.log('datasource is : ' + this.dataSource);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
   }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
}

}
