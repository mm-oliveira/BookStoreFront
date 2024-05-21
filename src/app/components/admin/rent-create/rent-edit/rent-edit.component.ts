import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { getRentBookById, putRentBook } from 'src/app/services/rent-service';
import { RentBookModel } from 'src/app/models/rentbook.model';

@Component({
  selector: 'app-rent-edit',
  templateUrl: './rent-edit.component.html',
  styleUrls: ['./rent-edit.component.css'],
})
export class RentBookEditComponent implements OnInit {

  editForm: FormGroup;
  mensagem: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
  ) {
    this.editForm = this.formBuilder.group({
      rentBookId: null,
      customerId: null,
      bookId: null,
      status: null,
    });
  }

  get form(): any {
    return this.editForm.controls;
  }

  ngOnInit(): void {

    this.spinnerService.show();
    const id = this.editForm.value.id;
    getRentBookById(id)
      .subscribe({
        next: (item) => {
          this.editForm.patchValue({
              rentBookId: item.rentBookId,
              customerId: item.customerId,
              bookId: item.bookId,
              status: item.status
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


    const request = new RentBookModel(
      this.editForm.value.rentBookId as number,
      this.editForm.value.customerId as number,
      this.editForm.value.bookId as number,
      this.editForm.value.status as number,
    );

    putRentBook(request)
      .subscribe({
        next: (data) => {
          this.mensagem = `Locação '${data.rentBookId}' atualizado com sucesso.`;
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
