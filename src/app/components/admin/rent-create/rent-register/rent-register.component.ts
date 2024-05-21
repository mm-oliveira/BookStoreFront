import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerModel, CustomerResponse } from 'src/app/models/customer.model';
import { RentBookModel } from 'src/app/models/rentbook.model';
import { postCustomer } from 'src/app/services/customer-service';
import { postRentBook } from 'src/app/services/rent-service';

@Component({
  selector: 'app-rent-register',
  templateUrl: './rent-register.component.html',
  styleUrls: ['./rent-register.component.css']
})
export class RentBookRegisterComponent {

  resposta: string = '';

  constructor(
    private spinnerService: NgxSpinnerService
  ){}

  formRegister = new FormGroup({
    customerId: new FormControl(null, [
      Validators.required
    ]),
    bookId: new FormControl(null, [
      Validators.required
    ]),
  });

  get form(): any {
    return this.formRegister.controls;
  }

  onSubmit(): void {

    this.spinnerService.show();

    //parâmetros da requisição
    const request = new RentBookModel(
      0,
      Number(this.formRegister.value.customerId),
      Number(this.formRegister.value.bookId)
    );

    postRentBook(request)
      .subscribe({
        next: (resp) => {
          this.resposta = `Locação ${resp.rentBookId} cadastrado com sucesso`;
          this.formRegister.reset();
        },
        error: (e) => {
          this.resposta = e.response.data.message;
        }
      }).add(() => {
        this.spinnerService.hide();
      })
  }
}
