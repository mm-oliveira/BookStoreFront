import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { getBook, getBookById, putBook } from 'src/app/services/book-service';
import { BookModel } from 'src/app/models/book.model';
import { getCustomerById, putCustomer } from 'src/app/services/customer-service';
import { CustomerModel } from 'src/app/models/customer.model';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
})
export class CustomerEditComponent implements OnInit {

  editForm: FormGroup;
  mensagem: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
  ) {
    this.editForm = this.formBuilder.group({
      id: 0,
      name: [''],
      phone: [''],
      email: [''],
      address: [''],
      documentType: 0,
      documentNumber: [''],
    });
  }

  get form(): any {
    return this.editForm.controls;
  }

  ngOnInit(): void {

    this.spinnerService.show();
    const id = this.editForm.value.id;
    getCustomerById(id)
      .subscribe({
        next: (item) => {
          this.editForm.patchValue({
            id: item.id,
              name: item.name,
              phone: item.phone,
              email: item.email,
              address: item.address,
              documentType: item.documentType,
              documentNumber: item.documentNumber,
          });
        },
        error: (e) => {
          console.log(e.error);
        },
      })
      .add(() => {
        this.spinnerService.hide();
      });
  }

  onSubmit(): void {
    this.spinnerService.show();


    const request = new CustomerModel(
      this.editForm.value.id as number,
      this.editForm.value.name as string,
      this.editForm.value.phone as string,
      this.editForm.value.email as string,
      this.editForm.value.address as string,      
      this.editForm.value.documentNumber as string,
      this.editForm.value.documentType as number,
    );

    putCustomer(request)
      .subscribe({
        next: (data) => {
          this.mensagem = `Cliente '${data.name}' atualizado com sucesso.`;
        },
        error: (e) => {
          console.log(e.response);
        }
      })
      .add(() => {
        this.spinnerService.hide();
      })
  }
}
