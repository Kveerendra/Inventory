import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';
import { Order } from '../models/Order';
import { Subcontractor } from '../models/subcontractor';
import { BehaviorSubject } from 'rxjs';
import { Wishlist } from '../models/wishlist';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private product: Product;
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
  });
  constructor(private http: HttpClient, private loginService: LoginService) {}

  public getProducts(): Observable<Product[]> {
    // console.log("hello");
    return this.http.get<Product[]>(environment.serverUrl + '/showproducts');
  }
  public getOrders(): Observable<Order[]> {
    // console.log("hello");
    return this.http.get<Order[]>(environment.clientUrl + '/orderList');
  }
  public getSubContractors(): Observable<Subcontractor[]> {
    // console.log("hello");
    return this.http.get<Order[]>(environment.clientUrl + '/subContractorList');
  }

  public getWishList(): Observable<Wishlist[]> {
    // console.log("hello");
    return this.http.get<Wishlist[]>(environment.clientUrl + '/wishList');
  }

  insertMasterData(product: Product): Observable<any> {
    return this.http.post<Product>(environment.serverUrl + '/insertMasterData', JSON.stringify({ info: product }),
      { headers: this.headers });
  }

  public login(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.serverUrl + '/showproducts');
  }
  changeProduct(product: Product) {
    this.product = product;
  }

  getProduct() {
    return this.product;
  }

  addProduct(product: Product): Observable<Product> {
    console.error(product);
    return this.http.post<Product>(
      environment.serverUrl + '/addproduct',
      JSON.stringify({info: product, user: this.loginService.getUser()}),
      { headers: this.headers }
    );
  }

  getProductTypesList(): any {
    return this.http.get<Product[]>(environment.serverUrl + '/productList', { headers: this.headers});
  }
}
