import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';
import { Order } from '../models/Order';
import { Subcontractor } from '../models/subcontractor';
import { BehaviorSubject } from 'rxjs';
import { Wishlist } from '../models/wishlist';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private product:Product;
  
  
  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    //console.log("hello");
    return this.http.get<Product[]>(environment.clientUrl + '/productList');

  }

  public getOrders(): Observable<Order[]> {
    //console.log("hello");
    return this.http.get<Order[]>(environment.clientUrl + '/orderList');

  }
  public getSubContractors(): Observable<Subcontractor[]> {
    //console.log("hello");
    return this.http.get<Order[]>(environment.clientUrl + '/subContractorList');

  }

  public getWishList(): Observable<Wishlist[]> {
    //console.log("hello");
    return this.http.get<Wishlist[]>(environment.clientUrl + '/wishList');

  }

  insertMasterData(product: Product): Observable<any> {
    return this.http.get('');
   } 
  
  public login(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.serverUrl + '/showproducts');
  }
  changeProduct(product: Product) {
    this.product = product;
  }

  getProduct()
  {
    return this.product;
  }
}
