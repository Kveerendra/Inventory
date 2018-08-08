import { Injectable, ApplicationRef, ChangeDetectorRef } from '@angular/core';
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
  private productCart: Product[];
  private favproductCart: Product[];
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
  });
  constructor(private http: HttpClient, private loginService: LoginService) {
    this.productCart = [];
    this.favproductCart = [];
  }
  getCart(): Product[] {
    return this.productCart;
  }
  addToCart(product: Product, callBack) {
    if (!this.presentInCart(product)) {
      this.productCart.push(product);
      if (typeof callBack === 'function') {
        callBack();
      }
    }
  }

  presentInCart(product: Product): boolean {
    // tslint:disable-next-line:prefer-const
    let temp = [];
    if (this.productCart.length > 0) {
      this.productCart.forEach(pro => temp.push(pro.product_id));
      return temp.indexOf(product.product_id) > -1;
    } else {
      return false;
    }
  }
  removeFromCart(product: Product): any {
    // tslint:disable-next-line:prefer-const
    let temp = this.productCart;
    this.productCart = [];
    temp.forEach(pro => {
      console.log(product.product_id !== pro.product_id);
      console.log(product.product_id + ' -- ' + pro.product_id);
      if (product.product_id !== pro.product_id) {
        this.productCart.push(pro);
      }
    });
  }

  public getProducts(): Observable<Product[]> {
    // console.log("hello");
    return this.http.get<Product[]>(environment.serverUrl + '/showproducts');
  }
  public getOrders(): Observable<Order[]> {
    // console.log("hello");
    return this.http.post<Order[]>(
      environment.serverUrl + '/showOrderDetails',
      JSON.stringify({ username: this.loginService.getUser().username }),
      { headers: this.headers }
    );
  }

  public getOrdersForApproval(): Observable<Order[]> {
    // console.log("hello");
    return this.http.post<Order[]>(
      environment.serverUrl + '/getOrderData',
      JSON.stringify({ username: this.loginService.getUser().username }),
      { headers: this.headers }
    );
  }

  public getOutOfStock(): Observable<Order[]> {
    // console.log("hello");
    return this.http.post<Order[]>(
      environment.serverUrl + '/stock',
      JSON.stringify({ username: this.loginService.getUser().username }),
      { headers: this.headers }
    );
  }
  public getSubContractors(): Observable<Product[]> {
    return this.http.post<Product[]>(
      environment.serverUrl + '/showOrderDetails',
      JSON.stringify(this.loginService.getUser()),
      {
        headers: this.headers
      }
    );
  }
  public getmyORders(): Observable<Product[]> {
    return this.http.post<Product[]>(
      environment.serverUrl + '/showmyOrderDetails',
      JSON.stringify(this.loginService.getUser()),
      {
        headers: this.headers
      }
    );
  }
  public getProductListForOrder(): Observable<Product[]> {
    // console.log("hello");
    return this.http.get<Product[]>(environment.serverUrl + '/stock');
  }
  public getWishList(): Observable<Wishlist[]> {
    // console.log("hello");
    return this.http.get<Wishlist[]>(environment.clientUrl + '/wishList');
  }

  insertMasterData(product: Product): Observable<any> {
    return this.http.post<Product>(
      environment.serverUrl + '/insertMasterData',
      JSON.stringify({ info: product }),
      { headers: this.headers }
    );
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
      JSON.stringify({ info: product, user: this.loginService.getUser() }),
      { headers: this.headers }
    );
  }

  getProductTypesList(): any {
    return this.http.get<Product[]>(environment.serverUrl + '/productList', {
      headers: this.headers
    });
  }
  placeOrder(product: Product) {
    // tslint:disable-next-line:prefer-const
    let obj = product;
    obj['username'] = this.loginService.getUser().username;
    return this.http.post<Product[]>(
      environment.serverUrl + '/placeOrder',
      JSON.stringify({ info: obj }),
      {
        headers: this.headers
      }
    );
  }
  presentInFavs(product: Product): boolean {
    // tslint:disable-next-line:prefer-const
    let temp = [];
    if (this.favproductCart.length > 0) {
      this.favproductCart.forEach(pro => temp.push(pro.product_id));
      return temp.indexOf(product.product_id) > -1;
    } else {
      return false;
    }
  }

  toggleFavs(product: Product) {
    // tslint:disable-next-line:prefer-const
    let temp = [];
    if (this.favproductCart.length > 0 && this.presentInCart(product)) {
      this.favproductCart.forEach(pro => {
        if (pro.product_id !== product.product_id) {
          temp.push(product);
        }
      });
    } else {
      this.favproductCart.push(product);
    }
    this.favproductCart = temp;
  }
  updateProduct(product: Product): Observable<Product> {
    console.error(product);
    return this.http.post<Product>(
      environment.serverUrl + '/updateProduct',
      JSON.stringify({ info: product, user: this.loginService.getUser() }),
      { headers: this.headers }
    );
  }
  addToWishList(product: Product) {
    // tslint:disable-next-line:prefer-const
    let obj = product;
    obj['username'] = this.loginService.getUser().username;
    return this.http.post<Product[]>(
      environment.serverUrl + '/addToWishList',
      JSON.stringify({ info: obj }),
      {
        headers: this.headers
      }
    );
  }
}
