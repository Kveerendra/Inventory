import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';

const appRoutes: Routes = [{ path: 'products', component: ProductsComponent },
                           { path: 'login', component: LoginComponent },
                           { path: 'error', component: ErrorComponent }
                          ];


@NgModule({
  declarations: [AppComponent, ProductsComponent, LoginComponent, ErrorComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AgGridModule.withComponents([])
  ],
  exports: [],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
