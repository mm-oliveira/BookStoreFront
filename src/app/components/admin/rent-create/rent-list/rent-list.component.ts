import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerModel, CustomerResponse } from 'src/app/models/customer.model';
import { RentBookResponse } from 'src/app/models/rentbook.model';
import { getBook } from 'src/app/services/book-service';
import { getCustomer } from 'src/app/services/customer-service';
import { getRentBook } from 'src/app/services/rent-service';

@Component({
  selector: 'app-rent-list',
  templateUrl: './rent-list.component.html',
  styleUrls: ['./rent-list.component.css']
})
export class RentBookListComponent {

  colunas: string[] = ['rentBookId', 'customerId', 'bookId', 'status','operacoes'];
  
  dataTable = new MatTableDataSource<RentBookResponse>();

  listForm: FormGroup;

  mensagem: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService
  ){
    this.listForm = this.formBuilder.group({
      rentBookId: null,
      customerId: null,
      bookId: null,
      status: null,
    })
  }

  get form(): any {
    return this.listForm.controls;
  }

  onSubmit(): void {
    this.spinnerService.show();

    const rentBookId = this.listForm.value.rentBookId as number;
    const customerId = this.listForm.value.customerId as number;
    const bookId = this.listForm.value.bookId as number;
    const status = this.listForm.value.status as number;

    getRentBook(customerId, bookId)
      .subscribe({
        next: (data) => {

          const model: RentBookResponse[] = [];

          data.forEach(item => {
            model.push({
              rentBookId: item.rentBookId,
              customerId: item.customerId,
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