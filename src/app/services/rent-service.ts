import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { createRequest } from './commons.service';
import { RentBookModel, RentBookResponse } from '../models/rentbook.model';

export function getRentBook(customerId : number, bookId: number): Observable<RentBookResponse[]> {
    const config = {
        method: 'get',
        url: `${environment.apiBookStore}/RentBook/RentBookList?customerId=${customerId}&bookId${bookId}`
    }

    return createRequest<RentBookResponse[]>(config);
}

export function postRentBook(request: RentBookModel): Observable<RentBookResponse> {
    const config = {
        method: 'post',
        url: `${environment.apiBookStore}/RentBook`,
        data: request
    }

    return createRequest<RentBookResponse>(config);
}

export function putRentBook(request: RentBookModel): Observable<RentBookResponse> {
    const config = {
        method: 'put',
        url: `${environment.apiBookStore}/RentBook`,
        data: request
    }

    return createRequest<RentBookResponse>(config);
}

export function getRentBookById(id: string): Observable<RentBookModel> {
    const config = {
        method: 'get',
        url: `${environment.apiBookStore}/RentBook/RentBookById/${id}`
    }

    return createRequest<RentBookModel>(config);
}