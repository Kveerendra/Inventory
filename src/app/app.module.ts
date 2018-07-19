import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsService } from './services/products.service';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { IsAuthenticatedService } from './services/is-authenticated.service';
import { RegisterComponent } from './components/register/register.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { LoginRedirectService } from './services/login-redirect.service';

const appRoutes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [IsAuthenticatedService]
  },
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent,
  canActivate: [LoginRedirectService] },
  { path: 'register', component: RegisterComponent,
  canActivate: [LoginRedirectService] },
  { path: 'error', component: ErrorComponent },
  { path: 'signOut', component: SignOutComponent },
  { path: 'products', component: ProductsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    LoginComponent,
    ErrorComponent,
    RegisterComponent,
    SignOutComponent,
    ErrorComponent
  ],
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
    AgGridModule.withComponents([EditProductComponent])
  ],
  exports: [EditProductComponent],

  providers: [{ provide: 'Window',  useValue: window },ProductsService, LoginRedirectService, IsAuthenticatedService],
  bootstrap: [AppComponent]
})
export class AppModule {}
