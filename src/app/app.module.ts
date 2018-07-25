import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import {RegisterDialogComponent} from './components/dialog/register-dialog.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { LoginRedirectService } from './services/login-redirect.service';
import { ModalModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';

import {
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatGridListModule,
  MatInputModule,
  MatCardModule,
  MatRadioModule,
  MatDialogModule,
  MatSelectModule
} from '@angular/material';
import { CreateproductComponent } from './components/createproduct/createproduct.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
const appRoutes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [IsAuthenticatedService]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    canActivate: [LoginRedirectService]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginRedirectService]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginRedirectService]
  },
  { path: 'error', component: ErrorComponent },
  { path: 'signOut', component: SignOutComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: 'createproduct',
    component: CreateproductComponent
  },
  { path: 'addproduct', component: AddproductComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    LoginComponent,
    ErrorComponent,
    RegisterComponent,
    SignOutComponent,
    ErrorComponent,
    EditProductComponent,
    RegisterDialogComponent,
    CreateproductComponent,
    AddproductComponent
  ],
  entryComponents : [RegisterDialogComponent],
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
    AgGridModule.withComponents([]),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule
  ],
  exports: [EditProductComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: 'Window', useValue: window },
    ProductsService,
    LoginRedirectService,
    IsAuthenticatedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
