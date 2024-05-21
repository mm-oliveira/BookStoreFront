import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { postBook } from 'src/app/services/book-service';
import { BookModel } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
})
export class BookCreateComponent implements OnInit {
  createForm: FormGroup;
  //categorias: CategoriasResponse[] = [];
  mensagem: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService
  ) {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
    });
  }

  get form(): any {
    return this.createForm.controls;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.spinnerService.show();

    //capturar os campos do formulário
    const request = new BookModel(
      0,
      this.createForm.value.name as string,
      this.createForm.value.author as string,
      this.createForm.value.genre as string,
    );

    //realizando o cadastro
    postBook(request)
      .subscribe({
        next: (data) => {
          this.mensagem = `Livro '${data.name}', cadastrado com sucesso.`;
          this.createForm.reset();
        },
        error: (e) => {
          this.mensagem = `Erro: ${e.response.data}`;
          console.log(e.response.data);
        },
      })
      .add(() => {
        this.spinnerService.hide();
      });
  }
}
