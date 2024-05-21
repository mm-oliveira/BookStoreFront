import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BookCreateComponent } from './components/admin/books/create/book-create.component';
import { HomeComponent } from './components/pages/home/home.component';
import { BookListComponent } from './components/admin/books/list/list.component';
import { BookEditComponent } from './components/admin/books/edit/edit.component';
import { CustomerListComponent } from './components/admin/customer/customer-list/customer-list.component';
import { CustomerRegisterComponent } from './components/admin/customer/customer-register/customer-register.component';
import { CustomerEditComponent } from './components/admin/customer/customer-edit/customer-edit.component';
import { RentBookEditComponent } from './components/admin/rent-create/rent-edit/rent-edit.component';
import { RentBookRegisterComponent } from './components/admin/rent-create/rent-register/rent-register.component';
import { RentBookListComponent } from './components/admin/rent-create/rent-list/rent-list.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'clientes/cadastro-de-clientes',
    component: CustomerRegisterComponent,
  },
  {
    path: 'clientes/consulta-de-clientes',
    component: CustomerListComponent,
  },
  {
    path: 'clientes/edit/:id',
    component: CustomerEditComponent,
  },
  {
    path: 'livros/cadastro-de-livros',
    component: BookCreateComponent,
  },
  {
    path: 'livros/consulta-de-livros',
    component: BookListComponent,
  },
  {
    path: 'admin/edit/:id',
    component: BookEditComponent,
  },
  {
    path: 'livros/lista-de-locacao-de-livros',
    component: RentBookListComponent,
  },
  {
    path: 'livros/nova-locacao-de-livros',
    component: RentBookRegisterComponent,
  },  
  {
    path: 'livros/locacao-de-livros/edit/:id',
    component: RentBookEditComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
