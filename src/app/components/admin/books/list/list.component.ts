import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { getBook } from 'src/app/services/book-service';

@Component({
  selector: 'app-book-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class BookListComponent {

  //mome das colunas do grid (DataTable) no material
  colunas: string[] = ['id', 'livro', 'autor', 'genero', 'operacoes'];
  
  //dados preenchidos na tabela
  dataTable = new MatTableDataSource<BookModel>();

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
      author: [''],
      genre: ['']
    })
  }

  get form(): any {
    return this.listForm.controls;
  }

  onSubmit(): void {
    this.spinnerService.show();

    const id = this.listForm.value.id as number;
    const name = this.listForm.value.name as string;
    const author = this.listForm.value.author as string;
    const genre = this.listForm.value.genre as string;

    getBook()
      .subscribe({
        next: (data) => {

          const model: BookModel[] = [];

          data.forEach(item => {
            model.push({
              id: item.id,
              name: item.name,
              author: item.author,
              genre: item.genre,
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

class BookModel {
  id: number = 0;
  name: string = '';
  author: string = '';
  genre: string = '';
}
