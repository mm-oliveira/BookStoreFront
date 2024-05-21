import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { RoutingModule } from './app.routing';
import { MaterialModule } from './app.material';
import { MessagesComponent } from './components/layout/messages/messages.component';
import { CommonModule, DatePipe } from '@angular/common';
import { BookCreateComponent } from './components/admin/books/create/book-create.component';
import { HomeComponent } from './components/pages/home/home.component';
import { BookListComponent } from './components/admin/books/list/list.component';
import { BookEditComponent } from './components/admin/books/edit/edit.component';
import { CustomerListComponent } from './components/admin/customer/customer-list/customer-list.component';
import { CustomerRegisterComponent } from './components/admin/customer/customer-register/customer-register.component';
import { CustomerEditComponent } from './components/admin/customer/customer-edit/customer-edit.component';
import { RentBookRegisterComponent } from './components/admin/rent-create/rent-register/rent-register.component';
import { RentBookEditComponent } from './components/admin/rent-create/rent-edit/rent-edit.component';
import { RentBookListComponent } from './components/admin/rent-create/rent-list/rent-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,    
    BookListComponent,
    BookEditComponent,
    BookCreateComponent,
    MessagesComponent,
    CustomerListComponent,
    CustomerEditComponent,
    CustomerRegisterComponent,
    RentBookListComponent,
    RentBookEditComponent,
    RentBookRegisterComponent,
    
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    CommonModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
