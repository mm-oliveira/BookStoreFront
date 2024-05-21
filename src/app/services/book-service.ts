import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { createRequest } from './commons.service';
import { BookModel } from '../models/book.model';

//função para acessar o serviço de consulta de livros
export function getBook(): Observable<BookModel[]> {
    const config = {
        method: 'get',
        url: `${environment.apiBookStore}/Book/BookList`
    };

    return createRequest<BookModel[]>(config);
}

//função para consultar 1 conta por id
export function getBookById(id: number): Observable<BookModel> {
    const config = {
        method: 'get',
        url: `${environment.apiBookStore}/Book/GetBookById/${id}`
    }

    return createRequest<BookModel>(config);
}

//função para cadastrar conta
export function postBook(request: BookModel): Observable<BookModel> {
    const config = {
        method: 'post',
        url: `${environment.apiBookStore}/Book`,
        data: request
    }

    return createRequest<BookModel>(config);
}

export function putBook(request: BookModel): Observable<BookModel> {
    const config = {
        method: 'put',
        url: `${environment.apiBookStore}/Book`,
        data: request
    }

    return createRequest<BookModel>(config);
}
