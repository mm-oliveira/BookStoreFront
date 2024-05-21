import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { getBook, getBookById, putBook } from 'src/app/services/book-service';
import { BookModel } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class BookEditComponent implements OnInit {

  editForm: FormGroup;
  mensagem: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
  ) {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
    });
  }

  get form(): any {
    return this.editForm.controls;
  }

  ngOnInit(): void {

    this.spinnerService.show();
    const id = this.editForm.value.id;
    getBookById(id)
      .subscribe({
        next: (item) => {
          this.editForm.patchValue({
            id: item.id,
            name: item.name,
            author: item.author,
            genre: item.genre,
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

    const request = new BookModel(
      this.editForm.value.id as number,
      this.editForm.value.name as string,
      this.editForm.value.author as string,
      this.editForm.value.genre as string,
    );

    putBook(request)
      .subscribe({
        next: (data) => {
          this.mensagem = `Livro '${data.name}' atualizada com sucesso.`;
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
