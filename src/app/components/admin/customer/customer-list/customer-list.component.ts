import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerModel, CustomerResponse } from 'src/app/models/customer.model';
import { getBook } from 'src/app/services/book-service';
import { getCustomer } from 'src/app/services/customer-service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

  //mome das colunas do grid (DataTable) no material
  colunas: string[] = ['id', 'name', 'phone', 'email', 'address', 'documentType', 'documentNumber', 'operacoes'];
  
  //dados preenchidos na tabela
  dataTable = new MatTableDataSource<CustomerResponse>();

  //formulário
  listForm: FormGroup;

  //exibição de mensagem:
  mensagem: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService
  ){
    this.listForm = this.formBuilder.group({
      id: null,
      name: [''],
      phone: [''],
      email: [''],
      address: [''],
      documentType: null,
      documentNumber: [''],
    })
  }

  get form(): any {
    return this.listForm.controls;
  }

  onSubmit(): void {
    this.spinnerService.show();

    const id = this.listForm.value.id as number;
    const name = this.listForm.value.name as string;
    const phone = this.listForm.value.phone as string;
    const email = this.listForm.value.email as string;
    const address = this.listForm.value.address as string;
    const documentType = Number(this.listForm.value.documentType);
    const documentNumber = this.listForm.value.documentNumber as string;

    getCustomer(name, documentNumber)
      .subscribe({
        next: (data) => {

          const model: CustomerResponse[] = [];

          data.forEach(item => {
            model.push({
              id: item.id,
              name: item.name,
              phone: item.phone,
              email: item.email,
              address: item.address,
              documentType: item.documentType,
              documentNumber: item.documentNumber,
            });
          });

          this.dataTable.data = model;

        },
        error: (e) => {
          console.log(e.error.response);
        }
      })
      .add(() => {
        this.spinnerService.hide();
      })
  }
}