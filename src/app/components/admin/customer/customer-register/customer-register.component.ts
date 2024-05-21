import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerModel, CustomerResponse } from 'src/app/models/customer.model';
import { postCustomer } from 'src/app/services/customer-service';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent {

  resposta: string = '';

  constructor(
    private spinnerService: NgxSpinnerService
  ){}

  formRegister = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100)
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(11)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    address: new FormControl('', [
      Validators.required
    ]),
    documentType: new FormControl('', [
      Validators.required
    ]),
    documentNumber: new FormControl('', [
      Validators.required
    ]),
    
  });

  get form(): any {
    return this.formRegister.controls;
  }

  onSubmit(): void {

    this.spinnerService.show();

    //parâmetros da requisição
    const request = new CustomerModel(
      0,
      this.formRegister.value.name as string,
      this.formRegister.value.phone as string,
      this.formRegister.value.email as string,
      this.formRegister.value.address as string,
      this.formRegister.value.documentType as string,  
      Number(this.formRegister.value.documentType),
          
    );

    postCustomer(request)
      .subscribe({
        next: (resp) => {
          this.resposta = `Cliente ${resp.name} cadastrado com sucesso`;
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
